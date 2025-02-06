import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Image,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import * as Font from 'expo-font';

export default function Register({ navigation }) {
  const { name, setName } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans-bold': require('../../assets/fonts/AlegreyaSansSC-Bold.ttf'),
        'alegraya-sans': require('../../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  const toApp = () => {
    navigation.navigate('LoadingScreen');
  };

  const toMain = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/imgini.png')} />
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username..."
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password..."
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Repeat your password..."
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
        <Pressable
          onPress={() => setIsChecked(!isChecked)}
          style={styles.checkboxContainer}>
          <View style={styles.checkbox}>
            {isChecked && <Text style={styles.checkmark}>✔️</Text>}
          </View>
          <Text style={styles.checkboxLabel}>
            I accept the{' '}
            <Text
              style={styles.textLink}
              onPress={() => {
                navigation.navigate('Drawer', {
                  screen: 'Terms & Conditions',
                });
              }}>
              Terms and Conditions
            </Text>
          </Text>
        </Pressable>
        <Pressable
          onPress={toApp}
          style={[styles.button, !isChecked && styles.disabledButton]}
          disabled={!isChecked}>
          <Text style={styles.text}>Register</Text>
        </Pressable>
        <Pressable onPress={toMain} style={styles.button}>
          <Text style={styles.text}>Go Back</Text>
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
