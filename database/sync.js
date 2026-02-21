import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from './database'
import { supabase } from '../services/supabaseClient'

// Lista de las tablas que vamos a sincronizar
const TABLAS_SYNC = [
  'usuarios', 'sesiones', 'listas', 'canciones', 'categorias', 
  'acordes', 'diagramas', 'elementos_lista', 'canciones_categorias'
]

export async function syncDatabase() {
  await synchronize({
    database,
    
    // 1. DESCARGAR CAMBIOS DE SUPABASE (PULL)
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      // Watermelon pasa 'lastPulledAt' en milisegundos. Supabase usa ISO 8601.
      // Si es la primera vez (null), ponemos una fecha muy antigua (1970).
      const lastPulledAtISO = lastPulledAt 
        ? new Date(lastPulledAt).toISOString() 
        : new Date(0).toISOString()

      const changes = {}

      for (const tabla of TABLAS_SYNC) {
        // Pedimos a Supabase los registros que han cambiado desde la última vez
        const { data, error } = await supabase
          .from(tabla)
          .select('*')
          .gt('updated_at', lastPulledAtISO) // Solo lo modificado DESPUÉS de lastPulledAt

        if (error) throw new Error(`Error haciendo pull de ${tabla}: ${error.message}`)

        // Separamos los registros: los borrados (soft-delete) y los creados/actualizados
        const deletedIds = data.filter(row => row.deleted === true).map(row => row.id)
        const updatedRecords = data.filter(row => row.deleted === false)

        changes[tabla] = {
          created: [], // Dejamos created vacío (Watermelon es listo y tratará los updated como created si no existen localmente)
          updated: updatedRecords,
          deleted: deletedIds,
        }
      }

      return {
        changes,
        timestamp: Date.now(), // Le decimos a Watermelon qué hora es AHORA para su próximo pull
      }
    },

    // 2. SUBIR CAMBIOS A SUPABASE (PUSH)
    pushChanges: async ({ changes, lastPulledAt }) => {
      for (const tabla of TABLAS_SYNC) {
        const tablaChanges = changes[tabla]
        if (!tablaChanges) continue

        const { created, updated, deleted } = tablaChanges

        // A. CREACIONES Y ACTUALIZACIONES (Usamos UPSERT para ambas)
        const recordsToUpsert = [...created, ...updated].map(record => {
          // Limpiamos los campos internos de WatermelonDB antes de enviar a Supabase
          const { _status, _changed, ...cleanRecord } = record._raw
          return cleanRecord
        })

        if (recordsToUpsert.length > 0) {
          const { error } = await supabase
            .from(tabla)
            .upsert(recordsToUpsert) // Inserta si no existe, actualiza si ya existe

          if (error) throw new Error(`Error haciendo push (upsert) en ${tabla}: ${error.message}`)
        }

        // B. BORRADOS
        // No borramos la fila físicamente (DELETE), hacemos "Soft Delete" (deleted = true)
        // para que en el próximo 'pullChanges', los otros dispositivos se enteren del borrado.
        if (deleted.length > 0) {
          const { error } = await supabase
            .from(tabla)
            .update({ deleted: true, updated_at: new Date().toISOString() })
            .in('id', deleted)

          if (error) throw new Error(`Error haciendo push (delete) en ${tabla}: ${error.message}`)
        }
      }
    },

    // Opcional: Para evitar que la app se bloquee si hay errores
    sendCreatedAsUpdated: true,
  })
}