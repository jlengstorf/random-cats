import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Picker
} from 'react-native';

// TODO figure out env vars in Expo
// Maybe this? https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html
//
// Get an API key here:
// https://developers.giphy.com/dashboard/?create=true
const API_KEY = 'your API key here';

export default function App() {
  const [tag, setTag] = useState('cat');
  const [image, setImage] = useState(false);
  const fetchGIF = () => {
    const api = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}&rating=g`;

    fetch(api)
      .then(response => response.json())
      .then(result => {
        setImage(result.data.image_url);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchGIF();
  }, [tag]);

  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: '50%' }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={() => fetchGIF()}>
        <Text style={styles.text}>Show me a {tag}!</Text>
      </TouchableOpacity>
      <Picker
        style={{ width: '90%', height: 50 }}
        selectedValue={tag}
        onValueChange={value => setTag(value)}
      >
        <Picker.Item label="Cats" value="cat" />
        <Picker.Item label="Corgis" value="corgi" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    width: '90%'
  },
  text: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  }
});
