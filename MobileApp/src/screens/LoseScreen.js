import { Text, Pressable, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import * as Font from 'expo-font';

export default function LoseScreen({ route, navigation }) {
  const { theme } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { answer } = route.params;

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans': require('../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}>
      <Image style={styles.image} source={require('../assets/imgini.png')} />
      <Text style={[styles.title, { color: theme.text }]}>You lost :(</Text>
      <Text style={[styles.text, { color: theme.text }]}>The answer was:</Text>
      <Text style={[styles.answerText, { color: theme.text }]}>{answer}</Text>
      <Text style={[styles.text, { color: theme.text }]}>
        Too bad, better luck next time!
      </Text>
      <Pressable
        onPress={() => navigation.goBack()}
        style={[styles.button, { shadowColor: theme.shadow }]}>
        <Text style={[styles.text, { color: theme.text }]}>Go Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 15,
    fontFamily: 'alegraya-sans-bold',
    letterSpacing: 2,
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    width: 'auto',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  text: {
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
    fontSize: 16,
    margin: 5,
    textAlign: 'center',
  },
  answerText: {
    fontFamily: 'alegraya-sans-bold',
    letterSpacing: 2,
    fontSize: 16,
    margin: 5,
    textAlign: 'center',
  },
  image: {
    width: 240,
    height: 200,
    margin: 10,
    marginBottom: 50,
  },
});
