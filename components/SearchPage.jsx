import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';


import { useTheme } from '../themes/themeContext';

import Header from './Header';
import SearchBar from './SearchBar';
import Sections from './Sections';
import Index from './Index';

import data from "../songs/output.json";

export default function SearchPage() {

    const { theme } = useTheme();

    const [text, setText] = useState("");
    const [selected, setSelected] = useState("Todas");
    const [appliedSelected, setAppliedSelected] = useState("Todas");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAppliedSelected(selected);
        }, 0); // O usa requestAnimationFrame o InteractionManager si prefieres

        return () => clearTimeout(timeout);
    }, [selected]);

    const styles = StyleSheet.create({
        general: {
            padding: 20,
            paddingBottom: 0,
            height: '100%',
            backgroundColor: theme.background
        },
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={theme.background} barStyle={theme.barStyle} />
            <View style={styles.general}>
                <Header title='Índice' />
                <SearchBar setText={setText} />
                <Sections selected={selected} setSelected={setSelected} data={data} />
                <Index input={text} selected={appliedSelected} data={data} />
            </View>
        </SafeAreaView>
    );
}

