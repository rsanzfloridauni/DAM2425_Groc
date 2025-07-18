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
  const { name, token, userId, theme } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [answer, setAnswer] = useState('');
  const [topic, setTopic] = useState('');
  const [hiddenTiles, setHiddenTiles] = useState(Array(9).fill(true));
  const [visible, setVisible] = useState(false);
  const [tries, setTries] = useState(1);
  const [isGuessDisabled, setIsGuessDisabled] = useState(false);
  const [imgId, setImgId] = useState('');

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans-bold': require('../assets/fonts/AlegreyaSansSC-Bold.ttf'),
        'alegraya-sans': require('../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
      onPress();
      {
        name !== 'Guest' && hasPlayed();
      }
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
    if (tries === 5) {
      {
        name !== 'Guest' && registerAttempt(false);
      }
      setIsGuessDisabled(true);
      navigation.navigate('LoseScreen', { answer: answer });
    }
  }, [tries]);

  const onPress = async () => {
    try {
      const response = await fetch(
        `http://44.199.39.144:8080/imgini/dailyImage?token=${token}`
      );
      const data = await response.json();

      setAnswer(removeAccents(data.imageName));
      setTopic(data.theme);

      if (data.imgBase64 && data.extension) {
        const imageUri = toImageUri(data.imgBase64, data.extension);
        setImg(imageUri);
        setImgId(data.id);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleGuess = () => {
    if (text.trim() !== '') {
      const normalizedText = removeAccents(text); // Normaliza la entrada del usuario

      if (normalizedText.length >= 5 && answer.includes(normalizedText)) {
        setIsGuessDisabled(true);
        setHiddenTiles(Array(9).fill(false));
        if (name !== 'Guest') {
          registerAttempt(true);
        }
        navigation.navigate('VictoryScreen', { tries: tries });
      } else {
        setTries(tries + 1);
        revealTile();
        setText('');
      }
    } else {
      setVisible(true);
    }
  };

  const registerAttempt = async (success) => {
    const today = new Date().toISOString().split('T')[0];

    const attemptData = {
      userId: userId,
      imageId: imgId,
      attemptDate: today,
      tries: tries,
      success: success,
    };

    try {
      const response = await fetch(
        `http://44.199.39.144:8080/imgini/newAttempt?token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attemptData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error en registerAttempt:', error);
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

  const hasPlayed = async () => {
    try {
      const response = await fetch(
        `http://44.199.39.144:8080/imgini/getAttempt?token=${token}&username=${name}`
      );

      if (response.status === 404) {
        return;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();

      if (data && Object.keys(data).length > 0) {
        setIsGuessDisabled(true);
        setHiddenTiles(Array(9).fill(false));
        setText(answer);
      }
    } catch (error) {
      console.error('Error al recuperar intento:', error);
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

  const removeAccents = (str) => {
    return str
      .normalize('NFD') // Descompone los caracteres con acento
      .replace(/[\u0300-\u036f]/g, '') // Elimina los signos diacríticos
      .toLowerCase(); // Convierte todo a minúsculas
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
