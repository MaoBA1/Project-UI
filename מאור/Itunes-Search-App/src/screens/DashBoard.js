import { View, Text, StatusBar, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../utilities/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFavoriteArtistAction, getAllFavoriteSongsAction } from '../../store/actions/index';

// My Components
import HeaderWithSearch from "../components/HeaderWithSearch";

const Height = Dimensions.get("window").height;


export const getSongLength = (len) => {
    var milliseconds = parseInt((len % 1000) / 100),
    seconds = Math.floor((len / 1000) % 60),
    minutes = Math.floor((len / (1000 * 60)) % 60),
    hours = Math.floor((len / (1000 * 60 * 60)) % 24);

    hours = (hours == 0) ? null : hours;
    if(hours != null) {
        hours = (hours < 10) ? "0" + hours : hours;
    }            
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    if(hours != null) {
        return(hours + ":" + minutes + ":" + seconds );
    } 
    return(minutes + ":" + seconds );
}

const DashBoard = ({ navigation }) => {
    const [ searchResult, setSearchResult ] = useState([]);
    const [ searchText, setSeacrhText ] = useState('');
    const [ isLoading, setISLoading ] = useState(false);
    const artistSelector = useSelector(state => state.Reducer.Artists);
    const songSelector = useSelector(state => state.Reducer.Songs);
    const dispatch = useDispatch();
    // console.log("artist selector: " + JSON.stringify(artistSelector));
    // console.log("song selector: " + JSON.stringify(songSelector));
    useEffect(() => {
        const getAllDataFromAsyncStorage = async() => {
            try{
                const Favorites_Artists = await AsyncStorage.getItem('Favorites_Artists');
                const Favorites_Songs = await AsyncStorage.getItem('Favorites_Songs');
                if(Favorites_Artists) {
                    let action = getAllFavoriteArtistAction(JSON.parse(Favorites_Artists));
                    await dispatch(action);
                    // console.log("selector: " + JSON.stringify(artistSelector));
                }
                if(Favorites_Songs) {
                    let action = getAllFavoriteSongsAction(JSON.parse(Favorites_Songs));
                    await dispatch(action);
                    // console.log("selector: " + JSON.stringify(songSelector));
                }
            } catch(error) {
                console.log(error);
            }
        }

        getAllDataFromAsyncStorage();

        // const removeAsyncStorage = async() => {
        //     await AsyncStorage.removeItem("Favorites_Artists");
        // }
        // removeAsyncStorage();
    }, []);

    

    return ( 
        <View style={{
            backgroundColor:Colors.grey1,
            flex:1,
            width:"100%",
            height:"100%"
        }}>
            <StatusBar hidden/>
            <HeaderWithSearch
                searchText={searchText}
                setSearchResult={setSearchResult}
                setSearchText={setSeacrhText}
                setIsLoading={setISLoading}
            />
            
            <View
                style={{
                    flex:1,
                    width:"100%",
                    height:"100%",
                    alignItems:"center",
                    justifyContent:"center",
                    backgroundColor: "#FFFFFF",
                }}
            >
                
                {
                    isLoading ?
                    (
                        <ActivityIndicator
                            size={"large"}
                            color={Colors.blue1}
                        />
                    )
                    :
                    (
                        <>
                            {
                                searchResult.length === 0 ?
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
                                        searchResult.map((item, index) => 
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
                    )
                }
            </View>
        </View>
     );
}

export default DashBoard;

export const screenOptions = props => {
    return{
        tabBarLabel:'DashBoard',
        tabBarIcon:({ focused }) => {
            return(
                <MaterialCommunityIcons
                    name={focused ? "view-dashboard" : "view-dashboard-outline"}
                    size={focused ? 26 : 22}
                    color={focused ? Colors.blue1 : "#FFFFFF"}
                />
            )

        },
        headerShown:false
    }
}