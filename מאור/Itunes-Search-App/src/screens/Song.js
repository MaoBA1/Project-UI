import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, Image } from "react-native";
import { Video } from 'expo-av';
import Colors from "../utilities/Colors";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getSongLength } from '../screens/DashBoard';
import { getAllFavoriteArtistAction, getAllFavoriteSongsAction} from '../../store/actions/index';

function Song({ navigation, route }) {
    const dispatch = useDispatch();
    const {
        artistId,
        trackName,
        previewUrl,
        artistName,
        collectionName,
        releaseDate,
        trackTimeMillis,
        trackPrice,
        currency,
        artworkUrl100,
        trackId
    } = route.params.track;
    const artistSelector = useSelector(state => state.Reducer.Artists);
    const songsSelector = useSelector(state => state.Reducer.Songs);
    


    const artistLiked = () => {
        if(artistSelector) {
            const artist = artistSelector.filter(artist => artist.artistId === artistId);
            if(artist.length === 1) {
                return true;
            }
        }
        return false;
    }

    const songLiked = () => {
        console.log(songsSelector);
        if(songsSelector) {
            const song = songsSelector.filter(song => song.trackId === trackId);
            if(song.length === 1) {
                return true;
            }
        }
        return false;
    }

    
    const likeToArtist = async() => {
        try{
            const Favorites_Artists = await AsyncStorage.getItem('Favorites_Artists');
            let newListOfFavoritesArtist = [{ artistId: artistId, artistName: artistName }];
            if(!Favorites_Artists) {
                await AsyncStorage.setItem("Favorites_Artists", JSON.stringify(newListOfFavoritesArtist));
            } else {
                newListOfFavoritesArtist = [].concat( newListOfFavoritesArtist, JSON.parse(Favorites_Artists));
                await AsyncStorage.setItem("Favorites_Artists", JSON.stringify(newListOfFavoritesArtist));
            }
            console.log(newListOfFavoritesArtist);
            let action = getAllFavoriteArtistAction(newListOfFavoritesArtist);
            await dispatch(action);
        } catch(error) {
            console.log(error.message);
        }
    }

    const unlikeToArtist = async() => {
        try{
            const Favorites_Artists = await AsyncStorage.getItem('Favorites_Artists');
            let newListOfFavoritesArtist = JSON.parse(Favorites_Artists).filter(artist => artist.artistId !== artistId);
            if(newListOfFavoritesArtist.length > 0) {
                await AsyncStorage.setItem("Favorites_Artists", JSON.stringify(newListOfFavoritesArtist));
            } else {
                newListOfFavoritesArtist = null;
                await AsyncStorage.removeItem("Favorites_Artists");
            }
            console.log(newListOfFavoritesArtist);
            let action = getAllFavoriteArtistAction(newListOfFavoritesArtist);
            await dispatch(action);
        } catch(error) {
            console.log(error.message);
        }
    }

    const likeToSong = async() => {
        try{
            const Favorites_Songs = await AsyncStorage.getItem('Favorites_Songs');
            let newListOfFavoritessong = [route.params.track];
            if(!Favorites_Songs) {
                await AsyncStorage.setItem("Favorites_Songs", JSON.stringify(newListOfFavoritessong));
            } else {
                newListOfFavoritessong = [].concat( newListOfFavoritessong, JSON.parse(Favorites_Songs));
                await AsyncStorage.setItem("Favorites_Songs", JSON.stringify(newListOfFavoritessong));
            }
            console.log(newListOfFavoritessong);
            let action = getAllFavoriteSongsAction(newListOfFavoritessong);
            await dispatch(action);
        } catch(error) {
            console.log(error.message);
        }
    }

    const unlikeToSong = async() => {
        try{
            const Favorites_Songs = await AsyncStorage.getItem('Favorites_Songs');
            let newListOfFavoritesSongs = JSON.parse(Favorites_Songs).filter(song => song.trackId !== trackId);
            if(newListOfFavoritesSongs.length > 0) {
                await AsyncStorage.setItem("Favorites_Songs", JSON.stringify(newListOfFavoritesSongs));
            } else {
                newListOfFavoritesSongs = null;
                await AsyncStorage.removeItem("Favorites_Songs");
            }
            console.log(newListOfFavoritesSongs);
            let action = getAllFavoriteSongsAction(newListOfFavoritesSongs);
            await dispatch(action);
        } catch(error) {
            console.log(error.message);
        }
    }

    

    const formattedReleaseDate = new Date(releaseDate)
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
                    }} numberOfLines={1}>{trackName}</Text>
                </View>
            } 
        })
    },[navigation]);

    return ( 
        <View style={{
            backgroundColor: Colors.greyText,
            flex:1,
            width:"100%",
            height:"100%"
        }}>
            <Video
                style={{
                    width:'80%', 
                    height:250,
                    resizeMode: 'cover',
                    alignSelf:"center",
                    marginTop:20,
                    borderRadius:20
              }}
                source={{ uri: previewUrl }}
                resizeMode="cover"
                posterStyle={{alignSelf:'stretch'}}
                useNativeControls 
            />
            <View  style={{ 
                borderWidth:1,
                marginTop: 10,
                borderColor:Colors.greyText
             }}/>
             <View style={{
                backgroundColor: Colors.greyMiddle,
                flex:1,
                padding:10
             }}>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    margin:5
                }}>
                    {
                        songLiked() ?
                        (
                            <TouchableOpacity onPress={unlikeToSong} style={{
                                alignSelf:"center",
                                backgroundColor: Colors.redUnlike,
                                padding: 5,
                                borderRadius: 20,
                                borderWidth:2,
                                borderColor:"#FFFFFF",
                                flexDirection:"row",
                                width:130,
                                justifyContent:"space-around"
                            }}>
                                <AntDesign
                                    name="dislike2"
                                    color={"#FFFFFf"}
                                    size={20}
                                />
                                <Text style={{
                                    fontFamily:"Baloo2-Bold",
                                    color:"#FFFFFF"
                                }}>
                                    Unlike To song
                                </Text>
                            </TouchableOpacity>
                        )
                        :
                        (
                            <TouchableOpacity onPress={likeToSong} style={{
                                alignSelf:"center",
                                backgroundColor: Colors.blue1,
                                padding: 5,
                                borderRadius: 20,
                                borderWidth:2,
                                borderColor:"#FFFFFF",
                                flexDirection:"row",
                                width:125,
                                justifyContent:"space-around"
                            }}>
                                <AntDesign
                                    name="like2"
                                    color={"#FFFFFf"}
                                    size={20}
                                />
                                <Text style={{
                                    fontFamily:"Baloo2-Bold",
                                    color:"#FFFFFF"
                                }}>
                                    Like To song
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    {
                        artistLiked() ? 
                        (
                            <TouchableOpacity style={{
                                alignSelf:"center",
                                backgroundColor: Colors.redUnlike,
                                padding: 5,
                                borderRadius: 20,
                                borderWidth:2,
                                borderColor:"#FFFFFF",
                                flexDirection:"row",
                                width:135,
                                justifyContent:"space-around"
                            }} onPress={unlikeToArtist}>
                                <AntDesign
                                    name="dislike2"
                                    color={"#FFFFFf"}
                                    size={20}
                                />
                                <Text style={{
                                    fontFamily:"Baloo2-Bold",
                                    color:"#FFFFFF"
                                }}>
                                    Unlike To artist
                                </Text>
                            </TouchableOpacity>
                        )
                        :
                        (
                            <TouchableOpacity style={{
                                alignSelf:"center",
                                backgroundColor: Colors.blue1,
                                padding: 5,
                                borderRadius: 20,
                                borderWidth:2,
                                borderColor:"#FFFFFF",
                                flexDirection:"row",
                                width:125,
                                justifyContent:"space-around"
                            }} onPress={likeToArtist}>
                                <AntDesign
                                    name="like2"
                                    color={"#FFFFFf"}
                                    size={20}
                                />
                                <Text style={{
                                    fontFamily:"Baloo2-Bold",
                                    color:"#FFFFFF"
                                }}>
                                    Like To Artist
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View style={{
                    alignItems:"center"
                }}>
                    <Text style={{
                        fontFamily:"Baloo2-Bold",
                        fontSize: 20,
                        color: "#FFFFFF"
                    }}>
                        {artistName}
                    </Text>
                    <Image
                        source={{ uri: artworkUrl100 }}
                        style={{
                            resizeMode:"contain",
                            width:80,
                            height:80,
                            margin:10
                        }}
                    />
                </View>
                <View style={{
                    borderRadius:20,
                    alignItems:"center",
                    margin:5,
                    padding:5,
                    backgroundColor:"#FFFFFF"
                }}>
                    <Text style={{
                        fontFamily:"Baloo2-Bold",
                        fontSize: 16,
                        color: Colors.blue1
                    }}>
                        Track Name: {trackName}
                    </Text>
                    <Text style={{
                        fontFamily:"Baloo2-Medium",
                        fontSize: 15,
                        color: Colors.greyMiddle
                    }}>
                        Collection Name: {collectionName}
                    </Text>
                    <Text style={{
                        fontFamily:"Baloo2-Medium",
                        fontSize: 15,
                        color: Colors.greyMiddle
                    }}>
                        Release Date: {formattedReleaseDate.toDateString()}
                    </Text>
                    <Text style={{
                        fontFamily:"Baloo2-Medium",
                        fontSize: 15,
                        color: Colors.greyMiddle
                    }}>
                        Track Length: {getSongLength(trackTimeMillis)}
                    </Text>
                    <Text style={{
                        fontFamily:"Baloo2-Medium",
                        fontSize: 15,
                        color: Colors.greyMiddle
                    }}>
                        Track Price: {trackPrice} {currency}
                    </Text>
                </View>
             </View>
        </View>
     );
}

export default Song;

export const screenOptions = ({ navigation }) => {
    return{
        title: navigation.trackName
    }
}