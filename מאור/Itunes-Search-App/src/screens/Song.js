import React, { useLayoutEffect } from 'react';
import { View, Text } from "react-native";
import { Video } from 'expo-av';
import Colors from "../utilities/Colors";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Song({ navigation, route }) {
    const {
        trackName,
        previewUrl,
        artistName,
        collectionName,
        releaseDate
    } = route.params.track;
    const formattedReleaseDate = new Date(releaseDate)
    console.log(route);
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
                            width:"87%",
                        }} numberOfLines={1}>{trackName}</Text>
                    </View>
                } 
            })
        },[navigation])

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
                <Text style={{
                    fontFamily:"Baloo2-Bold",
                    fontSize: 20,
                    color: Colors.blue1
                }}>
                    Artist: {artistName}
                </Text>
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
                    color: Colors.greyText
                }}>
                    Collection Name: {collectionName}
                </Text>
                <Text style={{
                    fontFamily:"Baloo2-Medium",
                    fontSize: 15,
                    color: Colors.greyText
                }}>
                    Release Date: {formattedReleaseDate.toDateString()}
                </Text>
                <TouchableOpacity style={{
                    alignSelf:"center",
                    marginTop:50,
                    backgroundColor: Colors.blue1,
                    padding: 10,
                    borderRadius: 50,
                    borderWidth:2,
                    borderColor:"#FFFFFF"
                }}>
                    <AntDesign
                        name="hearto"
                        color={"#FFFFFf"}
                        size={50}
                    />
                </TouchableOpacity>
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