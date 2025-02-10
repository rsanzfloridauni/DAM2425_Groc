import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { TouchableRipple, Snackbar, TextInput } from 'react-native-paper';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import UserButton from '../../components/UserButton';
import Logo from '../../components/Logo';
import { getDailyImage } from '../services/services';
import * as Font from 'expo-font';

export default function Daily({ navigation }) {
  const { name, setName } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [topic] = useState('Cat');
  const [hiddenTiles, setHiddenTiles] = useState(Array(9).fill(true));
  const [visible, setVisible] = useState(false);

  const onPress = async () => {
    const resp = await getDailyImage(
      'https://api.thecatapi.com/v1/images/search?size=full'
    );
    setImg(resp[0].url);
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans-bold': require('../../assets/fonts/AlegreyaSansSC-Bold.ttf'),
        'alegraya-sans': require('../../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
      onPress();
    };
    revealStart();
    if (!fontsLoaded) {
      loadFonts();
    }
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleGuess = () => {
    if (text.trim() !== '') {
      if (text === topic) {
        console.log('You won');
      } else {
        revealTile();
        setText('');
      }
    } else {
      setVisible(true);
    }
  };

  const revealStart = () => {
    let visibleTiles = hiddenTiles
      .map((tile, index) => (tile ? index : null))
      .filter((index) => index !== null);
    if (visibleTiles.length > 0) {
      let randomIndex =
        visibleTiles[Math.floor(Math.random() * visibleTiles.length)];
      setHiddenTiles((prevTiles) =>
        prevTiles.map((tile, index) => (index === randomIndex ? false : tile))
      );
    }
  };

  const revealTile = () => {
    let visibleTiles = hiddenTiles
      .map((tile, index) => (tile ? index : null))
      .filter((index) => index !== null);

    if (visibleTiles.length > 0) {
      let selectedIndices = [];
      let attempts = Math.min(2, visibleTiles.length);

      while (selectedIndices.length < attempts) {
        let randomIndex =
          visibleTiles[Math.floor(Math.random() * visibleTiles.length)];
        if (!selectedIndices.includes(randomIndex)) {
          selectedIndices.push(randomIndex);
        }
      }

      setHiddenTiles((prevTiles) =>
        prevTiles.map((tile, index) =>
          selectedIndices.includes(index) ? false : tile
        )
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {name !== 'Guest' && <UserButton navigation={navigation} />}
      <DrawerButton navigation={navigation} />
      <Logo />
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Daily Game</Text>
        <Text style={styles.text}>Topic: {topic}</Text>
        <ImageBackground source={{ uri: img }} style={styles.image}>
          <View style={styles.overlayContainer}>
            {hiddenTiles.map((visible, index) => (
              <View
                key={index}
                style={[styles.tile, !visible && styles.hiddenTile]}
              />
            ))}
          </View>
        </ImageBackground>
        <Text style={styles.text}>Tries left:</Text>
        <TextInput
          onChangeText={(text) => setText(text)}
          style={styles.input}
          placeholder="Guess the picture..."
          placeholderTextColor="gray"
          placeholderStyle={styles.text}
          value={text}
        />
        <TouchableRipple
          borderless={false}
          rippleColor="rgba(51, 73, 255, 0.5)"
          onPress={handleGuess}
          style={styles.button}>
          <Text style={styles.text}>Guess</Text>
        </TouchableRipple>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}>
          Put some text in first.
        </Snackbar>
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
    width: '80%',
    height: 45,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5,
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
    marginBottom: 20,
    backgroundColor: 'blue',
    position: 'relative',
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
  overlayContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tile: {
    width: '33.3%',
    height: '33.3%',
    backgroundColor: '#a0c4ff',
  },
  hiddenTile: {
    backgroundColor: 'transparent',
  },
});
