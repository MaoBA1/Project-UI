import React, { useLayoutEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Colors from "../utilities/Colors";
import { useDispatch, useSelector } from 'react-redux';
import { getSongLength } from './DashBoard';

function FavoriteSong({ navigation }) {
    const songSelector = useSelector(state => state.Reducer.Songs);
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
   

    if(songSelector && songSelector.length > 0) {
        return ( 
            <ScrollView style={{
                flex:1,
            }}>
                {
                    songSelector.map((item, index) => 
                        <TouchableOpacity onPress={() => navigation.navigate("Song" , { track: item })} style={{
                            width:"100%",
                            padding:10,
                            backgroundColor:Colors.grey1,
                            flexDirection:"row",
                            borderBottomWidth:0.5,
                            alignItems:"center",
                            justifyContent:"space-between"
                        }} key={index}>
                            <View style={{
                                width:"15%"
                            }}>
                                <Image
                                    source={{ uri: item?.artworkUrl100}}
                                    style={{
                                        width:50,
                                        height:50
                                    }}
                                />
                            </View>
                            <View style={{
                                width:"60%",
                            }}>
                                <Text style={{
                                    fontFamily:"Baloo2-Bold",
                                    fontSize:18,
                                    color:Colors.blue1
                                }} numberOfLines={1}>{item?.trackName}</Text>
                                <Text style={{
                                    fontFamily:"Baloo2-Medium",
                                    fontSize:15,
                                    color:Colors.greyText
                                }} numberOfLines={1}>{item?.artistName}</Text>
                            </View>
            
                            <View style={{
                                width:"20%",
                                alignItems:"center"
                            }}>
                                <Text style={{
                                    fontFamily:"Baloo2-Medium",
                                    fontSize:14
                                }}>{getSongLength(item?.trackTimeMillis)}</Text>
                                <Text style={{
                                    fontFamily:"Baloo2-Medium",
                                    fontSize:14
                                }}>{item?.trackPrice} {item?.currency}</Text>
                            </View>
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
                You didn't give like to any song yet
            </Text>
        </View>
    )
}

export default FavoriteSong;

export const screenOptions = props => {
    return{
        
    }
}