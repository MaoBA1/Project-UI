import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Main from './screens/products/Main';
import Pageone from './screens/products/Pageone';
import Pagetwo from './screens/products/Pagetwo';

const Stack = createNativeStackNavigator();


export const ProductsStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name ='Main' component={Main} />
            <Stack.Screen name ='Pageone' component={Pageone} />
            <Stack.Screen name ='Pagetwo' component={Pagetwo} />
        </Stack.Navigator>
    )
}

const TabsNavigator = createMaterialBottomTabNavigator();
export const Tabs = () =>{
    return(
        <TabsNavigator.Navigator  activeColor='#000' inactiveColor='#fff' barStyle={{backgroundColor:'#0b090a'}} >
            <TabsNavigator.Screen 
            name= 'Main' 
            options= {{tabBarLabel:'Main',tabBarIcon: ({color}) => (<MaterialCommunityIcons name='view-grid' size={24} color={color} />)}}
            component={Main}   />
            <TabsNavigator.Screen 
            name= 'Pageone'
            options= {{tabBarLabel:'Pageone' ,tabBarIcon: ({color}) => (<Entypo name='user' size={24} color={color} />)}}
            component={Pageone}   />
            <TabsNavigator.Screen
            name= 'Pagetwo'
            options= {{tabBarLabel:'Pagetwo' ,tabBarIcon: ({color}) => (<Ionicons name='settings-sharp' size={24} color={color} />)}}
            component={Pagetwo}   />
        </TabsNavigator.Navigator>
    )
}