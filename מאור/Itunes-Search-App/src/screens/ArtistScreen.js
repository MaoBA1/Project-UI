// https://itunes.apple.com/lookup?id=909253

import React, { useEffect, useState, useLayoutEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { getSongLength } from './DashBoard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../utilities/Colors";


function ArtistScreen({ navigation, route }) {
    const { artistId, artistName } = route.params.artist;
    const [ allArtistSong, setAllArtistSong ] = useState([]);


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
                        fontSize:20,
                    }} numberOfLines={1}>{artistName}</Text>
                </View>
            } 
        })
    },[navigation]);

    useEffect(() => {
        const getArtistData = async() => {
            const response = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&&entity=song`, {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
            setAllArtistSong(data.results.slice(1, data.results.length));
        }
        getArtistData();
    },[])

    

    if(allArtistSong?.length === 0) {
        return (
            <View style={{
                flex:1,
                alignItems:"center",
                justifyContent:"center"
            }}>
                <ActivityIndicator
                    color={Colors.blue1}
                    size="large"
                />
            </View>
        )
    }

    return ( 
        <ScrollView
             style={{
                width:"100%",
                backroundColor:Colors.grey1,
            }}
        >
        {
            allArtistSong?.map((item, index) => 
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
            </TouchableOpacity> )
        }
        </ScrollView>
    );
}

export default ArtistScreen;