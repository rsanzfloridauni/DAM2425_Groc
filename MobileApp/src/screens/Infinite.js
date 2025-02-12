import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { TouchableRipple, TextInput, Snackbar } from 'react-native-paper';
import { useState, useEffect, useContext } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Context from './Context';
import DrawerButton from '../components/DrawerButton';
import UserButton from '../components/UserButton';
import Logo from '../components/Logo';
import { getDailyImage } from '../services/services';
import * as Font from 'expo-font';

export default function Infinite({ navigation }) {
  const { name, theme } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [topic, setTopic] = useState('');
  const [hiddenTiles, setHiddenTiles] = useState(Array(9).fill(true));
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [tries, setTries] = useState(4);
  const [isGuessDisabled, setIsGuessDisabled] = useState(false);
  const [items, setItems] = useState([{ label: 'Cuadros', value: 'cuadros' }]);

  const generateImg = async () => {
    const resp = await getDailyImage(
      'https://api.thecatapi.com/v1/images/search?size=full'
    );
    setImg(resp[0].url);
  };

  const handleGenerate = () => {
    if (value) {
      setTopic(value);
      setText('');
      setTries(4);
      setIsGuessDisabled(false);
      generateImg();
      revealStart();
    }
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans-bold': require('../assets/fonts/AlegreyaSansSC-Bold.ttf'),
        'alegraya-sans': require('../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, []);

  useEffect(() => {
    if (tries === 0) {
      navigation.navigate('LoseScreen');
      setIsGuessDisabled(true);
    }
  }, [tries]);

  const handleGuess = () => {
    if (text.trim() !== '') {
      if (text === topic) {
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
    setHiddenTiles(Array(9).fill(true));
    setTimeout(() => {
      let visibleTiles = [...Array(9).keys()];
      if (visibleTiles.length > 0) {
        let randomIndex =
          visibleTiles[Math.floor(Math.random() * visibleTiles.length)];
        setHiddenTiles((prevTiles) =>
          prevTiles.map((tile, index) => (index === randomIndex ? false : tile))
        );
      }
    }, 10);
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
        <Text style={[styles.title, { color: theme.text }]}>Infinite Mode</Text>
        <Text style={[styles.text, { color: theme.text }]}>Topic:</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={styles.pickerContainer}
          style={styles.pickerStyle}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          textStyle={[styles.text, { color: theme.text }]}
          placeholder="Select a topic"
        />
        <TouchableRipple
          borderless={false}
          rippleColor="rgba(51, 73, 255, 0.5)"
          onPress={handleGenerate}
          style={styles.button}>
          <Text style={[styles.text, { color: theme.text }]}>Generate</Text>
        </TouchableRipple>
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
        <Text style={[styles.text, { color: theme.text }]}>
          Tries left: {tries}
        </Text>
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
    margin: 5,
    fontFamily: 'alegraya-sans-bold',
    letterSpacing: 2,
    fontSize: 30,
  },
  input: {
    backgroundColor: '#d3a3ff',
    width: '80%',
    height: 45,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 10,
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
    marginTop: 20,
    position: 'relative',
  },
  button: {
    backgroundColor: '#a0c4ff',
    width: 'auto',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
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
  pickerContainer: {
    width: '80%',
    height: 55,
    margin: 5,
  },
  pickerStyle: {
    backgroundColor: '#d3a3ff',
    borderRadius: 5,
    borderColor: '#a0c4ff',
    marginTop: 5,
  },
  dropDownContainerStyle: {
    backgroundColor: '#d3a3ff',
    borderColor: '#a0c4ff',
    borderRadius: 5,
  },
});
