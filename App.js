import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [link, onChangelink] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);

  const [book,setbook] = useState([]);
  var apiavail=false;
  async function fetchBook(stand) {
    var apiavail=false;
    var booklink='https://dope2meal.herokuapp.com/food-list/';
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
        console.log("here0")
      })
      .catch((error) => {
        console.log("here1")
        console.log("the error ",error)
      });
    }
  //   useEffect(() => {
  //     console.log("called func")
  //     fetchBook();
  //   }, []);
  console.log("API AVAIL",apiavail)

    function theprint(topr){
      console.log("recieved link: ",topr);
      var result = link.replace("/", "---");
      console.log("transmitted link: ",result);
      fetchBook();
    }
  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      
      
      
      {/* <TextInput style={styles.input} placeholder="enter link" onChangeText={onChangeText} value={text} /> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangelink}
        value={link}
        placeholder="enter link"
      />

      {/* <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}

      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => theprint(link)}
      />
      
      {/* {
      book.map(item => (
        <View>
          <Text>{item.name}</Text>
        </View>
          ))
      } */}

      <StatusBar style="auto" />
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
