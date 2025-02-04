import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Image,
} from 'react-native';
import { useContext, useState } from 'react';
import Context from './Context';

export default function Login({ navigation }) {
  const { name, setName } = useContext(Context);

  const toApp = () => {
    navigation.navigate('Drawer');
  };

  const toMain = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/imgini.png')} />
      <View style={styles.cardContainer}>
        <Text style={styles.title}>LOGIN</Text>
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
        <Pressable onPress={toApp} style={styles.button}>
          <Text style={styles.text}>LOGIN</Text>
        </Pressable>
        <Pressable onPress={toMain} style={styles.button}>
          <Text style={styles.text}>GO BACK</Text>
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
    fontFamily: 'monospace',
    fontSize: 30,
    fontWeight: 'bold',
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
    fontFamily: 'monospace',
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
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
    marginBottom: 50,
  },
});
