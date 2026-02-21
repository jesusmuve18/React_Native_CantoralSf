import { Model } from '@nozbe/watermelondb'
import { text, date, children, readonly } from '@nozbe/watermelondb/decorators'

export default class Acorde extends Model {
  static table = 'acordes'

  @text('nota') nota
  @text('variacion') variacion
  @text('bajo') bajo

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  @children('diagramas') diagramas
}