import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../themes/themeContext';

import { database } from '../database/database'

import Header from './Header';
import SearchBar from './SearchBar';
import Sections from './Sections';
import Index from './Index';

export default function SearchPage() {
    const { theme } = useTheme();

    const [text, setText] = useState("");
    const [selected, setSelected] = useState("Todas");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={theme.background} barStyle={theme.barStyle} />
            <View style={[styles.general, { backgroundColor: theme.background }]}>
                <Header title='Índice' />
                <SearchBar setText={setText} />
                <Sections selected={selected} setSelected={setSelected} database={database}/>
                <Index searchText={text} category={selected} database={database}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    general: {
        padding: 20,
        paddingBottom: 0,
        height: '100%',
    },
});