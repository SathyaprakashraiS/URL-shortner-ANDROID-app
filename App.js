import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function App() {
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
        Alert.alert(apilink[0].themurl)
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
    // <SafeAreaView>
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
        color="#f194ff"
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
      
      {/* <Text>{number}</Text> */}

      {number !=" " && link ? (
        <View>
          <Text></Text>
        <Button title="copy generated link" onPress={fetchCopiedText} />
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
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
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