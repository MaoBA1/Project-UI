import react  from 'react';
import { View, Text , TouchableOpacity, StyleSheet } from 'react-native';

const Main = (props) => {
    return(
        <View styles={styles.container}>
            <Text></Text>
            <TouchableOpacity styles={styles.Touchable} onPress={() => {props.navigation.navigate('Pageone')}}>
              <View style={styles.Touchable}>
             <Text>Go To Page One</Text>
             </View>
            </TouchableOpacity>        
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
     
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',

    },

    Touchable:{ 
      padding:10,
      alignItems: 'center', 
      backgroundColor:'#023e8a',
      borderRadius: 6,
      justifyContent: 'center',
    }
  });
  

export default Main;