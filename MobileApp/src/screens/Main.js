import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import * as Font from 'expo-font';

export default function Main({ navigation }) {
  const { setName } = useContext(Context);
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

  const toLogin = () => {
    navigation.navigate('Login');
  };

  const toRegister = () => {
    navigation.navigate('Register');
  };

  const toApp = () => {
    setName('Guest');
    navigation.navigate('LoadingScreen');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/imgini.png')} />
      <View style={styles.cardContainer}>
        <Pressable onPress={toLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable onPress={toRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <Pressable onPress={toApp} style={styles.button}>
          <Text style={styles.buttonText}>Play As Guest</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    paddingBottom: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#a0c4ff',
    width: '55%',
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
  buttonText: {
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
    fontSize: 15,
  },
  image: {
    width: 240,
    height: 220,
    margin: 10,
    marginBottom: 50,
  },
});
