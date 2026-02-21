import json
import os
from supabase import create_client, Client

# 1. Configuración
url: str = "https://fksertsqjzjukwlxhtdx.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrc2VydHNxanpqdWt3bHhodGR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTMxMjUzMCwiZXhwIjoyMDg2ODg4NTMwfQ.zJR8rwtOlRa3Z0CX1K5G4gqKGhTQ0ZFNgpGnOVU_Fbc"

if not url or not key:
    print("Error: Faltan las credenciales en el archivo .env")
    exit()

supabase: Client = create_client(url, key)

# 2. Cargar el JSON
# Asegúrate de que tu archivo se llame 'canciones.json'
try:
    with open('outpu.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
except FileNotFoundError:
    print("Error: No encuentro el archivo 'canciones.json'")
    exit()

def upload_data():
    print("🚀 Iniciando carga de canciones...")
    
    songs_data = data.get("songs", {})

    for categoria_nombre, lista_canciones in songs_data.items():
        print(f"\n📂 Procesando categoría: {categoria_nombre}")

        # A. INSERTAR/BUSCAR CATEGORÍA
        # Usamos upsert. Si existe el nombre, no hace nada pero nos devuelve el ID.
        cat_res = supabase.table('categorias').upsert(
            {"nombre": categoria_nombre, "tipo_orden": "manual"},
            on_conflict="nombre"
        ).execute()
        
        # Obtenemos el ID de la categoría (sea nueva o existente)
        categoria_id = cat_res.data[0]['id']

        for index, song in enumerate(lista_canciones):
            # Preparamos los datos de la canción
            # NOTA: En tu SQL 'canciones' no tiene campo 'cejilla'. 
            # La cejilla se guardaba en 'elementos_lista' (relación con Listas).
            # Aquí subimos los datos base de la canción.
            
            payload_cancion = {
                "titulo": song.get("titulo"),
                "autor": song.get("autor"),
                "tono": song.get("tono", ""),
                "letra_raw": song.get("content"),
                "cejilla": song.get("cejilla")
            }

            try:
                # B. INSERTAR/ACTUALIZAR CANCIÓN
                # La restricción unique es (titulo, autor) según tu SQL
                song_res = supabase.table('canciones').upsert(
                    payload_cancion,
                    on_conflict="titulo, autor"
                ).execute()
                
                cancion_id = song_res.data[0]['id']
                titulo = song_res.data[0]['titulo']

                # C. VINCULAR CANCIÓN A CATEGORÍA
                # Tabla pivote: canciones_categorias
                payload_relacion = {
                    "cancion_id": cancion_id,
                    "categoria_id": categoria_id,
                    "numero": index + 1 # Usamos el orden del array (1, 2, 3...)
                }

                # Upsert en la tabla intermedia para no duplicar relaciones
                supabase.table('canciones_categorias').upsert(
                    payload_relacion,
                    on_conflict="cancion_id, categoria_id"
                ).execute()

                print(f"   ✅ [{index + 1}] {titulo}")

            except Exception as e:
                print(f"   ❌ Error con '{song.get('titulo')}': {e}")

    print("\n✨ Carga completada exitosamente.")

if __name__ == "__main__":
    upload_data()