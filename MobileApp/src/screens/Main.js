import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import * as Font from 'expo-font';

export default function Main({ navigation }) {
  const { name, setName, password, setPassword, setToken, theme } =
    useContext(Context);
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

  const toApp = async () => {
    setName('Guest');
    setPassword('');

    try {
      const response = await fetch('http://44.199.39.144:8080/imgini/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'Guest', password: '' }),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const token = await response.text();
      setToken(token);

      navigation.navigate('LoadingScreen');
    } catch (error) {
      console.error('Error en la autenticación:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image style={styles.image} source={require('../../assets/imgini.png')} />
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}>
        <Pressable onPress={toLogin} style={styles.button}>
          <Text style={[styles.buttonText, { color: theme.text }]}>Login</Text>
        </Pressable>
        <Pressable onPress={toRegister} style={styles.button}>
          <Text style={[styles.buttonText, { color: theme.text }]}>
            Register
          </Text>
        </Pressable>
        <Pressable onPress={toApp} style={styles.button}>
          <Text style={[styles.buttonText, { color: theme.text }]}>
            Play As Guest
          </Text>
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
    width: '85%',
    padding: 20,
    paddingBottom: 30,
    borderRadius: 15,
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
