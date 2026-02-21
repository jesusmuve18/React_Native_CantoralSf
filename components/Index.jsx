import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useMemo } from "react";
import { withObservables } from '@nozbe/watermelondb/react';

import { database } from '../database/database'; 

import { useTheme } from "../themes/themeContext";
import { Matches } from "../functions/searcher";
import IndexItem from "./IndexItem";

function Index(props) {
  const { theme } = useTheme();
  const [renderedSections, setRenderedSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // 1. RECONSTRUIR LA ESTRUCTURA JSON DESDE LA BASE DE DATOS LOCAL
  // Usamos useMemo para que esto solo se recalcule si la base de datos cambia
  const cancionesDict = useMemo(() => {
    const dict = {};
    
    // Crear las claves para cada categoría (ej: dict["General"] = [])
    props.categorias.forEach(cat => {
        dict[cat.nombre] = [];
    });

    // Crear un mapa rápido de canciones por ID para no anidar bucles
    const mapCanciones = {};
    props.canciones.forEach(c => {
        mapCanciones[c.id] = c;
    });

    // Llenar el diccionario cruzando la tabla pivote
    props.cancionesCategorias.forEach(cc => {
        // En WatermelonDB, podemos acceder a los IDs crudos usando _raw
        const catName = props.categorias.find(cat => cat.id === cc._raw.categoria_id)?.nombre;
        const cancion = mapCanciones[cc._raw.cancion_id];
        
        if (catName && cancion) {
            dict[catName].push({
                titulo: cancion.titulo,
                autor: cancion.autor,
                numero: cc.numero, // El número de orden que subimos con Python
                songModel: cancion // Guardamos el Modelo completo para pasarlo a la siguiente pantalla
            });
        }
    });

    // Ordenar cada sección según su 'numero' original y asignarle el 'index' para la vista
    for (const seccion in dict) {
        dict[seccion].sort((a, b) => a.numero - b.numero);
        dict[seccion].forEach((cancion, idx) => {
            cancion.index = idx + 1;
        });
    }

    return dict;
  }, [props.canciones, props.categorias, props.cancionesCategorias]);

  // 2. EJECUTAR FILTRADO (Tu lógica original casi intacta)
  useEffect(() => {
    setLoading(true);

    const handle = setTimeout(() => {
      // Usamos el diccionario reconstruido en lugar de props.data.songs
      const nuevasSecciones = Object.entries(cancionesDict)
        .map(([section, songs], section_index) => {
          const section_selected = props.selected === section || props.selected === "Todas";
          if (!section_selected) return null;

          // Mecanismo de búsqueda
          const filteredSongs = songs.filter((song) =>
            Matches(props.input, `${song.titulo} ${song.autor}`) ||
            Matches(props.input, song.titulo) ||
            Matches(props.input, song.autor)
          );

          if (filteredSongs.length === 0) return null;

          return (
            <View key={section_index}>
              <Text style={[styles.sectionTitle, {color: theme.title}]}>{section}</Text>
              {filteredSongs.map((song, song_index) => (
                <IndexItem
                  index={song.index}
                  key={`${section}-${song_index}`}
                  title={song.titulo}
                  autor={song.autor}
                  // Pasamos el modelo completo de WatermelonDB para que la pantalla Song tenga toda la info
                  onClick={() => navigation.navigate("Song", { song: song.songModel })}
                />
              ))}
            </View>
          );
        })
        .filter(Boolean);

      setRenderedSections(nuevasSecciones);
      setLoading(false);
    }, 0);

    return () => clearTimeout(handle);
  }, [props.input, props.selected, theme, cancionesDict]); // Añadimos cancionesDict a las dependencias

  return (
    <ScrollView style={styles.general}>
      {loading ? (
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <ActivityIndicator size="large" color={theme.secondaryText} />
          <Text style={{ color: theme.secondaryText, marginTop: 10 }}>Cargando...</Text>
        </View>
      ) : renderedSections.length > 0 ? (
        renderedSections
      ) : (
        <Text style={[styles.noResultsText, {color: theme.secondaryText}]}>No se han encontrado resultados</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  general: {
    height: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  noResultsText: {
    marginTop: 10,
  }
});

// 3. LA MAGIA: Inyectamos las 3 tablas necesarias en el componente
const enhance = withObservables([], () => ({
  canciones: database.collections.get('canciones').query().observe(),
  categorias: database.collections.get('categorias').query().observe(),
  cancionesCategorias: database.collections.get('canciones_categorias').query().observe(),
}));

export default enhance(Index);