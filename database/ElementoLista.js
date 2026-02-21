import { Model } from '@nozbe/watermelondb'
import { field, date, relation, readonly } from '@nozbe/watermelondb/decorators'

export default class ElementoLista extends Model {
  static table = 'elementos_lista'

  @field('cejilla') cejilla
  @field('traspuesta') traspuesta
  @field('velocidad') velocidad
  @field('posicion_orden') posicionOrden

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  // Apunta a los dos extremos de la relación
  @relation('listas', 'lista_id') lista
  @relation('canciones', 'cancion_id') cancion
}