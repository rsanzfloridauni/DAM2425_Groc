import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import Context from './Context';
import * as Font from 'expo-font';
import toImageUri from '../utilities/toImageUri';

export default function Login({ navigation }) {
  const {
    name,
    setName,
    password,
    setPassword,
    setPicture,
    theme,
    setToken,
    setUserId,
  } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toApp = async () => {
    if (!name || !password) {
      Alert.alert('Neither the username nor the password can be empty.');
      return;
    }

    try {
      const response = await fetch('http://44.199.39.144:8080/imgini/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, password }),
      });

      if (!response.ok) {
        Alert.alert('Authentication error.');
        return;
      }

      const token = await response.text();
      setToken(token);

      try {
        const response2 = await fetch(
          `http://44.199.39.144:8080/imgini/userInfo?token=${token}&username=${name}&password=${password}`
        );
        if (response2.ok) {
          const result = await response2.json();
          setUserId(result.id);
          if (result.profilePicture === '' || result.profilePicture === null) {
            setPicture(null);
          } else {
            setPicture(toImageUri(result.profilePicture, result.extension));
          }
        }
      } catch (error) {
        console.log(error);
      }

      navigation.navigate('LoadingScreen');
    } catch (error) {
      console.error('Error en la autenticación:', error);
    }
  };

  const toMain = () => {
    setName('');
    navigation.navigate('Main');
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans-bold': require('../assets/fonts/AlegreyaSansSC-Bold.ttf'),
        'alegraya-sans': require('../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image style={styles.image} source={require('../assets/imgini.png')} />
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}>
        <Text style={[styles.title, { color: theme.text }]}>Login</Text>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Enter your username..."
          placeholderTextColor="gray"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={[styles.input, { color: theme.text }]}
          placeholder="Enter your password..."
          placeholderTextColor="gray"
          secureTextEntry={!passwordVisible}
          right={
            <TextInput.Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              color={theme.isDark ? '#fff' : '#000'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
        <Pressable onPress={toApp} style={styles.button}>
          <Text style={[styles.text, { color: theme.text }]}>Login</Text>
        </Pressable>
        <Pressable onPress={toMain} style={styles.button}>
          <Text style={[styles.text, { color: theme.text }]}>Go Back</Text>
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
  title: {
    margin: 15,
    fontFamily: 'alegraya-sans-bold',
    letterSpacing: 2,
    fontSize: 30,
  },
  button: {
    backgroundColor: '#a0c4ff',
    width: '40%',
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
  },
  input: {
    backgroundColor: '#d3a3ff',
    width: '80%',
    height: 40,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 10,
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
  },
  image: {
    width: 240,
    height: 200,
    margin: 10,
    marginBottom: 50,
  },
});
