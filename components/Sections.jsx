import { Text, StyleSheet, ScrollView, TouchableHighlight } from "react-native"

import { useTheme } from "../themes/themeContext";
import { useColors } from "../themes/colorsContext";

export default function Sections(props) {

    const { theme } = useTheme();
    const { colors } = useColors();

    return (
        <ScrollView horizontal contentContainerStyle={styles.general}>
            <TouchableHighlight
                style={[styles.card, props.selected === "Todas" ?
                    [styles.selected, { backgroundColor: colors.searchPage_sections, borderColor: colors.searchPage_sections }] :
                    [styles.not_selected, { backgroundColor: theme.background, borderColor: colors.searchPage_sections, }]]}
                onPress={() => props.setSelected("Todas")}
                underlayColor="transparent">
                <Text style={props.selected === "Todas" ?
                    [styles.text_selected, { color: theme.background }] :
                    [styles.text_not_selected, { color: colors.searchPage_sections }]}>Todas</Text>
            </TouchableHighlight>

            {Object.entries(props.data.songs).map(([section, songs], section_index) => {
                let selected = (props.selected === section)

                return (
                    <TouchableHighlight
                        key={section_index}
                        style={[styles.card, selected ?
                            [styles.selected, { backgroundColor: colors.searchPage_sections, borderColor: colors.searchPage_sections }] :
                            [styles.not_selected, { backgroundColor: theme.background, borderColor: colors.searchPage_sections, }]]}
                        onPress={() => props.setSelected(section)}
                        underlayColor="transparent">
                        <Text style={selected ?
                            [styles.text_selected, { color: theme.background }] :
                            [styles.text_not_selected, { color: colors.searchPage_sections }]}>{section}</Text>
                    </TouchableHighlight>)

            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    general: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -5,
        marginRight: -5,
        marginBottom: 10
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

