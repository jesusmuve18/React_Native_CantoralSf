import { createContext, useContext, useState, useMemo } from 'react';

import { defaultColors } from './defaultColors';
import { purpleColors } from './purpleColors';
import { greenColors } from './greenColors';

const colorPalettes = {
  default: defaultColors,
  purple: purpleColors,
  green: greenColors,
};

const ColorsContext = createContext();

export const ColorsProvider = ({ children }) => {
  const [colorsName, setColorsName] = useState('default');
  const [chordColor, setChordColor] = useState('#ff0000')

  const colors = useMemo(() => colorPalettes[colorsName] ?? defaultColors, [colorsName]);

  return (
    <ColorsContext.Provider value={{ colors, colorsName, setColorsName, chordColor, setChordColor }}>
      {children}
    </ColorsContext.Provider>
  );
};

export const useColors = () => useContext(ColorsContext);
