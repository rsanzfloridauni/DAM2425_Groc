import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';
import { useContext, useState } from 'react';
import Context from './Context';

export default function Main({ navigation }) {
  const { name, setName } = useContext(Context);

  const toLogin = () => {
    navigation.navigate('Login');
  };

  const toRegister = () => {
    navigation.navigate('Register');
  };

  const toApp = () => {
    navigation.navigate('Drawer');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/imgini.png')} />
      <View style={styles.cardContainer}>
        <Pressable onPress={toLogin} style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
        <Pressable onPress={toRegister} style={styles.button}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </Pressable>
        <Pressable onPress={toApp} style={styles.button}>
          <Text style={styles.buttonText}>PLAY AS GUEST</Text>
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
  buttonText: {
    fontFamily: 'monospace',
    fontSize: 15,
  },
  image: {
    width: 220,
    height: 220,
    margin: 10,
    marginBottom: 50,
  },
});
