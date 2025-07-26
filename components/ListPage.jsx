import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useState } from 'react';

import { useTheme } from '../themes/themeContext';

import Lists from './Lists';
import SearchBar from './SearchBar';

import AddIcon from '../assets/images/add_icon/default.svg'

export default function SearchPage() {

    const { theme } = useTheme();
    const [text, setText] = useState("");

    const icon_size = 20;

    const addSong = () => { };

    const styles = StyleSheet.create({
        general: {
            padding: 20,
            paddingBottom: 0,
            flex: 1,
            backgroundColor: theme.background
        },

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
            color: theme.title
        },
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={theme.background} barStyle={theme.barStyle} />
            <View style={styles.general}>
                <View style={styles.header}>
                    <Text style={styles.title}>Listas</Text>
                    <TouchableHighlight onClick={() => addSong()} underlayColor="transparent">
                        <AddIcon height={icon_size} width={icon_size} color={theme.icon} />
                    </TouchableHighlight>
                </View>
                <SearchBar setText={setText} />
                <Lists input={text} />
            </View>
        </SafeAreaView>
    );
}

