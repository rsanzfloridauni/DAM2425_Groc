import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useState, useEffect, useContext, useCallback } from 'react';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import UserButton from '../../components/UserButton';
import Logo from '../../components/Logo';
import { getDailyImage } from '../services/services';
import * as Font from 'expo-font';

export default function Daily({ navigation }) {
  const { name, setName } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [image, setImage] = useState(null);

  const onPress = useCallback(async () => {
    const resp = await getDailyImage('http://localhost:8080/imgini/getImage');
    setImage(resp.link);
  }, []);

  useEffect(() => {
    const loadFontsAndExecute = async () => {
      await Font.loadAsync({
        'alegraya-sans-bold': require('../../assets/fonts/AlegreyaSansSC-Bold.ttf'),
        'alegraya-sans': require('../../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
      onPress();
    };

    if (!fontsLoaded) {
      loadFontsAndExecute();
    }
  }, [fontsLoaded, onPress]);

  return (
    <SafeAreaView style={styles.container}>
      <UserButton navigation={navigation} />
      <DrawerButton navigation={navigation} />
      <Logo />
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Daily Game</Text>
        <Text style={styles.text}>Topic:</Text>
        <Image style={styles.image} source={{ uri: image }} />
        <TextInput
          style={styles.input}
          placeholder="Guess the picture..."
          placeholderTextColor="gray"
        />
        <TouchableRipple
          borderless={false}
          rippleColor="rgba(51, 73, 255, 0.5)"
          onPress={() => console.log('Prueba')}
          style={styles.button}>
          <Text style={styles.text}>Guess</Text>
        </TouchableRipple>
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
    fontFamily: 'alegraya-sans-bold',
    fontSize: 30,
    letterSpacing: 2,
  },
  input: {
    backgroundColor: '#d3a3ff',
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
    width: '80%',
    height: 35,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5,
    fontSize: 13,
  },
  text: {
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
    fontSize: 16,
    margin: 5,
  },
  image: {
    width: 220,
    height: 220,
    margin: 10,
    marginBottom: 50,
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
});
