import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";

import { withObservables } from '@nozbe/watermelondb/react';
import { Q } from '@nozbe/watermelondb';

import { Matches } from '../functions/searcher'

import { useTheme } from "../themes/themeContext";
import IndexItem from "./IndexItem";

function Index({ canciones, searchText }) { // 'canciones' ya llega filtrado por el enhancer
    const { theme } = useTheme();
    const navigation = useNavigation();

    const filteredSongs = useMemo(() => {
        if (!searchText) return canciones;

        return canciones.filter((song) =>
            Matches(searchText, `${song.titulo} ${song.autor}`) ||
            Matches(searchText, song.titulo) ||
            Matches(searchText, song.autor)
          );
    }, [canciones, searchText]);

  // Si no se encuentran resultados
  if (filteredSongs.length === 0) {
    return (
      <Text style={[styles.noResultsText, { color: theme.secondaryText }]}>
        No se han encontrado resultados
      </Text>
    );
  }

  return (
    <FlatList
      data={filteredSongs}
      keyExtractor={(item) => item.id} // Watermelon siempre da un ID único string
      initialNumToRender={10} // Mejora la velocidad de carga inicial
      style={styles.general}
      renderItem={({ item, index }) => (
        <IndexItem
          index={index + 1}
          title={item.titulo}
          autor={item.autor}
          onClick={() => navigation.navigate("Song", { id: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  general: {
    height: '100%',
  },
  noResultsText: {
    marginTop: 20,
    textAlign: 'center',
  }
});

// Reacciona a los cambios en props
// Index.js
const enhance = withObservables(['searchText', 'category'], ({ searchText, category, database }) => ({
  canciones: database.collections.get('canciones').query(
    ...(category !== 'Todas' ? [Q.on('canciones_categorias', 'categoria_id', category)] : []),
    Q.sortBy('titulo', Q.asc)
  ).observe(),
}));

export default enhance(Index);