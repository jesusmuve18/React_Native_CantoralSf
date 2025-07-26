import { View, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { useTheme } from "../themes/themeContext";
import { useColors } from "../themes/colorsContext";

import HomeIcon from '../assets/images/home_icon/default.svg'
import SearchIcon from '../assets/images/search_icon/default.svg'
import ListIcon from '../assets/images/list_icon/default.svg'

export default function Navigation(props) {

    const { theme } = useTheme();
    const { colors } = useColors();
    const navigation = useNavigation();

    const icon_size = 20;


    return (
        <View style={[styles.centered, { backgroundColor: theme.background }]}>
            <View style={styles.general}>
                <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('Tabs', { screen: 'Home' })} underlayColor="transparent">
                    <HomeIcon height={icon_size} width={icon_size} color={props.selected === "Home" ? colors.navigation_selected : theme.icon} />
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('Tabs', { screen: 'Search' })} underlayColor="transparent">
                    <SearchIcon height={icon_size} width={icon_size} color={props.selected === "Search" ? colors.navigation_selected : theme.icon} />
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('Tabs', { screen: 'Lists' })} underlayColor="transparent">
                    <ListIcon height={icon_size} width={icon_size} color={props.selected === "Lists" ? colors.navigation_selected : theme.icon} />
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    general: {
        width: '66%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    centered: {
        alignItems: 'center',
    },

    button: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
