import { StyleSheet, Text, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useAppContext } from '../src/screens/Context';
import * as Font from 'expo-font';

const Rank = ({ object, navigation }) => {
  const { theme } = useAppContext();
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
    <Pressable
      style={[
        styles.container,
        { backgroundColor: theme.background, borderColor: theme.text },
      ]}
      onPress={() =>
        navigation.navigate('UserViewed', {
          user: object.name,
          pic: object.picture,
        })
      }>
      <Image source={object.picture} style={styles.image} />
      <Text style={[styles.text, { color: theme.text }]}>{object.name}</Text>
      <Text style={[styles.text, { color: theme.text }]}>
        {object.points} points
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
