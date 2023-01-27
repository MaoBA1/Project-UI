import { View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../utilities/Colors";

function FavoriteArtist({ navigation }) {
    return ( 
        <View>
            <Text>FavoriteArtist</Text>
        </View>
     );
}

export default FavoriteArtist;

export const screenOptions = props => {
    return{
        tabBarLabel:'Favorites Artists',
        tabBarIcon:({ focused }) => {
            return(
                <Ionicons
                    name={focused ? "ios-people" : "ios-people-outline"}
                    size={focused ? 26 : 22}
                    color={focused ? Colors.blue1 : "#FFFFFF"}
                />
            )

        },
    }
}