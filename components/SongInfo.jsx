import { View, Text, StyleSheet } from "react-native"

import { useTheme } from "../themes/themeContext";
import { useColors } from "../themes/colorsContext";

import Acorde from "./Acorde"

export default function SongInfo(props) {

    const { theme } = useTheme();
    const { colors} = useColors();



    return (
        <View style={[styles.general, { borderLeftColor: colors.songInfo_bar }]}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.negrita, { color: theme.mainText }]}>Tono: </Text>
                <Acorde nota={props.tono} notation={props.notation} transpuesta={props.transpuesta - props.modificacionCejilla + props.cejilla} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.negrita, { color: theme.mainText }]}>Cejilla: </Text>
                <Text style={{ color: theme.secondaryText }}>{props.cejilla === 0 ? 'no' : "traste " + props.cejilla}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.negrita, { color: theme.mainText }]}>Transpuesta: </Text>
                <Text style={{ color: theme.secondaryText }}>{props.transpuesta === 0 ? 'no' : (props.transpuesta === 1 || props.transpuesta === -1) ? props.transpuesta + " semitono" : props.transpuesta + " semitonos"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    general: {
        borderLeftWidth: 4,
        paddingLeft: 10,
        marginBottom: 20
    },

    negrita: {
        fontWeight: 600,
    },
})

