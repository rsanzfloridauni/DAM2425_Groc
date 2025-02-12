import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import DrawerButton from '../components/DrawerButton';
import UserButton from '../components/UserButton';
import * as Font from 'expo-font';
import { getDailyImage } from '../services/services';

export default function Logout({ navigation }) {
  const { name, setName, setPicture, token, setToken, theme } =
    useContext(Context);

  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  const onPress = async () => {
    try {
      const response = await getDailyImage(
        `http://localhost:8080/imgini/logout?token=${token}`
      );

      if (response) {
        console.log('Respuesta recibida:', response);
        setName('');
        setToken('');
        setPicture(null);
        navigation.navigate('Main');
      } else {
        console.log('No se recibió respuesta válida del servidor.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}>
      <DrawerButton navigation={navigation} />
      {name !== 'Guest' && <UserButton navigation={navigation} />}
      <View
        style={[styles.textContainer, { backgroundColor: theme.background }]}>
        <Image
          style={styles.image}
          source={require('../assets/imgini.png')}
        />
        <Text style={[styles.text, { color: theme.text }]}>
          Leaving already?
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Don't forget to keep your streak!
        </Text>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={[styles.buttonText, { color: theme.text }]}>
            Log Out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    width: 'auto',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
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
  },
  buttonText: {
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
    fontSize: 16,
    margin: 5,
    color: 'white',
  },
  image: {
    width: 240,
    height: 200,
    margin: 10,
    marginBottom: 50,
  },
});
