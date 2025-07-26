import { Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { useTheme } from "../themes/themeContext";
import { useNotation } from "../themes/notationContext";

import * as Font from 'expo-font';

import { Formatear } from "../functions/formater";

export default function SongContent(props) {

    const { theme } = useTheme();
    const { showChords } = useNotation();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Carga de las fuentes
    useEffect(() => {
        Font.loadAsync({
            'RobotoMono-Regular': require('../assets/fonts/Roboto_Mono/static/RobotoMono-Regular.ttf'),
        }).then(() => setFontsLoaded(true));

    }, []);

    const content = Formatear(props.song.content, props.notation, props.transpuesta, props.cejilla, showChords);

    if (!fontsLoaded) {
        return null; // O una pantalla de carga
    }

    const styles = StyleSheet.create({

        letra: {
            fontFamily: 'RobotoMono-Regular',
            fontSize: 14,
            paddingBottom: 40,
            color: theme.mainText

        }
    })

    return (
        <Text style={styles.letra}>
            {content}
        </Text>
    )
}

