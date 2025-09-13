import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { mySchema } from './schema'
import Song from './Songs'

const adapter = new SQLiteAdapter({
  schema: mySchema,
  jsi: true, // Expo soporta JSI desde SDK 44+
})

export const database = new Database({
  adapter,
  modelClasses: [Song],
  actionsEnabled: true,
})
