import { Model } from '@nozbe/watermelondb'
import { text, date, relation, readonly } from '@nozbe/watermelondb/decorators'

export default class Sesion extends Model {
  static table = 'sesiones'

  @text('clave') clave
  @date('fecha_inicio') fechaInicio
  @date('fecha_fin') fechaFin
  
  @readonly @date('updated_at') updatedAt

  // Relación inversa: a qué usuario pertenece esta sesión
  @relation('usuarios', 'usuario_id') usuario
}