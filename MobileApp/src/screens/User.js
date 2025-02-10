import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import Logo from '../../components/Logo';
import * as Font from 'expo-font';

export default function User({ navigation }) {
  const { name, setName, picture, setPicture } = useContext(Context);
  const [password, setPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

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

  useEffect(() => {
    fetch('https://api.example.com/user')
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setPicture(data.picture);
        setPassword(data.password);
      })
      .catch((error) => console.error('Error fetching user:', error))
      .finally(() => setLoading(false));
  });

  const handleSave = () => {
    setLoading(true);
    fetch('https://api.example.com/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, picture, password }),
    })
      .then(() => {
        setEditing(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        setLoading(false);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#a0c4ff" style={{ flex: 1 }} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerButton navigation={navigation} />
      <Logo />
      <View style={styles.cardContainer}>
        <Text style={styles.title}>User</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: picture }} />
          {editing == true && (
            <Pressable onPress={pickImage} style={styles.imageButton}>
              <Text style={styles.text}>Change</Text>
            </Pressable>
          )}
        </View>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={editing}
          placeholder="USERNAME"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={editing}
          placeholder="PASSWORD"
        />
        <Text style={styles.text}>Current streak: </Text>
        <Pressable
          onPress={() =>
            navigation.navigate('CalendarScreen', {
              startDate: '2024-01-01',
              finishDate: '2024-12-31',
            })
          }
          style={styles.button}>
          <Text style={styles.text}>Check Your Streak</Text>
        </Pressable>
        <Pressable
          onPress={editing ? handleSave : () => setEditing(true)}
          style={styles.button}>
          <Text style={styles.text}>
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    margin: 10,
    marginBottom: 20,
    borderRadius: 60,
    borderColor: 'black',
    borderWidth: 1,
  },
  imageButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#a0c4ff',
    padding: 5,
    borderRadius: 5,
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
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
