import { Text, StyleSheet } from "react-native"
import { useState, useEffect } from "react";
import * as Font from 'expo-font';

import { useColors } from "../themes/colorsContext";
import { formatearAcorde } from "../functions/formater";


/** Componente Acorde
 * 
 * @param {list} props: 
 *  key - para mayor velocidad en el renderizado
 *  acorde - cadena completa del acorde
 *  nota - Nota
 *  variaciones - Variaciones
 *  bajo - Bajo
 *  notation - Notación
 *  transpuesta - Transposición (normalmente transpuesta-cejilla)
 */
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