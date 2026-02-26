import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 1, // Cambia esto si en el futuro añades más tablas o columnas
  tables: [
    tableSchema({
      name: 'usuarios',
      columns: [
        { name: 'nombre', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'nivel', type: 'number' },
        { name: 'configuracion', type: 'string' }, // El JSON se guarda como string (JSON.stringify)
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    
    tableSchema({
      name: 'sesiones',
      columns: [
        { name: 'usuario_id', type: 'string', isIndexed: true },
        { name: 'clave', type: 'string' },
        { name: 'fecha_inicio', type: 'number' }, // Las fechas en Watermelon son 'number' (Unix Timestamp)
        { name: 'fecha_fin', type: 'number', isOptional: true },
        { name: 'updated_at', type: 'number' },
      ]
    }),

    tableSchema({
      name: 'listas',
      columns: [
        { name: 'usuario_id', type: 'string', isIndexed: true },
        { name: 'nombre', type: 'string' },
        { name: 'visibilidad', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),

    tableSchema({
      name: 'canciones',
      columns: [
        { name: 'titulo', type: 'string', isIndexed: true },
        { name: 'autor', type: 'string', isOptional: true, isIndexed: true },
        { name: 'tono', type: 'string', isOptional: true },
        { name: 'cejilla', type: 'number' },
        { name: 'letra_raw', type: 'string', isOptional: true },
        { name: 'letra_processed', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),

    tableSchema({
      name: 'categorias',
      columns: [
        { name: 'nombre', type: 'string' },
        { name: 'tipo_orden', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),

    tableSchema({
      name: 'acordes',
      columns: [
        { name: 'nota', type: 'string' },
        { name: 'variacion', type: 'string', isOptional: true },
        { name: 'bajo', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),

    tableSchema({
      name: 'diagramas',
      columns: [
        { name: 'acorde_id', type: 'string', isIndexed: true },
        { name: 'svg', type: 'string' },
        { name: 'id_diagrama', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),

    // --- TABLAS PIVOTE (N:M) ---

    tableSchema({
      name: 'elementos_lista',
      columns: [
        { name: 'lista_id', type: 'string', isIndexed: true },
        { name: 'cancion_id', type: 'string', isIndexed: true },
        { name: 'cejilla', type: 'number', isOptional: true },
        { name: 'traspuesta', type: 'number' },
        { name: 'velocidad', type: 'number', isOptional: true },
        { name: 'posicion_orden', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),

    tableSchema({
      name: 'canciones_categorias',
      columns: [
        { name: 'cancion_id', type: 'string', isIndexed: true },
        { name: 'categoria_id', type: 'string', isIndexed: true },
        { name: 'numero', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
  ]
})