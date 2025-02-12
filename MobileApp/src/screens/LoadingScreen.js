import { Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useAppContext } from './Context';
import * as Font from 'expo-font';

export default function LoadingScreen({ navigation }) {
  const { theme } = useAppContext();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAndNavigate = async () => {
      await Font.loadAsync({
        'alegraya-sans': require('../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });

      setFontsLoaded(true);

      setTimeout(() => {
        navigation.replace('Drawer');
      }, 2000);
    };

    if (!fontsLoaded) {
      loadFontsAndNavigate();
    }
  }, [fontsLoaded, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image style={styles.image} source={require('../assets/imgini.png')} />
      <ActivityIndicator size="large" color="#a0c4ff" />
      <Text style={[styles.text, { color: theme.text }]}>
        Loading, please wait...
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 220,
    margin: 10,
    marginBottom: 50,
  },
  text: {
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
    fontSize: 15,
    margin: 10,
  },
});
