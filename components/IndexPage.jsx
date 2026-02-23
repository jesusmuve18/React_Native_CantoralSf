import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withObservables } from '@nozbe/watermelondb/react';

import { useTheme } from '../themes/themeContext';
import { database } from '../database/database'; 

import Header from './Header';
import SearchBar from './SearchBar';
import Sections from './Sections';
import Index from './Index';

// 1. Recibimos 'canciones' como prop inyectada por WatermelonDB
const SearchPage = ({ canciones }) => {
    const { theme } = useTheme();

    const [text, setText] = useState("");
    const [selected, setSelected] = useState("Todas");
    const [appliedSelected, setAppliedSelected] = useState("Todas");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAppliedSelected(selected);
        }, 0);

        return () => clearTimeout(timeout);
    }, [selected]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={theme.background} barStyle={theme.barStyle} />
            <View style={[styles.general, { backgroundColor: theme.background }]}>
                <Header title='Índice' />
                <SearchBar setText={setText} />
                
                {/* 2. Pasamos las canciones de la BD en lugar del JSON */}
                {/*Sections selected={selected} setSelected={setSelected} data={canciones} */}
                <Index input={text} selected={appliedSelected} data={canciones} />
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

// 3. Envolvemos el componente para observar la tabla 'canciones'
const enhance = withObservables([], () => ({
    canciones: database.collections.get('canciones').query().observe(),
}));

export default enhance(SearchPage);