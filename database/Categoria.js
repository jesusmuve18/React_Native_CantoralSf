import { Model } from '@nozbe/watermelondb'
import { text, date, children, readonly } from '@nozbe/watermelondb/decorators'

export default class Categoria extends Model {
  static table = 'categorias'

  @text('nombre') nombre
  @text('tipo_orden') tipoOrden

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  @children('canciones_categorias') cancionesVinculadas
}