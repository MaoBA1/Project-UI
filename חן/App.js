import react,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,FlatList,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ProductsStack, Tabs } from './src/Navigation';
import Data from './Components';

const App = () => {
    
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

export default App;
