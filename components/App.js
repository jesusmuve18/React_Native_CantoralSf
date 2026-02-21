import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as NavigationBar from 'expo-navigation-bar';

import { ThemeProvider } from '../themes/themeContext';
import { ColorsProvider } from '../themes/colorsContext'
import { NotationProvider } from '../themes/notationContext';

import HomePage from './HomePage'
import IndexPage from './IndexPage'
import ListPage from './ListPage'
import Navigation from './Navigation'
import Song from './Song'
import List from './List'
import Settings from './SettingsPage';

import { syncDatabase } from '../database/sync'

const handleSincronizar = async () => {
  try {
    console.log('Sincronizando...')
    await syncDatabase()
    console.log('¡Sincronización completada con éxito!')
  } catch (error) {
    console.error('Falló la sincronización:', error)
  }
}

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const [currentTab, setCurrentTab] = useState("Home");

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: { display: 'none' },
        }}>
        <Tab.Screen
          name="Home"
          component={HomePage}
          listeners={{
            focus: () => setCurrentTab('Home'),
          }} />
        <Tab.Screen
          name="Search"
          component={IndexPage}
          listeners={{
            focus: () => setCurrentTab('Search'),
          }} />
        <Tab.Screen
          name="Lists"
          component={ListPage}
          listeners={{
            focus: () => setCurrentTab('Lists'),
          }} />
      </Tab.Navigator>
      <Navigation selected={currentTab} />
    </>
  );
}

export default function App() {

  useEffect(() => { // Ocultar los botones de navegación del móvil
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync('overlay-swipe'); // para que reaparezca al deslizar
    NavigationBar.setBackgroundColorAsync("transparent"); // importante
  }, []);

  handleSincronizar()

  // const [currentRoute, setCurrentRoute] = useState("Home");

  return (
    <ThemeProvider>
      <ColorsProvider>
        <NotationProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                animation: 'fade',// Opciones: 'default', 'fade', 'slide_from_right', 'slide_from_left', 'slide_from_bottom', 'none'
              }}>
              {/*Ventanas dentro del Tab Navigator*/}
              <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{ headerShown: false }}
              />

              {/* Pantallas que aparecerán encima */}

              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                  presentation: 'modal',
                  headerShown: false
                }}
              />

              <Stack.Screen
                name="Song"
                component={Song}
                options={{
                  presentation: 'modal',
                  headerShown: false
                }}
              />

              <Stack.Screen
                name="List"
                component={List}
                options={{
                  presentation: 'modal',
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NotationProvider>
      </ColorsProvider>
    </ThemeProvider >
  );
}
