import React from "react";
import { View, Text, Image, StyleSheet,} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


const Data = (props) => {

    return (       
        <View style={myStyle.row_container}>
            <View style={myStyle.image_container}>
                <Image style={myStyle.image} source={{uri:props.data.imageUrl}} />
            </View>
            <View style={myStyle.name_container}>
                <Text style={myStyle.name}>{props.data.firstName}</Text>
                <Text style={myStyle.other}>{props.data.fullName}</Text>
                <Text style={myStyle.age}>{props.data.family}</Text>
            </View>
      </View>
    )
}
 

const myStyle = StyleSheet.create({
    row_container: {
        width:'100%', flexDirection:'row', marginBottom:12,
        borderTopLeftRadius:0, borderTopRightRadius:12,
        borderBottomLeftRadius:0, borderBottomRightRadius:12,
        backgroundColor:'#fff'
      },

    gender:{
        alignItems:'center',justifyContent:'center'
    },

      image_container: {
        width:'30%',
      },

      image: {
        width:'100%', height:105
      },

      name_container : {
        width:'50%', padding:8
      },
 
      name: {
        fontSize:17, fontWeight:'700', color:'#e5383b'
      },

      other: {
        fontSize:15, fontWeight:'700', color:'#adb5bd',paddingVertical:2
      },

      age: {
        fontSize:15, fontWeight:'700', color:'#343a40',paddingVertical:2
      },


      line:{
        width:'100%', height:1, backgroundColor:'#ebebeb', marginVertical:5
      },

      occupation: {
        fontSize:10, fontStyle:'italic'
      }
});

export default Data;