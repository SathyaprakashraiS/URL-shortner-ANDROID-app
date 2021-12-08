import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();

  const [link, onChangelink] = useState(null);
  const [number, onChangeNumber] = useState(" ");

  const [copiedText, setCopiedText] = React.useState('');


  const [book,setbook] = useState([]);
  var apilink=[];
  var apiavail="false";
  async function fetchBook(sendlink) {
    var apiavail="false";
    var booklink='https://seedcell.herokuapp.com/url/shortner/'+sendlink;
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
    var booklink='https://seedcell.herokuapp.com/url/shortner/'+result+'/';
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
        Clipboard.setString(apilink[0].themurl);
        //Alert.alert(apilink[0].themurl)
        Alert.alert("LINK GENERATED SUCCESSFULLY")
      })
      .catch((error) => {
        console.log("here1")
        console.log("the error ",error)
      });
    }
    console.log("APIAVAIL: ",apiavail)

    const fetchCopiedText = async () => {
      const text = await Clipboard.getStringAsync();
      setCopiedText(text);
    };

    function numberzero()
    {
      onChangeNumber(" ");
    }
  return (
    
    <SafeAreaView >
      <View style={styles.maingrid}>
      <Text  style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginVertical:'2%', marginLeft:'3%',}}>URL SHORTNER</Text>
      </View>
    <View style={styles.container}>
      <Text style={styles.titleText}>Paste link to shorten!</Text>
      
      
      
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

      {link? (<View><Button
        title="Generate Link"
        color="#33FFF4"
        onPress={() => theprint(link)}
      /></View>):(<View></View>)}
      {/* <Button
        title="Generate Link"
        color="#f194ff"
        onPress={() => theprint(link)}
      /> */}
      
      {/* {
      book.map(item => {
        <View>
          <Text>{apilink[0].themurl}</Text>
        </View>
})
      } */}
      
      {/* <Text>GENERATED LINK: {number}</Text> */}

      {number !=" " && link ? (
        <View>
          <Text></Text>
          <Text>GENERATED LINK: {number}</Text>
        <Button title="copy generated link" color="#33FFF4" onPress={fetchCopiedText} />
        {/* <Text style={styles.copiedText}>{copiedText}</Text> */}
        <StatusBar style="auto" />
        </View>
      ):(
        <View>
          <Text> </Text>
        </View>
      )}
      {/* <Button title="copy link" onPress={fetchCopiedText} />
      <Text style={styles.copiedText}>{copiedText}</Text>
        
      <StatusBar style="auto" /> */}
      </View>
      
    </SafeAreaView>
    
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
    backgroundColor: '#fff',
    alignItems: 'center',
    marginVertical:'55%',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  maingrid:{
    fontSize: 20,
    fontWeight: 'bold',
    // margin:'10%',
    width:'100%',
    height: 50,
    padding:0,
    backgroundColor: '#004CFF',
    color:"#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical:'2%',
    marginLeft:'3%',
  },
  copylink: {
    fontWeight: 'bold',
    backgroundColor: '#F0FF00',
  },
  genlink: {
    fontWeight: 'bold',
    backgroundColor: '#4EFF00',
  },
  page: {
    flex: 1,
  },
});



// import * as React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import * as Clipboard from 'expo-clipboard';

// export default function App() {
//   const [copiedText, setCopiedText] = React.useState('');

//   const copyToClipboard = () => {
//     Clipboard.setString('hahaha');
//   };

//   const fetchCopiedText = async () => {
//     const text = await Clipboard.getStringAsync();
//     setCopiedText(text);
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Click here to copy to Clipboard" onPress={copyToClipboard} />
//       <Button title="View copied text" onPress={fetchCopiedText} />
//       <Text style={styles.copiedText}>{copiedText}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   copiedText: {
//     marginTop: 10,
//     color: 'red',
//   },
// });