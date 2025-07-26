import { View, TouchableHighlight, Text, Image, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from '../themes/themeContext';
import { useColors } from '../themes/colorsContext';

import LogoUpIcon from '../assets/images/logo_up_icon/default.svg';
import LogoLeftIcon from '../assets/images/logo_left_icon/default.svg';
import LogoRightIcon from '../assets/images/logo_right_icon/default.svg';


const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
)

const Col = ({ numRows, children }) => {
    return (
        <View style={styles[`${numRows}col`]}>{children}</View>
    )
}

export default function MainMenu() {

    const { theme } = useTheme();
    const { colors } = useColors();

    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.main_menu}>
            <Row>
                <Col numRows={2}>
                    <TouchableHighlight style={[styles.contenedor, styles.indice]} underlayColor="transparent" onPress={() => navigation.navigate("Search", { from: `${route.name}` })}>
                        <View style={[styles.interior, { backgroundColor: colors.homePage_indice }]}>
                            <LogoUpIcon width={"100%"} height={"100%"} style={styles.upicon} color={colors.homePage_indice_line} />
                            <Text style={[styles.etiqueta, { color: theme.homePage_boxLabel }]}>Índice</Text>
                        </View>
                    </TouchableHighlight>
                </Col>
            </Row>
            <Row>
                <Col numRows={1}>
                    <TouchableHighlight style={[styles.contenedor, styles.oracion]} underlayColor="transparent" onPress={() => navigation.navigate("List", { from: `${route.name}` })}>
                        <View style={[styles.interior, { backgroundColor: colors.homePage_oracion }]}>
                            <LogoLeftIcon width={"100%"} height={"100%"} style={styles.upicon} color={colors.homePage_oracion_line} />
                            <Text style={[styles.etiqueta, { color: theme.homePage_boxLabel }]}>Oración</Text>
                        </View>
                    </TouchableHighlight>
                </Col>
                <Col numRows={1}>
                    <TouchableHighlight style={[styles.contenedor, styles.eucaristia]} underlayColor="transparent" onPress={() => navigation.navigate("List", { from: `${route.name}` })}>
                        <View style={[styles.interior, { backgroundColor: colors.homePage_eucaristia }]}>
                            <LogoRightIcon width={"100%"} height={"100%"} style={styles.upicon} color={colors.homePage_eucaristia_line} />
                            <Text style={[styles.etiqueta, { color: theme.homePage_boxLabel }]}>Eucaristía</Text>
                        </View>
                    </TouchableHighlight>
                </Col>
            </Row>
        </View>
    )
}

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        aspectRatio: 2,
    },

    "1col": {
        flex: 1
    },

    "2col": {
        flex: 2
    },

    contenedor: {
        overflow: 'hidden',
        borderRadius: 20,
        height: '100%',
    },

    indice: {
        marginBottom: '0',
    },

    oracion: {
        marginRight: '4%',
        marginTop: '8%',
        marginBottom: '-16%',
    },

    eucaristia: {
        marginLeft: '4%',
        marginTop: '8%',
        marginBottom: '-16%',
    },

    upicon: {
        ...StyleSheet.absoluteFillObject, // top:0, left:0, right:0, bottom:0
        zIndex: 0,
    },


    etiqueta: {
        fontWeight: 700,
        fontSize: 25,
        margin: 10
    },

    interior: {
        backgroundColor: 'inherit',
        height: '100%',
        justifyContent: 'flex-end',
    },

});

