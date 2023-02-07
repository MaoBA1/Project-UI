import React, { useLayoutEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../utilities/Colors";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


function FavoriteArtist({ navigation }) {
    const dispatch = useDispatch();
    const artistSelector = useSelector(state => state.Reducer.Artists);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return <View style={{
                    width:"100%",
                    height:100,
                    alignItems:"center",
                    justifyContent:"center",
                    backgroundColor:Colors.black1,
                }}>
                    <Text style={{
                        fontFamily:"Baloo2-Bold",
                        color:"#FFFFFF",
                        top:10,
                        fontSize:20
                    }} numberOfLines={1}>Your Favorites Artists</Text>
                </View>
            } 
        })

    },[navigation])
    
    if(artistSelector && artistSelector.length > 0) {
        return ( 
            <ScrollView style={{
                flex:1,
            }}>
                {
                    artistSelector.map(item => 
                        <TouchableOpacity 
                            key={item.artistId}
                            style={{
                                width:"100%",
                                alignItems:"center",
                                padding:10,
                                borderBottomWidth:1
                            }}
                            onPress={() => navigation.navigate("ArtistScreen", { artist:item })}
                        >
                            <Text
                                style={{
                                    fontFamily:"Baloo2-Bold",
                                    fontSize:20,
                                    color: Colors.blue1
                                }}
                            >
                                {item.artistName}
                            </Text>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
         );
    }
    return(
        <View style={{ 
            flex:1,
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Text style={{
                bottom:50,
                fontFamily:"Baloo2-ExtraBold",
                color: Colors.blue1,
                fontSize:30,
                textAlign:"center"
            }}>
                You didn't give like to any artist yet
            </Text>
        </View>
    )
    
}

export default FavoriteArtist;

export const screenOptions = props => {
    return{
        // tabBarLabel:'Favorites Artists',
        // title:"Your Favorites Artists",
        // headerTitleAlign:"center",
        // headerBackgroundContainerStyle:{
        //     backgroundColor: Colors.black1
        // },
        
    }
}