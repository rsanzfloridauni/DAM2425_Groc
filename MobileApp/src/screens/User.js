import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import Logo from '../../components/Logo';

export default function Infinite({ navigation }) {
  const { name, setName } = useContext(Context);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerButton navigation={navigation} />
      <Logo />
      <View style={styles.cardContainer}>
        <Text style={styles.title}>User</Text>
        <Image
          style={styles.image}
          source={require('../../assets/imgini.png')}
        />
        <TextInput style={styles.input} value="Username" />
        <TextInput style={styles.input} value="Password" />
        <Text style={styles.text}>Current streak:</Text>
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
    marginTop: '30%',
  },
  title: {
    margin: 15,
    fontFamily: 'monospace',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    margin: 10,
    marginBottom: 20,
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
});
