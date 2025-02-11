import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import Logo from '../../components/Logo';
import * as Font from 'expo-font';
import { TextInput } from 'react-native-paper';

export default function User({ navigation }) {
  const {
    name,
    setName,
    picture,
    setPicture,
    password,
    setPassword,
    token,
    theme,
  } = useContext(Context);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [linkStreak, setLinkStreak] = useState(null);
  const [provisionalImage, setProvisionalImage] = useState(null);
  const [provisionalName, setProvisionalName] = useState(name);
  const [provisionalPwd, setProvisionalPwd] = useState(password);

  useEffect(() => {
    setProvisionalName(name);
    setProvisionalPwd(password);
    setProvisionalImage(picture);

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
    getUserInfo(
      `http://localhost:8080/imgini/userInfo?token=${token}&username=${name}&password=${password}`
    );
  });

  const getUserInfo = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setName(result.username);
        setPassword(result.password);
        setPicture(result.profilePicture);
        setLinkStreak(result.linkStreak);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const getUserStreak = async () => {
    try {
      const response = await fetch(linkStreak);
      if (response.ok) {
        const result = await response.json();
        setName(result.username);
        setPassword(result.password);
        setProvisionalImage(profilePicture);
        setPicture(profilePicture);
        setLinkStreak(streakLink);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/imgini/update?token=${token}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            oldName: name,
            newName: provisionalName,
            password: provisionalPwd,
            profilePicture: provisionalImage || picture,
          }),
        }
      );

      if (!response.ok) {
        Alert.alert('Failed to update user');
      } else {
        setPicture(provisionalImage);
        Alert.alert('DATOS ACTUALIZADOS!');
      }

      setEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const pickFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProvisionalImage(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProvisionalImage(result.assets[0].uri);
    }
  };

  const pickImage = () => {
    Alert.alert(
      'Choose an option',
      'Would you like to take a new photo or select one from the gallery?',
      [
        { text: 'Camera', onPress: pickFromCamera },
        { text: 'Gallery', onPress: pickFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}>
      <DrawerButton navigation={navigation} />
      <Logo />
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}>
        <Text style={[styles.title, { color: theme.text }]}>User</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: provisionalImage }} />
          {editing && (
            <Pressable onPress={pickImage} style={styles.imageButton}>
              <Text style={styles.text}>Change</Text>
            </Pressable>
          )}
        </View>
        <TextInput
          style={styles.input}
          value={provisionalName}
          onChangeText={setProvisionalName}
          editable={editing}
          right={
            <TextInput.Icon
              icon="account"
              color={theme.isDark ? '#fff' : '#000'}
            />
          }
        />
        <TextInput
          style={styles.input}
          value={provisionalPwd}
          onChangeText={setProvisionalPwd}
          secureTextEntry={!showPassword}
          editable={editing}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              color={theme.isDark ? '#fff' : '#000'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Pressable
          onPress={() =>
            navigation.navigate('CalendarScreen', {
              startDate: '2025-02-08',
              finishDate: '2025-02-10',
            })
          }
          style={styles.button}>
          <Text style={[styles.text, { color: theme.text }]}>
            Check Your Streak
          </Text>
        </Pressable>
        <Pressable
          onPress={editing ? handleSave : () => setEditing(true)}
          style={styles.button}>
          <Text style={[styles.text, { color: theme.text }]}>
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
  title: {
    margin: 15,
    fontFamily: 'alegraya-sans-bold',
    letterSpacing: 2,
    fontSize: 30,
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
    height: 45,
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
