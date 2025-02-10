import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Context from './Context';
import * as Font from 'expo-font';

export default function Login({ navigation }) {
  const { name, setName, password, setPassword } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toApp = () => {
    navigation.navigate('LoadingScreen');
  };

  const toMain = () => {
    navigation.navigate('Main');
  };

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

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/imgini.png')}/>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username..."
          placeholderTextColor="gray"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholder="Enter your password..."
          placeholderTextColor="gray"
          secureTextEntry={!passwordVisible}
          right={
            <TextInput.Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
        <Pressable onPress={toApp} style={styles.button}>
          <Text style={styles.text}>Login</Text>
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
