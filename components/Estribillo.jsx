import { Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

/**
 * Entorno del estribillo (lo pone en negrita)
 */
export default function Estribillo({ children }) {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Carga de las fuentes
    useEffect(() => {
        Font.loadAsync({
            'RobotoMono-Bold': require('../assets/fonts/Roboto_Mono/static/RobotoMono-Bold.ttf'),
        }).then(() => setFontsLoaded(true));
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Text style={styles.general}>
            {'\n'}{children}{'\n'}
        </Text>
    );
};

const styles = StyleSheet.create({
    general: {
        fontFamily: "RobotoMono-Bold"
    }
})

