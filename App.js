import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [link, onChangelink] = useState(null);
  const [number, onChangeNumber] = useState(" ");

  const [book,setbook] = useState([]);
  var apilink=[];
  var apiavail="false";
  async function fetchBook(sendlink) {
    var apiavail="false";
    var booklink='https://urlsho.herokuapp.com/url/shortner/'+sendlink;
    console.log(booklink)
    const request = await fetch(booklink)
      .then(response => {
        if(response.ok)
      {
        console.log("here")
        var apiavail="false";
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

  async function theprint(topr) {
    apiavail="false";
      console.log("recieved link: ",topr);
      var result=topr
      var i=0
      for(i=0;i<10;i++){
        result = result.replace("/", "---");
      }
      console.log("transmitted link: ",result);
    var booklink='https://urlsho.herokuapp.com/url/shortner/'+result+'/';
    console.log(booklink)
    const request = await fetch(booklink)
      .then(response => {
        if(response.ok)
      {
        console.log("here")
        apiavail="true";
        return response.json(); 
      }
      else{
        console.log("im not here")
      }
    })
      .then(data => { 
        console.log("the data is: ",data)
        setbook(data)
        console.log("here0")
        //console.log(setbook)
        apilink=data;
        apiavail="true";
        console.log(apilink)
        console.log(apilink[0].themurl)
        console.log(apiavail)
        console.log(apilink.length)
        onChangeNumber(apilink[0].themurl)
        Alert.alert(apilink[0].themurl)
      })
      .catch((error) => {
        console.log("here1")
        console.log("the error ",error)
      });
    }
    console.log("APIAVAIL: ",apiavail)

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
      book.map(item => {
        <View>
          <Text>{apilink[0].themurl}</Text>
        </View>
})
      } */}
      
      <Text>{number}</Text>

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
