import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, I18nManager, TextInput } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTab } from './src/navigation';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';


I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

if (Text.defaultProps == null) Text.defaultProps = {};
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false

const loadFontsFromAssets = () => {
  return Font.loadAsync({
    'Baloo2-Bold' : require('./assets/fonts/Baloo2-Bold.ttf'),
    'Baloo2-ExtraBold' : require('./assets/fonts/Baloo2-ExtraBold.ttf'),
    'Baloo2-Medium' : require('./assets/fonts/Baloo2-Medium.ttf'),
    'Baloo2-Regular' : require('./assets/fonts/Baloo2-Regular.ttf'),
    'Baloo2-SemiBold' : require('./assets/fonts/Baloo2-SemiBold.ttf'),
  });
}

const rootReducer = combineReducers({
  
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await loadFontsFromAssets();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTab/>
      </NavigationContainer>
    </Provider>
  );
}


