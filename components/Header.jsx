import { Text, View, StyleSheet, TouchableHighlight } from "react-native";

import { useTheme } from '../themes/themeContext';
import { useColors } from '../themes/colorsContext';

import UserIcon from '../assets/images/user_default_icon/default'

/** 
 * props:
 * - title: Título
 * - icon: booleano que indica si poner el icono de usuario
 * - onClick: función que realiza al pulsar sobre el icono
*/

export default function Header(props) {

    const { theme } = useTheme();
    const { colors } = useColors();
    const logo_size = 35;

    return (
        <View style={styles.header}>
            <Text style={[styles.title, {color: theme.title}]}>{props.title}</Text>
            {props.icon &&
                <TouchableHighlight onPress={props.onClick} underlayColor="transparent">
                    <UserIcon height={logo_size} width={logo_size} color={colors.homePage_userIcon} />
                </TouchableHighlight>}
        </View>
    )
};

const styles = StyleSheet.create({

        header: {
            marginBottom: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        },

        title: {
            fontSize: 28,
            fontWeight: 700,
        },
    });
