import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState, useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { withObservables } from '@nozbe/watermelondb/react';
import { database } from '../database/database'

import { useTheme } from "../themes/themeContext";
import { useColors } from "../themes/colorsContext";
import { useNotation } from "../themes/notationContext";

import SongTools from "./SongTools";
import SongContent from "./SongContent";
import SongInfo from "./SongInfo";

import BackIcon from "../assets/images/back_icon/default.svg"
import SettingsIcon from "../assets/images/settings_icon/default.svg"
import PlayIcon from "../assets/images/play_button/default.svg"
import PauseIcon from "../assets/images/pause_button/default.svg"



function Song({ song, navigation }) {

    const { theme } = useTheme();
    const { colors } = useColors();
    const { notationLanguage, notationMode, showChords } = useNotation();

    const back_icon_size = 20;
    const play_icon_size = 20;

    // Si por algún motivo la canción no existe o está cargando
    if (!song) return null;

    const [tono, setTono] = useState(song.tono || 'Do');
    const [cejilla, setCejilla] = useState(0);
    const [transpuesta, setTranspuesta] = useState(0);
    const [velocidad, setVelocidad] = useState(33);

    const reset = () => {
        setTono(song.tono || 'Do');
        setCejilla(0);
        setTranspuesta(0);
        setVelocidad(33);
    }

    const ponerCejilla = (traste) => {

        if (traste >= 0 - song.cejilla && traste <= 12 - song.cejilla) {
            setCejilla(traste);
        }
    }

    const transponer = (semitonos) => {
        if (semitonos >= -12 && semitonos <= 12) {
            setTranspuesta(semitonos);
        }
    }

    const ajustarVelocidad = (porcentaje) => {
        if (porcentaje >= 0 && porcentaje <= 100) {
            setVelocidad(porcentaje);
        }
    }

    const [showTools, setShowTools] = useState(false);

    // Lógica de Scroll
    const scrollViewRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const offset = useRef(0);
    const isUserScrolling = useRef(false);
    const animationFrameId = useRef(null);

    const scrollStep = 0.6; // píxeles por frame, ajusta para velocidad (Ajustar entre 0 y 0.6 y por defecto 0.15)

    const autoScroll = () => {
        if (!isScrolling || isUserScrolling.current) {
            animationFrameId.current = requestAnimationFrame(autoScroll);
            return;
        }

        offset.current += scrollStep * (velocidad / 100);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: offset.current, animated: false });
        }
        animationFrameId.current = requestAnimationFrame(autoScroll);
    };

    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(autoScroll);
        return () => cancelAnimationFrame(animationFrameId.current);
    }, [isScrolling, velocidad]);

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={theme.background} barStyle={theme.barStyle} />

            <View style={styles.navigation_container}>
                <TouchableHighlight style={styles.icon_container} onPress={() => navigation.goBack()} underlayColor="transparent">
                    <BackIcon height={back_icon_size} width={back_icon_size} color={theme.icon} />
                </TouchableHighlight>
                <TouchableHighlight style={styles.icon_container} onPress={() => setShowTools(!showTools)} underlayColor="transparent">
                    <SettingsIcon height={back_icon_size} width={back_icon_size} color={theme.icon} />
                </TouchableHighlight>
            </View>

            <SongTools
                cejilla={cejilla} setCejilla={ponerCejilla} displaycejilla={(song.cejilla ? song.cejilla : 0) + cejilla}
                transpuesta={transpuesta} setTranspuesta={transponer}
                showTools={showTools} setShowTools={setShowTools}
                velocidad={velocidad} setVelocidad={ajustarVelocidad}
                reset={reset}
            />

            <TouchableHighlight
                onPress={() => setIsScrolling((prev) => !prev)}
                style={[styles.play_button_frame, { opacity: isScrolling ? 0.5 : 1 , backgroundColor: colors.song_playButton}]}
                underlayColor="transparent"
            >
                {isScrolling ?
                    <PauseIcon height={play_icon_size} width={play_icon_size} color={theme.background} />
                    :
                    <PlayIcon height={play_icon_size} width={play_icon_size} color={theme.background} />}
            </TouchableHighlight>

            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.general}
                onScrollBeginDrag={() => {
                    isUserScrolling.current = true;
                }}
                onScrollEndDrag={() => {
                    isUserScrolling.current = false;
                    // Actualizar offset a la posición actual para no saltar
                    if (scrollViewRef.current) {
                        scrollViewRef.current.getScrollResponder().scrollResponderScrollNativeHandleToKeyboard;
                        // En RN no hay getScrollPosition fácil, usar onScroll para actualizar offset
                    }
                }}
                onScroll={(event) => {
                    offset.current = event.nativeEvent.contentOffset.y;
                }}
                scrollEventThrottle={16} // para onScroll más fluido
            >

                <Text style={[styles.song_title, {color: theme.mainText}]}>{song.titulo}</Text>
                <Text style={[styles.song_autor, {color: theme.secondaryText}]}>{song.autor}</Text>

                {showChords && <SongInfo
                    tono={tono} notation={{ language: notationLanguage, mode: notationMode }}
                    cejilla={(song.cejilla ? song.cejilla : 0) + cejilla}
                    modificacionCejilla={cejilla}
                    transpuesta={transpuesta}
                />}

                <SongContent
                    cejilla={cejilla}
                    transpuesta={transpuesta}
                    content={song.letraRaw}
                    notation={{ language: notationLanguage, mode: notationMode }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const enhance = withObservables(['route'], ({ route }) => ({
    song: database.collections.get('canciones').findAndObserve(route.params.id)
}));

export default enhance(Song);

const styles = StyleSheet.create({

        general: {
            paddingLeft: 20,
            paddingRight: 5,
        },

        navigation_container: {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        icon_container: {
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center'
        },

        song_title: {
            fontSize: 25,
            fontWeight: 600,
            paddingBottom: 5,
            
        },

        song_autor: {
            fontSize: 20,
            paddingBottom: 10
        },

        play_button_frame: {
            position: 'absolute',
            height: 55,
            width: 55,
            bottom: 15,
            right: 15,
            zIndex: 900,
            borderRadius: 27.5,
            alignItems: 'center',
            justifyContent: 'center',
        },
    })

