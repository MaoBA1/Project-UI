import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utilities/Colors';

// Screens

import DashBoard, { screenOptions as DashBoardScreenOptions } from '../screens/DashBoard';
import FavoriteArtist, { screenOptions as FavoriteArtistScreenOptions } from '../screens/FavoriteArtist';
import FavoriteSong, { screenOptions as FavoriteSongScreenOptions } from '../screens/FavoriteSong';
import Song, { screenOptions as SongScreenOptions } from '../screens/Song';
import ArtistScreen from '../screens/ArtistScreen';

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


const ArtistStackNavigator = createStackNavigator();
export const ArtistStack = () => {
    return(
        <ArtistStackNavigator.Navigator>
            <ArtistStackNavigator.Screen
                name='Artists'
                component={FavoriteArtist}
            />
            <ArtistStackNavigator.Screen
                name='ArtistScreen'
                component={ArtistScreen}
                options={{}}
            />
            <ArtistStackNavigator.Screen
                name='Song'
                component={Song}
                options={SongScreenOptions}
            />
        </ArtistStackNavigator.Navigator>
    )
}


const SongStackNavigator = createStackNavigator();
export const SongStack = () => {
    return(
        <SongStackNavigator.Navigator>
            <SongStackNavigator.Screen
                name='Songs'
                component={FavoriteSong}
                options={FavoriteSongScreenOptions}
            />
            <SongStackNavigator.Screen
                name='Song'
                component={Song}
                options={SongScreenOptions}
            />
        </SongStackNavigator.Navigator>
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
                component={ArtistStack}
                options={{
                    tabBarIcon:({ focused }) => {
                        return(
                            <Ionicons
                                name={focused ? "ios-people" : "ios-people-outline"}
                                size={focused ? 26 : 22}
                                color={focused ? Colors.blue1 : "#FFFFFF"}
                            />
                        )
            
                    },
                    headerShown:false
                }}
            />

            <BottomTabNavigator.Screen
                name='Favorites_Songs'
                component={SongStack}
                options={{
                    tabBarLabel:'Favorites Songs',
                    tabBarIcon:({ focused }) => {
                        return(
                            <Ionicons
                                name={focused ? "md-musical-notes" : "md-musical-notes-outline"}
                                size={focused ? 26 : 22}
                                color={focused ? Colors.blue1 : "#FFFFFF"}
                            />
                        )

                    },
                    headerShown: false
                }}
            />
        </BottomTabNavigator.Navigator>
    )
}