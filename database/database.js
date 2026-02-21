import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { mySchema } from './schema'

// Importamos todos los modelos
import Usuario from './Usuario'
import Sesion from './Sesion'
import Lista from './Lista'
import Cancion from './Cancion'
import Categoria from './Categoria'
import Acorde from './Acorde'
import Diagrama from './Diagrama'
import ElementoLista from './ElementoLista'
import CancionCategoria from './CancionCategoria'

const adapter = new SQLiteAdapter({
  schema: mySchema,
  // (Puedes añadir migraciones aquí en el futuro)
})

// Creamos la instancia de la base de datos
export const database = new Database({
  adapter,
  modelClasses: [
    Usuario,
    Sesion,
    Lista,
    Cancion,
    Categoria,
    Acorde,
    Diagrama,
    ElementoLista,
    CancionCategoria
  ],
})