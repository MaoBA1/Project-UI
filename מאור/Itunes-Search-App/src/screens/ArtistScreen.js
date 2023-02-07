// https://itunes.apple.com/lookup?id=909253

import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getSongLength } from './DashBoard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../utilities/Colors";


function ArtistScreen({ navigation, route }) {
    const { artistId, artistName } = route.params.artist;
    const [ allArtistSong, setAllArtistSong ] = useState([]);
    useEffect(() => {
        const getArtistData = async() => {
            const response = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&&entity=song`, {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
            setAllArtistSong(data);
        }
        getArtistData();
    },[])

    


    return ( 
        <>
            {
                allArtistSong.length === 0 ?
                (
                    <View style={{
                        flex:1,
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <AntDesign
                            name="search1"
                            size={100}
                            color={Colors.blue1}
                        />
                        <Text style={{
                            fontFamily:"Baloo2-Bold",
                            fontSize:35,
                            color:Colors.blue1
                        }}>Search for song Here!</Text>
                    </View>
                )
                :
                (
                    <ScrollView style={{
                        width:"100%",
                        backgroundColor:Colors.grey1
                    }}>
                    {
                        allArtistSong.map((item, index) => 
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
                )
            }
        </>
    );
}

export default ArtistScreen;