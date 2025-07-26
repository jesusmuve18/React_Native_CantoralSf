import { TouchableHighlight, TextInput, View, StyleSheet } from "react-native";
import { useState, useRef } from "react";

import { useTheme } from "../themes/themeContext";
import { useColors } from "../themes/colorsContext";

import LogoSearch from '../assets/images/search_icon/default.svg'
import LogoDelete from '../assets/images/delete_icon/default.svg'

export default function SearchBar(props) {

    const { theme } = useTheme();
    const { colors } = useColors();
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const search_icon_size = 20;

    function handleSearch(text) {
        props.setText(input);
    }

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.blur();   // quitar foco para resetear estado
            setTimeout(() => {
                inputRef.current.focus(); // volver a poner foco y mostrar teclado
            }, 50);  // timeout pequeño para evitar conflictos
        }
    };

    const handleClear = () => {
        setInput("");
        props.setText("");
    }

    return (
        <View style={[styles.cuadro_busqueda, {backgroundColor: colors.searchBar}]}>
            <TextInput
                ref={inputRef}
                style={[styles.input, {color: theme.background,}]}
                placeholder='Buscar'
                placeholderTextColor={theme.background}
                selectionColor={theme.background}
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSearch} />

            {input.length === 0
                ? <TouchableHighlight
                    style={styles.search_icon}
                    underlayColor="transparent"
                    onPress={handleFocus}>
                    <LogoSearch width={search_icon_size} height={search_icon_size} color={theme.background} />
                </TouchableHighlight>
                :
                <TouchableHighlight
                    style={styles.search_icon}
                    underlayColor="transparent"
                    onPress={handleClear}>
                    <LogoDelete width={search_icon_size} height={search_icon_size} color={theme.background} />
                </TouchableHighlight>
            }
        </View>
    )
}

const styles = StyleSheet.create({
        cuadro_busqueda: {
            borderRadius: 10,
            padding: 2,
            paddingLeft: 5,
            height: 45,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        input: {
            flex: 1,
        },

        search_icon: {
            height: '100%',
            width: '15%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }
    });