import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { useState } from "react";

import BinIcon from '../assets/images/bin_icon/default.svg'

export default function IndexItem(props) {

    const [selected, setSelected] = useState("Todas");

    const bin_icon_size = 15;

    return (
        <TouchableHighlight 
            style={styles.card}  
            onPress={() => props.onClick()}
            underlayColor="transparent">
            <View style={styles.content}>
                <Text style={styles.index}>{props.index}</Text>
                <View style={styles.info}>
                    <Text style={styles.title}>{props.title}</Text>
                    {props.autor.length !== 0 && <Text style={styles.autor}>{props.autor}</Text>}
                </View>
                <TouchableHighlight>
                    <BinIcon height={bin_icon_size} width={bin_icon_size} color="#808080"/>
                </TouchableHighlight>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 5,
        height: 60
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    index: {
        backgroundColor: '#aec4db',
        height: '90%',
        aspectRatio: 1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'white'
    },

    info: {
        justifyContent: 'center',
        paddingLeft: 10
    },

    title: {
        fontSize: 15
    },

    autor: {
        color: '#808080'
    }
});