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
  const button_icon_size = 20;

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
        <Text style={[styles.label, { color: theme.background }]}>Velocidad (x{velocidadLocal < 10 ? `0.0${velocidadLocal}` : velocidadLocal < 100 ? `0.${velocidadLocal}` : '1.00'})</Text>
      </View>
      <View style={[styles.row]}>
        <Slider
          style={{ width: '80%' }}
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

      {showChords &&
        <View style={[styles.row]}>
          <Text style={[styles.label, { color: theme.background }]}>Cejilla</Text>
          <TouchableHighlight style={styles.button} onPress={() => props.setCejilla(props.cejilla - 1)} underlayColor="transparent">
            <MinusIcon width={button_icon_size} height={button_icon_size} color={theme.background} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => props.setCejilla(props.cejilla + 1)} underlayColor="transparent">
            <PlusIcon width={button_icon_size} height={button_icon_size} color={theme.background} />
          </TouchableHighlight>
        </View>}

      {showChords &&
        <View style={[styles.row]}>
          <Text style={[styles.label, { color: theme.background }]}>Transpuesta</Text>
          <TouchableHighlight style={styles.button} onPress={() => props.setTranspuesta(props.transpuesta - 1)} underlayColor="transparent">
            <MinusIcon width={button_icon_size} height={button_icon_size} color={theme.background} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => props.setTranspuesta(props.transpuesta + 1)} underlayColor="transparent">
            <PlusIcon width={button_icon_size} height={button_icon_size} color={theme.background} />
          </TouchableHighlight>
        </View>}

      <View style={[styles.row]}>
        <TouchableHighlight style={styles.button} onPress={() => props.reset()} underlayColor="transparent">
          <Text style={{ color: theme.background }}>Reset</Text>
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
    alignItems: 'center',
    zIndex: 1000,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },

  close_row: {
    height: 35,
  },

  label: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold'
  },

  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button_close: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
