import react,{useState,useEffect} from 'react';
import { View, Text , TouchableOpacity, StyleSheet ,FlatList, Alert} from 'react-native';
import Data from '../../../Components';
import Pagetwo from './Pagetwo';

const Pageone = (props) => {

  const [results, setResults] = useState([]);
  
  useEffect(() => {
    doSomething();
  },[])


  const doSomething = async() => {      
    const api = `https://thronesapi.com/api/v2/Characters`;
    const response = await fetch(api, {
      method: 'get'
    });
    const data = await response.json();
    setResults(data);
  }

    return(
        <View style={styles.container}>
            <Text>Page One</Text>
            <TouchableOpacity onPress={() => {props.navigation.navigate('Pagetwo')}}>
              <Text>Go To Page Two</Text>
            </TouchableOpacity>
            <View style={{width:'100%', height:'90%'}}>
            {
            results ? (
            <FlatList
            data={results}
            keyExtractor={item => item.id}
            renderItem={itemRow => 
              <Data data={itemRow.item} 
              onclick={() => {props.navigation.navigate('Pagetwo',{character:itemRow.item})}}
            />
            }
          />
          ) : (
            <Text>No Results</Text>
          )
        }
        </View>
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

export default Pageone;