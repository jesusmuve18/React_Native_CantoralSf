import { StyleSheet, View, TouchableHighlight, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "react-native";
import DropdownComponent from "./Dropdown";

import { useTheme } from "../themes/themeContext";
import { useColors } from "../themes/colorsContext";
import { useNotation } from "../themes/notationContext";

import Header from "./Header";

import BackIcon from "../assets/images/back_icon/default.svg";


export default function List({ navigation }) {

    const { theme, themeName, setThemeName } = useTheme();
    const { colorsName, setColorsName, chordColor, setChordColor } = useColors();
    const { notationLanguage, notationMode, setNotationLanguage, setNotationMode, showChords, setShowChords } = useNotation();

    const back_icon_size = 20;
    const circle_color_size = 30;
    const panel_width = 150;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={theme.background} barStyle={theme.barStyle} />

            <View style={styles.general}>

                <View style={styles.navigation_container}>
                    <TouchableHighlight style={styles.icon_container} onPress={() => navigation.goBack()} underlayColor="transparent">
                        <BackIcon height={back_icon_size} width={back_icon_size} color={theme.icon} />
                    </TouchableHighlight>
                </View>

                <Header title="Ajustes" />

                <View style={styles.entry}>
                    <Text style={[styles.text, { color: theme.mainText }]}>Tema</Text>

                    <DropdownComponent
                        style={{ width: panel_width }}
                        data={[
                            { label: 'Sistema', value: 'system' },
                            { label: 'Claro', value: 'light' },
                            { label: 'Oscuro', value: 'dark' },
                        ]}
                        onClick={(value) => setThemeName(value === 'system' ? null : value)}
                        value={themeName === null ? 'system' : themeName}
                    />
                </View>

                <View style={styles.entry}>
                    <Text style={[styles.text, { color: theme.mainText }]}>Colores</Text>

                    <DropdownComponent
                        style={{ width: panel_width }}
                        data={[
                            { label: 'Por defecto', value: 'default' },
                            { label: 'Morado', value: 'purple' },
                        ]}
                        onClick={(value) => setColorsName(value)}
                        value={colorsName}
                    />
                </View>

                <View style={styles.entry}>
                    <Text style={[styles.text, { color: theme.mainText , width: 100}]}>Color Acordes</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: panel_width + circle_color_size + 10,
                            justifyContent: 'left'
                        }}>
                        <View
                            style={{
                                width: circle_color_size,
                                height: circle_color_size,
                                borderRadius: (circle_color_size/2),
                                marginRight: 10,
                                backgroundColor: (chordColor==='custom' || (chordColor.length!==7 && chordColor.length!==4))? 'black' : chordColor,
                            }}>
                        </View>
                        <DropdownComponent
                            style={{ width: panel_width }}
                            data={[
                                { label: 'Rojo', value: 'red' },
                                { label: 'Naranja', value: '#ff9900' },
                                { label: 'Amarillo', value: '#ffff00' },
                                { label: 'Verde', value: '#00ff00' },
                                { label: 'Cian', value: '#00ffff' },
                                { label: 'Azul aciano', value: '#4a86e8' },
                                { label: 'Azul oscuro', value: '#0000ff' },
                                { label: 'Morado', value: '#9900ff' },
                                { label: 'Magenta', value: '#ff00ff' },
                                { label: 'B/N', value: theme.mainText },
                                { label: 'Personalizar', value: 'custom' },
                            ]}
                            onClick={(value) => setChordColor(value)}
                            value={chordColor}
                        />
                    </View>
                </View>

                <View style={styles.entry}>
                    <Text style={[styles.text, { color: theme.mainText }]}>Notación</Text>

                    <DropdownComponent
                        style={{ width: panel_width }}
                        data={[
                            { label: 'Europea', value: 'europe' },
                            { label: 'Americana', value: 'american' },
                        ]}
                        onClick={(value) => setNotationLanguage(value)}
                        value={notationLanguage}
                    />
                </View>

                <View style={styles.entry}>
                    <Text style={[styles.text, { color: theme.mainText }]}>Modo</Text>

                    <DropdownComponent
                        style={{ width: panel_width }}
                        data={[
                            { label: 'Estándard', value: 'standard' },
                            { label: 'Sostenidos', value: 'sharp' },
                            { label: 'Bemoles', value: 'flat' },
                        ]}
                        onClick={(value) => setNotationMode(value)}
                        value={notationMode}
                    />
                </View>

                

                <View style={styles.entry}>
                    <Text style={[styles.text, { color: theme.mainText }]}>Mostrar Acordes</Text>

                    <DropdownComponent
                        style={{ width: panel_width }}
                        data={[
                            { label: 'Si', value: true },
                            { label: 'No', value: false },
                        ]}
                        onClick={(value) => setShowChords(value)}
                        value={showChords}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    general: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
    },

    navigation_container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    entry: {
        paddingVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    text: {
        fontSize: 18
    }
});

