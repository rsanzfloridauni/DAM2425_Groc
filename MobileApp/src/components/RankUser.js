import { StyleSheet, Text, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useAppContext } from '../screens/Context';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';

const RankUser = ({ object, navigation }) => {
  const { theme } = useAppContext();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans': require('../assets/fonts/AlegreyaSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: theme.background, borderColor: theme.text },
      ]}
      onPress={() => navigation.navigate('User')}>
      {object.picture ? (
          <Image source={{uri: object.picture}} style={styles.image} />
        ) : (
          <Icon
            name="person"
            size={50}
            color={theme.isDark ? '#fff' : '#000'}
          />
        )}
      <Text style={[styles.text, { color: theme.text }]}>{object.name}</Text>
      <Text style={[styles.text, { color: theme.text }]}>
        {object.points} points
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2f124a',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontFamily: 'alegraya-sans',
    fontSize: 16,
    margin: 5,
    letterSpacing: 2,
  },
});

export default RankUser;
