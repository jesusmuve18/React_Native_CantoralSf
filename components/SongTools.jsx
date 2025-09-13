import { View, StyleSheet, TouchableHighlight, Animated, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import Slider from "@react-native-community/slider";

import { useTheme } from "../themes/themeContext";
import { useColors } from "../themes/colorsContext";
import { useNotation } from "../themes/notationContext";

import CloseIcon from '../assets/images/down_arrow_icon/default.svg';
import PlusIcon from '../assets/images/plus_icon/default.svg'
import MinusIcon from '../assets/images/minus_icon/default.svg'


export default function SongTools(props) {

  const { theme } = useTheme();
  const { colors } = useColors();
  const { showChords } = useNotation();
  const close_icon_size = 15;
  const button_icon_size = 15;

  // Valor animado para la posición vertical
  const translateY = useRef(new Animated.Value(100)).current;

  // Estado interno para controlar el render (para esperar a que termine la animación)
  const [visible, setVisible] = useState(props.showTools);
  const [velocidadLocal, setVelocidadLocal] = useState(props.velocidad);

  useEffect(() => {
    if (props.showTools) {
      setVisible(true); // mostramos el componente antes de animar
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animar hacia abajo y luego ocultar
      Animated.timing(translateY, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [props.showTools]);


  // Necesario para el reset
  useEffect(() => {
    setVelocidadLocal(props.velocidad);
  }, [props.velocidad])

  // Si no está visible, no renderizamos nada
  if (!visible) return null;

  return (
    <Animated.View style={[styles.general, { transform: [{ translateY }], backgroundColor: colors.songTools_background }]}>

      <View style={[styles.row, styles.close_row]}>
        <TouchableHighlight style={styles.button_close} onPress={() => props.setShowTools(false)} underlayColor="transparent">
          <CloseIcon width={close_icon_size} height={close_icon_size} color={theme.background} />
        </TouchableHighlight>
      </View>

      <View style={[styles.row]}>
        <Text style={[styles.label, { color: theme.background }]}>Velocidad </Text>
        <View style={styles.slider_box}>
          <Text style={[styles.slider_value, { color: theme.background }]}>x{velocidadLocal < 10 ? `0.0${velocidadLocal}` : velocidadLocal < 100 ? `0.${velocidadLocal}` : '1.00'}</Text>
          <Slider
            style={{ width: 150, marginRight: -15 }}
            minimumValue={0}
            maximumValue={100}
            step={1}
            minimumTrackTintColor={theme.background}
            thumbTintColor={theme.background}
            value={velocidadLocal}
            onValueChange={setVelocidadLocal}
            onSlidingComplete={() => props.setVelocidad(velocidadLocal)}
          />
        </View>
      </View>

      {showChords &&
        <View style={[styles.row]}>
          <Text style={[styles.label, { color: theme.background }]}>Cejilla</Text>
          <View style={styles.buttons}>
            <TouchableHighlight style={[styles.button, { aspectRatio: 1, borderColor: theme.secondaryText }]} onPress={() => props.setCejilla(props.cejilla - 1)} underlayColor="transparent">
              <MinusIcon width={button_icon_size} height={button_icon_size} color={theme.background} />
            </TouchableHighlight>
            <Text style={[styles.number, { color: theme.background, borderColor: theme.secondaryText }]}>{props.displaycejilla}</Text>
            <TouchableHighlight style={[styles.button, { aspectRatio: 1, borderColor: theme.secondaryText }]} onPress={() => props.setCejilla(props.cejilla + 1)} underlayColor="transparent">
              <PlusIcon width={button_icon_size} height={button_icon_size} color={theme.background} />
            </TouchableHighlight>
          </View>
        </View>}

      {showChords &&
        <View style={[styles.row]}>
          <Text style={[styles.label, { color: theme.background }]}>Transpuesta</Text>
          <View style={styles.buttons}>
          <TouchableHighlight style={[styles.button, { aspectRatio: 1, borderColor: theme.secondaryText }]} onPress={() => props.setTranspuesta(props.transpuesta - 1)} underlayColor="transparent">
            <MinusIcon width={button_icon_size} height={button_icon_size} color={theme.background} />
          </TouchableHighlight>
          <Text style={[styles.number, { color: theme.background }]}>{props.transpuesta}</Text>
          <TouchableHighlight style={[styles.button, { aspectRatio: 1, borderColor: theme.secondaryText }]} onPress={() => props.setTranspuesta(props.transpuesta + 1)} underlayColor="transparent">
            <PlusIcon width={button_icon_size} height={button_icon_size} color={theme.background} />
          </TouchableHighlight>
          </View>
        </View>}

      <View style={[styles.row, { justifyContent: 'center' }]}>
        <TouchableHighlight style={[styles.button, { borderColor: theme.secondaryText}]} onPress={() => props.reset()} underlayColor="transparent">
          <Text style={[styles.reset_button, { color: theme.background }]}>Reset</Text>
        </TouchableHighlight>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  general: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 40
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between'
  },

  close_row: {
    height: 35,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  number: {
    paddingHorizontal: 15,
  },

  slider_box: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 5,
    padding: 5
  },

  button_close: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  reset_button: {
    paddingHorizontal: 10
  }
});
