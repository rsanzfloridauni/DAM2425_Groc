import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import UserButton from '../../components/UserButton';
import * as Font from 'expo-font';

export default function Logout({ navigation }) {
  const { name, setName } = useContext(Context);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans': require('../../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerButton navigation={navigation} />
      <UserButton navigation={navigation} />
      <View style={styles.textContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/imgini.png')}
        />
        <Text style={styles.text}>Leaving already?</Text>
        <Text style={styles.text}>Don't forget to keep your streak!</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
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
