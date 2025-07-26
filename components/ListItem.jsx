import { Text, View, TouchableHighlight, StyleSheet } from "react-native";

import { useTheme } from "../themes/themeContext";

import LogoDefault from '../assets/images/logo_paloma_icon/default.svg'
import LogoColor from '../assets/images/logo_paloma_icon/colors.svg'

export default function ListItem(props) {

    const { theme } = useTheme();
    const icon_size = 35;

    const styles = StyleSheet.create({
        card: {
            marginTop: 5,
            height: 60
        },

        content: {
            flexDirection: 'row',
            alignItems: 'center'
        },

        icon: {
            height: '90%',
            aspectRatio: 1,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },

        info: {
            justifyContent: 'center',
            paddingLeft: 10
        },

        title: {
            fontSize: 15,
            color: theme.mainText
        },

        autor: {
            color: theme.secondaryText
        }
    });

    return (
        <TouchableHighlight
            style={styles.card}
            onPress={() => props.onClick(props.title)}
            underlayColor="transparent">
            <View style={styles.content}>
                <View style={[styles.icon, { backgroundColor: props.color === 'default' ? '#aec4db' : `${props.color}` }]} >
                    {props.color === 'default' ?
                        <LogoDefault height={icon_size} width={icon_size} />
                        :
                        <LogoColor height={icon_size} width={icon_size} color={props.color} />
                    }
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>{props.title}</Text>
                    {props.autor.length !== 0 && <Text style={styles.autor}>{props.autor}</Text>}
                </View>
            </View>
        </TouchableHighlight>
    )
}

