import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'songs',
      columns: [
        { name: 'title', type: 'string', isIndexed: true },
        { name: 'author', type: 'string', isIndexed: true},
        { name: 'tone', type: 'string' },
        { name: 'capo', type: 'number' },
        { name: 'content', type: 'string' }
      ],
    }),
  ],
})
