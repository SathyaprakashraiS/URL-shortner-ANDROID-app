import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [book,setbook] = useState([]);
  var apiavail=false;
  async function fetchBook(stand) {
    var apiavail=false;
    var booklink='http://127.0.0.1:8000/sbooks-list/10/';
    const request = await fetch(booklink)
      .then(response => {
        if(response.ok)
      {
        console.log("here")
        apiavail=true;
        return response.json(); 
      }
      else{
        console.log("im not here")
      }
    })
      .then(data => { 
        setbook(data)
        console.log(setbook)
      })
      .catch((error) => {
        console.log("the error ",error)
      });
    }
    useEffect(() => {
      fetchBook();
    }, []);

  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {apiavail ? (
        <FlatList 
        data={book.data}
        showsVerticalScrollIndicator={true}
        renderItem={({item}) =>
        <View>
          <Text>{item.name}</Text>
          <Text>{item.author}</Text>
        </View>
      }
      keyExtractor={item => item._id}
        />
      ):(
        <Text>BOOK ILLA ODRA</Text>
      )
      }
      {/* <FlatList 
      data={book.data}
      showsVerticalScrollIndicator={true}
      renderItem={({item}) =>
      <View>
        <Text>{item.name}</Text>
        <Text>{item.author}</Text>
      </View>
    }
    keyExtractor={item => item._id}
      /> */}
      {/* <Text>BOOK ILLA ODRA</Text> */}
      
      <StatusBar style="auto" />
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
