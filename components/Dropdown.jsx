import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { useTheme } from '../themes/themeContext';
import { useColors } from '../themes/colorsContext';


/** Componente deslizable verticalmente (se usa en la configuración)
 * 
 * @param {*} props:
 * style={{ hoja de estilos }}
 * data={[
 *     { label: 'Etiqueta', value: 'Valor' } // Todos los que se quieran
 * ]}
 * onClick={(value) => setter(value)}
 * value - Valor inicial
 */
export default function DropdownComponent(props) {

    const { theme } = useTheme();
    const { colors } = useColors();

    const [value, setValue] = useState(props.value);
    const [isFocus, setIsFocus] = useState(false);

    // Para entrada personalizable
    const [customInput, setCustomInput] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);

    useEffect(() => {
        // Notificamos al padre si se elige algo
        if (value === 'custom') {
            props.onClick(`#${customInput}`); // mandamos el texto escrito
        } else {
            props.onClick(value);
        }
    }, [value, customInput]);

    useEffect(() => {
        props.onClick(value);
    }, [value])

    const displayData = useMemo(() => {
        const exists = props.data.some(item => item.value === props.value);
        return exists ? props.data : [...props.data, { label: 'Personalizado', value: props.value }];
    }, [props.data, props.value]);


    return (
        <View style={[styles.container, props.style]}>
            <Dropdown
                style={[styles.dropdown, isFocus ? { borderColor: colors.settings_dropdownSelectedBorder } : { borderColor: theme.secondaryText }]}
                dropdownStyle={{
                    backgroundColor: theme.background,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: isFocus ? colors.settings_dropdownSelectedBorder : theme.secondaryText,
                    shadowColor: 'transparent',
                    elevation: 0,
                }}
                containerStyle={{
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'transparent', // Omitir fondo aquí para evitar doble capa
                    borderColor: 'transparent',
                }}
                selectedTextStyle={[styles.selectedTextStyle, { color: theme.mainText }]}


                data={displayData}
                placeholder={props.placeholder || ""}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={props.value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    setShowCustomInput(item.value === 'custom');
                }}
                renderItem={(item, selected) => (
                    <View
                        style={[{
                            padding: 12,
                            borderColor: theme.secondaryText,
                            borderWidth: 0.2
                        }, selected ? { backgroundColor: colors.settings_selectedItem } :
                            { backgroundColor: theme.background }]}
                    >
                        <Text style={!selected ? { color: theme.mainText } : { color: theme.background }}>{item.label}</Text>
                    </View>
                )}
            />
            {showCustomInput && (
                <TextInput
                    placeholder="000000"
                    style={{
                        marginTop: 8,
                        borderColor: theme.secondaryText,
                        borderWidth: 1,
                        borderRadius: 8,
                        padding: 8,
                        color: theme.mainText,
                    }}
                    placeholderTextColor={theme.secondaryText}
                    value={customInput}
                    onChangeText={(value) => setCustomInput(value)}
                    onSubmitEditing={() => setShowCustomInput(false)}
                />
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
});
