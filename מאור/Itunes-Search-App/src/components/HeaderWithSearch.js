import { View, TextInput, TouchableOpacity, Text, Keyboard } from "react-native";
import Colors from "../utilities/Colors";

function HeaderWithSearch({ setSearchResult, searchText, setSearchText, setIsLoading }) {
    const search = async() => {
        setIsLoading(true);
        Keyboard.dismiss();
        try{
            const response = await fetch(`https://itunes.apple.com/search?term=${searchText}`, {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setSearchResult(data?.results);
        }catch(error) {
            console.log(error);
        }
        return setIsLoading(false);
    }
    return (
        <View style={{
            width:"100%",
            height:100,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:Colors.black1,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-around",
            paddingHorizontal:15
        }}>
            <TextInput
                style={{
                    top:10,
                    width:"75%",
                    height:30,
                    borderRadius:20,
                    backgroundColor:"#FFFFFF",
                    paddingHorizontal:10,
                    fontFamily:"Baloo2-Medium",
                    fontSize:15,
                    color: Colors.blue1
                }}
                placeholder="Search..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
            />
            <TouchableOpacity onPress={search} style={{
                backgroundColor: Colors.blue1,
                top:10,
                width:"18%",
                alignItems:"center",
                padding:5,
                borderRadius:20,
                borderWidth:2,
                borderColor:"#FFFFFF"
            }}>
                <Text>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderWithSearch;