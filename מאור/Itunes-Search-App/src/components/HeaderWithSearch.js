import { View, TextInput } from "react-native";
import Colors from "../utilities/Colors";

function HeaderWithSearch({ setSearchResult, searchText, setSearchText }) {
    const search = async() => {
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
            justifyContent:"center"
        }}>
            <TextInput
                style={{
                    top:10,
                    width:"70%",
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
                onChange={search}
            />
        </View>
    )
}

export default HeaderWithSearch;