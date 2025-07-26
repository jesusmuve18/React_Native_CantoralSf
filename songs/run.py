import os
import json
import re

def parse_filename(filename):
    base = filename[:-4]  # quitar ".dat"
    if '-' not in base:
        return base.replace('_', ' '), ""
    titulo, autor = base.split('-', 1)
    return titulo.replace('_', ' '), autor.replace('_', ' ')

def clean_folder_name(name):
    # Quita el número y guión del inicio, y reemplaza _ por espacios
    sin_num = re.sub(r'^\d+-', '', name)
    return sin_num.replace('_', ' ')

def process_directory(root_dir):
    folder_map = []

    for subdir in os.listdir(root_dir):
        subdir_path = os.path.join(root_dir, subdir)
        if os.path.isdir(subdir_path):
            folder_map.append((subdir, subdir_path))  # nombre original con número

    # Ordenar por el nombre original (con número)
    folder_map.sort(key=lambda x: x[0].lower())

    songs = {}

    for original_name, subdir_path in folder_map:
        canciones = []

        for file in sorted(os.listdir(subdir_path)):
            if file.endswith('.dat'):
                titulo, autor = parse_filename(file)
                file_path = os.path.join(subdir_path, file)

                with open(file_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    processed_lines = []
                    cejilla = 0

                    for line in lines:
                        # Detectar si es una línea con la cejilla
                        cejilla_match = re.fullmatch(r'<span id="cejilla-original">(\d+)</span>', line.rstrip())
                        if cejilla_match:
                            cejilla = int(cejilla_match.group(1))
                            continue  # No añadir esta línea al contenido

                        # Reemplazar <strong> y mantener indentación
                        replaced = line.replace("<strong>", "[Estribillo]").replace("</strong>", "[/Estribillo]")
                        processed_lines.append(replaced.rstrip('\n'))

                    content = '\n'.join(processed_lines)


                canciones.append({
                    "titulo": titulo,
                    "autor": autor,
                    "tono": "",
                    "cejilla": cejilla,
                    "content": content
                })

        nombre_limpio = clean_folder_name(original_name)
        songs[nombre_limpio] = canciones

    return { "songs": songs }

if __name__ == "__main__":
    directorio_raiz = "./songs"  # Carpeta de donde saca las canciones
    datos = process_directory(directorio_raiz)

    with open("output.json", "w", encoding='utf-8') as f:
        json.dump(datos, f, ensure_ascii=False, indent=2)
