import { createContext, useContext, useState, useMemo } from 'react';

const NotationContext = createContext();

export const NotationProvider = ({ children }) => {
  const [notationLanguage, setNotationLanguage] = useState('europe');
  const [notationMode, setNotationMode] = useState('standard');
  const [showChords, setShowChords] = useState(true);

  return (
    <NotationContext.Provider value={{ notationLanguage, notationMode, setNotationLanguage, setNotationMode, showChords, setShowChords }}>
      {children}
    </NotationContext.Provider>
  );
};

export const useNotation = () => useContext(NotationContext);
