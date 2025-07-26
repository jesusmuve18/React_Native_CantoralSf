import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from '../themes/themeContext';

import MainMenu from './MainMenu';
import Header from './Header';
import Recents from './Recents';

export default function HomePage() {

    const { theme } = useTheme();

    const navigation = useNavigation();
    const route = useRoute();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={theme.background} barStyle={theme.barStyle} />
            <View style={[styles.general, { backgroundColor: theme.background }]}>
                <Header title='Inicio' icon onClick={() => navigation.navigate("Settings", { from: `${route.name}` })} />
                <MainMenu />
                <Recents />
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

