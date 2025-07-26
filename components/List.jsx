import { StyleSheet, View, TouchableHighlight, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "react-native";
import { useState } from "react";

import { useTheme } from "../themes/themeContext";

import IndexItem from "./IndexItem";
import EditingIndexItem from "./EditingIndexItem"

import BackIcon from "../assets/images/back_icon/default.svg";
import EditIcon from "../assets/images/edit_icon/default.svg";
import SaveIcon from "../assets/images/accept_icon/default.svg";

export default function List({ route, navigation }) {

    const { theme } = useTheme();
    const back_icon_size = 20;
    const add_icon_size = 20;

    const [editMode, setEditMode] = useState(false);

    const list = route.params.list;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={theme.background} barStyle={theme.barStyle} />

            <View style={styles.general}>

                <View style={styles.navigation_container}>
                    <TouchableHighlight style={styles.icon_container} onPress={() => navigation.goBack()} underlayColor="transparent">
                        <BackIcon height={back_icon_size} width={back_icon_size} color={theme.icon} />
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.icon_container} onPress={() => setEditMode(!editMode)} underlayColor="transparent">
                        {editMode ?
                            <SaveIcon height={add_icon_size} width={add_icon_size} color={theme.icon} /> :
                            <EditIcon height={add_icon_size} width={add_icon_size} color={theme.icon} />}
                    </TouchableHighlight>
                </View>

                <Text style={[styles.title, { color: theme.title }]}>{list.title}</Text>
                <Text style={[styles.autor, { color: theme.secondaryText }]}>{list.autor}</Text>

                <Text >{editMode ? "Modo edición" : "Modo Normal"}</Text>


                <ScrollView style={styles.songs}>
                    {editMode ?
                        (list.songs ? list.songs.map((song, song_index) => (
                            <EditingIndexItem
                                index={song_index + 1}
                                key={song_index}
                                title={song.titulo}
                                autor={song.autor}
                                onClick={() => navigation.navigate("Song", { song })}
                            />
                        )) :
                            <Text>Añade canciones a tu lista</Text>) :

                        (list.songs ? list.songs.map((song, song_index) => (
                            <IndexItem
                                index={song_index + 1}
                                key={song_index}
                                title={song.titulo}
                                autor={song.autor}
                                onClick={() => navigation.navigate("Song", { song })}
                            />
                        )) :
                            <Text style={{color: theme.secondaryText}}>Añade canciones a tu lista</Text>)
                    }
                </ScrollView>
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

    title: {
        fontSize: 25,
        fontWeight: 700,
    },

    autor: {
        fontSize: 20,
    },

    songs: {
        paddingTop: 20,
    }
});

