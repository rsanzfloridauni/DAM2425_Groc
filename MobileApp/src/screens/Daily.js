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
import DrawerButton from '../components/DrawerButton';
import UserButton from '../components/UserButton';
import Logo from '../components/Logo';
import * as Font from 'expo-font';
import toImageUri from '../utilities/toImageUri';

export default function Daily({ navigation }) {
  const { name, token, theme } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [answer, setAnswer] = useState('');
  const [topic, setTopic] = useState('');
  const [hiddenTiles, setHiddenTiles] = useState(Array(9).fill(true));
  const [visible, setVisible] = useState(false);
  const [tries, setTries] = useState(4);
  const [isGuessDisabled, setIsGuessDisabled] = useState(false);

  const onPress = async () => {
    try {
      const response = await fetch(
        `https://44.199.39.144:8080/imgini/dailyImage?token=${token}`
      );
      const data = await response.json();

      setAnswer(data.imageName);
      setTopic(data.theme);

      if (data.image && data.extension) {
        const imageUri = toImageUri(data.imgBase64, data.extension);
        setImg(imageUri);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans-bold': require('../assets/fonts/AlegreyaSansSC-Bold.ttf'),
        'alegraya-sans': require('../assets/fonts/AlegreyaSansSC-Regular.ttf'),
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

  useEffect(() => {
    if (tries === 0) {
      navigation.navigate('LoseScreen');
      setIsGuessDisabled(true);
    }
  }, [tries]);

  const handleGuess = () => {
    if (text.trim() !== '') {
      if (text === answer) {
        setIsGuessDisabled(true);
        navigation.navigate('VictoryScreen', { tries: tries });
      } else {
        setTries(tries - 1);
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}>
      {name !== 'Guest' && <UserButton navigation={navigation} />}
      <DrawerButton navigation={navigation} />
      <Logo />
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}>
        <Text style={[styles.title, { color: theme.text }]}>Daily Game</Text>
        <Text style={[styles.text, { color: theme.text }]}>Topic: {topic}</Text>
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
        <Text style={[styles.text, { color: theme.text }]}>
          Tries left: {tries}
        </Text>
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
          style={[
            styles.button,
            isGuessDisabled && { backgroundColor: 'gray' },
          ]}
          disabled={isGuessDisabled}>
          <Text style={[styles.text, { color: theme.text }]}>Guess</Text>
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
