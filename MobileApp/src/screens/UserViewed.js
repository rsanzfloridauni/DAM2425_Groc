import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import UserButton from '../../components/UserButton';
import Logo from '../../components/Logo';
import * as Font from 'expo-font';

export default function User({ navigation }) {
  const { name, theme } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const route = useRoute();
  const { user, pic } = route.params;

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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}>
      <DrawerButton navigation={navigation} />
      {name !== 'Guest' && <UserButton navigation={navigation} />}
      <Logo />
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}>
        <Text style={[styles.title, { color: theme.text }]}>{user}</Text>
        <Image style={styles.image} source={{ pic }} />
        <Pressable
          onPress={() => navigation.navigate('CalendarScreen')}
          style={styles.button}>
          <Text style={[styles.text, { color: theme.text }]}>
            Check This User's Streak
          </Text>
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
    marginTop: '30%',
  },
  title: {
    margin: 15,
    fontFamily: 'alegraya-sans-bold',
    letterSpacing: 2,
    fontSize: 30,
  },
  image: {
    width: 120,
    height: 120,
    margin: 10,
    marginBottom: 20,
  },
  text: {
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
    fontSize: 16,
    margin: 5,
  },
  button: {
    backgroundColor: '#a0c4ff',
    width: 'auto',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
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
