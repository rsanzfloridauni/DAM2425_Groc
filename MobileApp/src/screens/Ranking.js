import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  Pressable,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import DrawerButton from '../components/DrawerButton';
import UserButton from '../components/UserButton';
import Logo from '../components/Logo';
import Rank from '../components/Rank';
import RankUser from '../components/RankUser';
import * as Font from 'expo-font';

export default function Ranking({ navigation }) {
  const { name, picture, theme, token, points, password } = useContext(Context);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [users, setUsers] = useState([]);

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

    if (points == null) {
      getUserPoints(
        `http://44.199.39.144:8080/imgini/userInfo?token=${token}&username=${name}&password=${password}`
      );
    }
  }, []);

  useEffect(() => {
    const apiUrl = `http://44.199.39.144:8080/imgini/ranking?token=${token}&page=${pageIndex}&size=5`;
    getInfoRanking(apiUrl);
  }, [pageIndex]);

  const getUserPoints = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setPoints(result.points);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInfoRanking = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setUsers(result.users);
        setTotalPages(result.numPages);
        setPreviousPage(result.previousPage);
        setNextPage(result.nextPage);
        Alert.alert('Datos añadidos de la API con éxito!');
      } else {
        console.error('Error en la API:', response.status);
      }
    } catch (error) {
      console.log('Error obteniendo datos:', error);
    }
  };

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
        <Text style={[styles.title, { color: theme.text }]}>Ranking</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <Rank object={item} navigation={navigation} key={item.username} />
          )}
          keyExtractor={(item, index) => item.username.toString()}
        />
      </View>
      <View style={styles.buttonContainer}>
        {previousPage && (
          <Pressable
            style={styles.button}
            onPress={() => setPageIndex(pageIndex - 1)}>
            <Text style={styles.text}>Anterior</Text>
          </Pressable>
        )}
        {nextPage && (
          <Pressable
            style={styles.button}
            onPress={() => setPageIndex(pageIndex + 1)}>
            <Text style={styles.text}>Siguiente</Text>
          </Pressable>
        )}
      </View>
      {name !== 'Guest' && (
        <View
          style={[
            styles.cardContainer,
            { backgroundColor: theme.card, shadowColor: theme.shadow },
          ]}>
          <Text style={[styles.title, { color: theme.text }]}>Your Rank</Text>
          <RankUser
            object={{
              picture,
              name,
              points,
            }}
            navigation={navigation}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#a0c4ff',
    maxWidth: '85%',
    width: '85%',
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '3%',
  },
  title: {
    margin: 5,
    fontFamily: 'alegraya-sans-bold',
    letterSpacing: 2,
    fontSize: 30,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#a0c4ff',
    width: '40%',
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
  text: {
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
    fontSize: 16,
    margin: 5,
  },
});
