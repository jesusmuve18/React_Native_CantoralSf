import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { useTheme } from "../themes/themeContext";

import { Matches } from "../functions/searcher";

import IndexItem from "./IndexItem";

export default function Index(props) {

  const { theme } = useTheme();
  const [renderedSections, setRenderedSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const canciones = props.data.songs;

  // Asignamos índices una sola vez
  useEffect(() => {
    for (const seccion in canciones) {
      const lista = canciones[seccion];
      lista.forEach((cancion, index) => {
        cancion.index = index + 1;
      });
    }
  }, []);

  // Ejecutamos filtrado cada vez que cambia el input o la sección
  useEffect(() => {
    setLoading(true); // Activamos el spinner de inmediato

    const handle = setTimeout(() => {
      const nuevasSecciones = Object.entries(canciones)
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
                  onClick={() => navigation.navigate("Song", { song })}
                />
              ))}
            </View>
          );
        })
        .filter(Boolean);

      setRenderedSections(nuevasSecciones);
      setLoading(false);
    }, 0);

    return () => clearTimeout(handle); // Limpieza si cambia rápido
  }, [props.input, props.selected, theme]);


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
