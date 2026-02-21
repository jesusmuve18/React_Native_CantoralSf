import { Model } from '@nozbe/watermelondb'
import { field, date, relation, readonly } from '@nozbe/watermelondb/decorators'

export default class CancionCategoria extends Model {
  static table = 'canciones_categorias'

  @field('numero') numero

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  @relation('canciones', 'cancion_id') cancion
  @relation('categorias', 'categoria_id') categoria
}