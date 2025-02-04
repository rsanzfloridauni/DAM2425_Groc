import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import UserButton from '../../components/UserButton';
import Logo from '../../components/Logo';

export default function Infinite({ navigation }) {
  const { name, setName } = useContext(Context);

  return (
    <SafeAreaView style={styles.container}>
      <UserButton navigation={navigation} />
      <DrawerButton navigation={navigation} />
      <Logo />
      <View style={styles.cardContainer}>
        <Text style={styles.title}>INFINITE MODE</Text>
        <Text style={styles.text}>Topic:</Text>
        <Pressable style={styles.button}>
          <Text style={styles.text}>GENERATE</Text>
        </Pressable>
        <Image
          style={styles.image}
          source={require('../../assets/imgini.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Guess the picture..."
          placeholderTextColor="gray"
        />
        <Pressable style={styles.button}>
          <Text style={styles.text}>GUESS</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: 'white',
    maxWidth: '85%',
    width: '85%',
    padding: 20,
    paddingBottom: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  title: {
    margin: 15,
    fontFamily: 'monospace',
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#d3a3ff',
    width: '80%',
    height: 35,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5,
    fontSize: 13,
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 16,
    margin: 5,
  },
  image: {
    width: 220,
    height: 220,
    margin: 10,
    marginBottom: 30,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#a0c4ff',
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
});
