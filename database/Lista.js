import { Model } from '@nozbe/watermelondb'
import { text, date, children, relation, readonly } from '@nozbe/watermelondb/decorators'

export default class Lista extends Model {
  static table = 'listas'

  @text('nombre') nombre
  @text('visibilidad') visibilidad
  
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  @relation('usuarios', 'usuario_id') creador
  
  // Relación 1:N
  @children('elementos_lista') elementos
}