import data from "../data/lists.json"
import { Text, View, StyleSheet, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../themes/themeContext";

import ListItem from './ListItem'



export default function Lists(props) {
  const { theme } = useTheme();
  const navigation = useNavigation();


  const filteredLists = data.lists.filter(item =>
    item.title.toLowerCase().includes(props.input.toLowerCase())
  )

  const renderedLists = filteredLists.map((list, list_index) => (
    <ListItem
      key={list_index}
      title={list.title}
      autor={list.autor}
      color={list.color}
      onClick={() => navigation.navigate("List", { list })}
    />
  ))

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },

    scroll: {
      height: '100%'
    },

    scrollContent: {

    },

    noResultsText: {
      marginTop: 10,
      color: theme.secondaryText
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {renderedLists.length > 0 ? (
          renderedLists
        ) : (
          <Text style={styles.noResultsText}>
            No se han encontrado resultados
          </Text>
        )}
      </ScrollView>
    </View>
  )
}