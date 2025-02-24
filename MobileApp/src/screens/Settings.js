import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import DrawerButton from '../components/DrawerButton';
import UserButton from '../components/UserButton';
import * as Font from 'expo-font';

export default function Settings({ navigation }) {
  const {
    name,
    setName,
    setPicture,
    token,
    setToken,
    password,
    setPassword,
    theme,
  } = useContext(Context);
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
      const response = await fetch(
        `http://44.199.39.144:8080/imgini/delete?name=${name}&password=${password}&token=${token}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Error al eliminar la cuenta');
      }

      setName('');
      setToken('');
      setPassword('');
      setPicture(null);
      navigation.navigate('Main');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}>
      <DrawerButton navigation={navigation} />
      {name !== 'Guest' && <UserButton navigation={navigation} />}
      <View style={styles.textContainer}>
        <Image style={styles.image} source={require('../assets/imgini.png')} />
        <Text style={[styles.text, { color: theme.text }]}>
          {theme.isDark ? 'Dark 🌙' : 'Light ☀️'} Theme
        </Text>
        <Switch value={theme.isDark} onValueChange={theme.toggleTheme} />
        {name !== 'Guest' && (
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </Pressable>
        )}
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
