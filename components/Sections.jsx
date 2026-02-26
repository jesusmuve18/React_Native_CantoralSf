import { Text, StyleSheet, ScrollView, TouchableHighlight } from "react-native"
import { withObservables } from '@nozbe/watermelondb/react';

import { useTheme } from "../themes/themeContext";
import { useColors } from "../themes/colorsContext";

function Sections({ categorias, selected, setSelected }) {

    const { theme } = useTheme();
    const { colors } = useColors();

    const renderButton = (name, isSelected, id) => (
        <TouchableHighlight
            key={id}
            style={[styles.card, isSelected ?
                [styles.selected, { backgroundColor: colors.searchPage_sections, borderColor: colors.searchPage_sections }] :
                [styles.not_selected, { backgroundColor: theme.background, borderColor: colors.searchPage_sections, }]]}
            onPress={() => setSelected(id)}
            underlayColor="transparent">
            <Text style={isSelected ?
                [styles.text_selected, { color: theme.background }] :
                [styles.text_not_selected, { color: colors.searchPage_sections }]}>{name}</Text>
        </TouchableHighlight>
    );

    return (
        <ScrollView horizontal contentContainerStyle={styles.general}>
            {/* 1. Botón fijo "Todas" */}
            {renderButton("Todas", selected === "Todas", "Todas")}

            {/* 2. Mapeo de las categorías desde la BD */}
            {categorias.map((categoria) =>
                renderButton(categoria.nombre, selected === categoria.id, categoria.id)
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    general: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -5,
        marginRight: -5,
        marginBottom: 10,
    },

    card: {
        margin: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        height: 35,
        justifyContent: 'center',
    },

    selected: {
        borderWidth: 2
    },

    not_selected: {
        borderWidth: 2
    },

    text_selected: {
        fontSize: 16,
    },

    text_not_selected: {
        fontSize: 16,
    }
});

const enhance = withObservables([], ({ database }) => ({
    categorias: database.collections.get('categorias').query().observe(),
}));

export default enhance(Sections);

