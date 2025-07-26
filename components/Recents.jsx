import { Text, View, StyleSheet } from "react-native"

import { useTheme } from "../themes/themeContext";

export default function Recents() {

    const { theme } = useTheme();

    return (
        <View style={styles.general}>
            <Text style={[styles.title, { color: theme.title }]}>Recientes</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    general: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        fontWeight: 600,

    }
});

