import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import * as Font from 'expo-font';
import { TextInput } from 'react-native-paper';

export default function Register({ navigation }) {
  const { name, setName, password, setPassword, setToken, setUserId, theme } =
    useContext(Context);
  const [textName, setTextName] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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

  const toApp = async () => {
    if (!textName || !password) {
      Alert.alert('Neither the username nor the password can be empty.');
      return;
    }
    if (password === confirmPassword) {
      setName(textName);
      try {
        const response = await fetch(
          'http://44.199.39.144:8080/imgini/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: textName, password }),
          }
        );

        const responseText = await response.text();
        console.log('Server response:', response.status, responseText);

        if (!response.ok) {
          Alert.alert('Authentication error.');
          return;
        }

        setToken(responseText);
        try {
          const response2 = await fetch(
            `http://44.199.39.144:8080/imgini/userInfo?token=${token}&username=${name}&password=${password}`
          );
          if (response2.ok) {
            const result = await response2.json();
            setUserId(result.id);
          }
        } catch (error) {
          console.log(error);
        }

        navigation.navigate('LoadingScreen');
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('Passwords must be the same.');
    }
  };

  const toMain = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image style={styles.image} source={require('../assets/imgini.png')} />
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}>
        <Text style={[styles.title, { color: theme.text }]}>Register</Text>
        <TextInput
          onChangeText={(text) => setTextName(text)}
          style={[styles.input, { color: theme.text }]}
          placeholder="Enter your username..."
          placeholderTextColor="gray"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={[styles.input, { color: theme.text }]}
          placeholder="Enter your password..."
          placeholderTextColor="gray"
          secureTextEntry={!passwordVisible}
          right={
            <TextInput.Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              color={theme.isDark ? '#fff' : '#000'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          style={[styles.input, { color: theme.text }]}
          placeholder="Repeat your password..."
          placeholderTextColor="gray"
          secureTextEntry={!confirmPasswordVisible}
          right={
            <TextInput.Icon
              name={confirmPasswordVisible ? 'eye-off' : 'eye'}
              color={theme.isDark ? '#fff' : '#000'}
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            />
          }
        />
        <Pressable
          onPress={() => setIsChecked(!isChecked)}
          style={styles.checkboxContainer}>
          <View style={[styles.checkbox, { borderColor: theme.text }]}>
            {isChecked && <Text style={styles.checkmark}>✔️</Text>}
          </View>
          <Text style={[styles.checkboxLabel, { color: theme.text }]}>
            I accept the{' '}
            <Text
              style={styles.textLink}
              onPress={() => {
                setName('');
                navigation.navigate('Terms');
              }}>
              Terms and Conditions
            </Text>
          </Text>
        </Pressable>
        <Pressable
          onPress={toApp}
          style={[styles.button, !isChecked && styles.disabledButton]}
          disabled={!isChecked}>
          <Text style={[styles.text, { color: theme.text }]}>Register</Text>
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
  textLink: {
    fontFamily: 'alegraya-sans',
    letterSpacing: 1,
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
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
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 10,
  },
  checkmark: {
    fontSize: 16,
  },
  checkboxLabel: {
    fontFamily: 'alegraya-sans',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});
