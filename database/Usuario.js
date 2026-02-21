import { Model } from '@nozbe/watermelondb'
import { field, text, date, children, json, readonly } from '@nozbe/watermelondb/decorators'

const sanitizeConfig = (rawConfig) => {
  return typeof rawConfig === 'object' && rawConfig !== null ? rawConfig : {}
}

export default class Usuario extends Model {
  static table = 'usuarios'

  @text('nombre') nombre
  @text('password') password
  @field('nivel') nivel
  
  // Convierte el String de la BD a JSON en JS y viceversa
  @json('configuracion', sanitizeConfig) configuracion

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  // Relaciones 1:N
  @children('sesiones') sesiones
  @children('listas') listas
}