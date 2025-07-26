import { Text, View, TouchableHighlight, StyleSheet } from "react-native";

import { useTheme } from "../themes/themeContext";
import { useColors } from "../themes/colorsContext";

export default function IndexItem(props) {

    const { theme } = useTheme();
    const { colors } = useColors();

    return (
        <TouchableHighlight
            style={styles.card}
            onPress={() => props.onClick()}
            underlayColor="transparent">
            <View style={styles.content}>
                <View style={[styles.indexContainer, { backgroundColor: colors.indexItem_index }]}>
                    <Text style={[styles.index, { color: theme.background }]}>{props.index}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={[styles.title, { color: theme.mainText }]}>{props.title}</Text>
                    {props.autor.length !== 0 && <Text style={{ color: theme.secondaryText }}>{props.autor}</Text>}
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 5,
        height: 60
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    index: {
        borderRadius: 10,
        fontSize: 18,
        textAlign: 'center', // horizontal
    },

    indexContainer: {
        height: '90%',
        aspectRatio: 1,
        borderRadius: 10,
        justifyContent: 'center', // vertical centering
        alignItems: 'center',     // horizontal centering
        backgroundColor: 'transparent', // o lo que uses en colors.indexItem_index
    },

    info: {
        justifyContent: 'center',
        paddingLeft: 10
    },

    title: {
        fontSize: 15,
    },
});

