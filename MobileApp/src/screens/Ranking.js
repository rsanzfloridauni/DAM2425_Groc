import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import UserButton from '../../components/UserButton';
import Logo from '../../components/Logo';
import Rank from '../../components/Rank';

export default function RANKING({ navigation }) {
  const { name, setName } = useContext(Context);

  const data = [
    { picture: require('../../assets/imgini.png'), name: 'Juan', points: 28 },
    { picture: require('../../assets/imgini.png'), name: 'María', points: 34 },
    { picture: require('../../assets/imgini.png'), name: 'Pedro', points: 22 },
    { picture: require('../../assets/imgini.png'), name: 'Ana', points: 29 },
    { picture: require('../../assets/imgini.png'), name: 'Juan', points: 28 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <DrawerButton navigation={navigation} />
      <UserButton navigation={navigation} />
      <Logo />
      <View style={styles.cardContainer}>
        <Text style={styles.title}>RANKING</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Rank object={item} />}
          keyExtractor={(item) => item.key}
        />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>YOUR RANK</Text>
        <Rank
          object={{
            picture: require('../../assets/imgini.png'),
            name: 'Juan',
            points: 28,
          }}
        />
      </View>
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
    padding: 15,
    paddingBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  title: {
    margin: 10,
    fontFamily: 'monospace',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
