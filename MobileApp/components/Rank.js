import { StyleSheet, View, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const Rank = ({ object }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans': require('../../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  return (
    <View style={styles.container}>
      <Image source={object.picture} style={styles.image} />
      <Text style={styles.text}>{object.name}</Text>
      <Text style={styles.text}>{object.points} points</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2f124a',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontFamily: 'alegraya-sans',
    fontSize: 16,
    margin: 5,
    letterSpacing: 2,
  },
});

export default Rank;
