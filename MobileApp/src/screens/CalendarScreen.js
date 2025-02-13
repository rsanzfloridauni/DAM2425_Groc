import { Calendar } from 'react-native-calendars';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useAppContext } from './Context';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function CalendarScreen({ navigation, route }) {
  const { highlightedDates = [] } = route.params;
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { theme } = useAppContext();

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
  }, [fontsLoaded]);

  const markDates = (datesArray) => {
    if (!datesArray || datesArray.length === 0) return {};

    let marked = {};
    datesArray.forEach((date) => {
      marked[date] = {
        customStyles: {
          container: {
            backgroundColor: '#d3a3ff',
            borderRadius: 8,
          },
          text: {
            color: theme.text,
            fontWeight: 'bold',
          },
        },
      };
    });
    return marked;
  };

  const [markedDates, setMarkedDates] = useState(() =>
    markDates(highlightedDates)
  );

  useEffect(() => {
    setMarkedDates(markDates(highlightedDates));
  }, [highlightedDates]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Hit History</Text>
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}>
        <Calendar
          markedDates={markedDates}
          markingType={'custom'}
          theme={{
            backgroundColor: theme.background,
            calendarBackground: theme.background,
            textSectionTitleColor: theme.text,
            todayTextColor: '#ff4500',
            dayTextColor: theme.text,
            monthTextColor: theme.text,
            indicatorColor: 'blue',
            textDayFontFamily: 'alegraya-sans',
            textMonthFontFamily: 'alegraya-sans-bold',
            textDayHeaderFontFamily: 'alegraya-sans',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
        <Pressable onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={[styles.text, { color: theme.text }]}>Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    paddingBottom: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    margin: 15,
    fontFamily: 'alegraya-sans-bold',
    fontSize: 30,
    letterSpacing: 2,
  },
  text: {
    fontFamily: 'alegraya-sans',
    fontSize: 16,
    margin: 5,
    letterSpacing: 2,
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
