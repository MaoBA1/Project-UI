import { View, Text } from "react-native";
import Colors from "../utilities/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons'

function FavoriteSong({ navigation }) {
    return ( 
        <View>
            <Text>FavoriteSong</Text>
        </View>
     );
}

export default FavoriteSong;

export const screenOptions = props => {
    return{
        tabBarLabel:'Favorites Songs',
        tabBarIcon:({ focused }) => {
            return(
                <Ionicons
                    name={focused ? "md-musical-notes" : "md-musical-notes-outline"}
                    size={focused ? 26 : 22}
                    color={focused ? Colors.blue1 : "#FFFFFF"}
                />
            )

        },
    }
}