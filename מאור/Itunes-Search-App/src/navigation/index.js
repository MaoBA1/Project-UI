import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens

import DashBoard, { screenOptions as DashBoardScreenOptions } from '../screens/DashBoard';
import FavoriteArtist, { screenOptions as FavoriteArtistScreenOptions } from '../screens/FavoriteArtist';
import FavoriteSong, { screenOptions as FavoriteSongScreenOptions } from '../screens/FavoriteSong';
import Song, { screenOptions as SongScreenOptions } from '../screens/Song';

const DashBoardStackNavigator = createStackNavigator();
export const DashBoardStack = () => {
    return(
        <DashBoardStackNavigator.Navigator>
            <DashBoardStackNavigator.Screen
                name='DashBoardScreen'
                component={DashBoard}
                options={DashBoardScreenOptions}
            />
            <DashBoardStackNavigator.Screen
                name='Song'
                component={Song}
                options={SongScreenOptions}
            />
        </DashBoardStackNavigator.Navigator>
    )
}

const BottomTabNavigator = createBottomTabNavigator();
export const BottomTab = () => {
    return(
        <BottomTabNavigator.Navigator screenOptions={{
            tabBarStyle:{
                backgroundColor:"#1A1E1F",
                borderTopColor:"#1A1E1F",
                height:"10%",
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                position:"absolute",
                borderTopWidth:2,
                borderTopColor:"#FFFFFf"
            },
            tabBarLabelStyle:{
                fontFamily:"Baloo2-Medium",
                fontSize:15,
                color:"#FFFFFF"
            }
        }}>
            <BottomTabNavigator.Screen
                name='DashBoard'
                component={DashBoardStack}
                options={DashBoardScreenOptions}
            />

            <BottomTabNavigator.Screen
                name='Artist'
                component={FavoriteArtist}
                options={FavoriteArtistScreenOptions}
            />

            <BottomTabNavigator.Screen
                name='Song'
                component={FavoriteSong}
                options={FavoriteSongScreenOptions}
            />
        </BottomTabNavigator.Navigator>
    )
}