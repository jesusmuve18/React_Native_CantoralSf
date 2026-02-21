import { Model } from '@nozbe/watermelondb'
import { text, field, date, children, readonly } from '@nozbe/watermelondb/decorators'

export default class Cancion extends Model {
  static table = 'canciones'

  @text('titulo') titulo
  @text('autor') autor
  @text('tono') tono
  @field('cejilla') cejilla
  @text('letra_raw') letraRaw
  @text('letra_processed') letraProcessed

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt

  // Relaciones con las tablas pivote
  @children('elementos_lista') aparicionesEnListas
  @children('canciones_categorias') categoriasVinculadas
}