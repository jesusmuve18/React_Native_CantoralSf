import { Text, StyleSheet } from "react-native"
import { useState, useEffect } from "react";
import * as Font from 'expo-font';

import { useColors } from "../themes/colorsContext";


import { formatearAcorde } from "../functions/formater";


export default function Acorde(props) {

    const { chordColor } = useColors();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Carga de las fuentes
    useEffect(() => {
        Font.loadAsync({
            'RobotoMono-Bold': require('../assets/fonts/Roboto_Mono/static/RobotoMono-Bold.ttf'),
        }).then(() => setFontsLoaded(true));
    }, []);

    const acorde = (formatearAcorde(props.nota, props.variaciones, props.bajo, props.transpuesta, props.notation));

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Text style={[styles.acorde, {color: chordColor}]}>{acorde}</Text>
    )
}

const styles = StyleSheet.create({
    acorde: {
        fontFamily: 'RobotoMono-Bold',    }
})