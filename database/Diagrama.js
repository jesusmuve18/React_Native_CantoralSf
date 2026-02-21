
import { Model } from '@nozbe/watermelondb'
import { text, field, date, relation, readonly } from '@nozbe/watermelondb/decorators'

export default class Diagrama extends Model {
  static table = 'diagramas'

  @text('svg') svg
  @field('id_diagrama') idDiagrama

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  @relation('acordes', 'acorde_id') acorde
}