import react  from 'react';
import { View, Text , TouchableOpacity, StyleSheet } from 'react-native';

const Pagetwo= (props) => {
    return(
        <View style={styles.container}>
            <Text>{props.character.firstName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


export default Pagetwo;