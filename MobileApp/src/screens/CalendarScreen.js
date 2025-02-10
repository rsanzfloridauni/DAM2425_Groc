import { Calendar } from 'react-native-calendars';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useAppContext } from './Context';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function CalendarScreen({ navigation, route }) {
  const { startDate, finishDate } = route.params;
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { theme } = useAppContext();

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

  const getDateRange = (start, end) => {
    let dates = {};
    let currentDate = new Date(start);
    let lastDate = new Date(end);

    currentDate.setUTCHours(0, 0, 0, 0);
    lastDate.setUTCHours(0, 0, 0, 0);

    while (currentDate.getTime() <= lastDate.getTime()) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      dates[formattedDate] = {
        color: '#d3a3ff',
        textColor: theme.text,
        startingDay: formattedDate === start,
        endingDay: formattedDate === end,
      };
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return dates;
  };

  const [markedDates, setMarkedDates] = useState(
    getDateRange(startDate, finishDate)
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Current Streak</Text>
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: theme.card, shadowColor: theme.shadow },
        ]}>
        <Calendar
          markedDates={markedDates}
          markingType={'period'}
          theme={{
            backgroundColor: theme.background,
            calendarBackground: theme.background,
            textSectionTitleColor: theme.text,
            selectedDayBackgroundColor: '#ff6347',
            selectedDayTextColor: theme.text,
            todayTextColor: '#ff4500',
            dayTextColor: theme.text,
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#ff4500',
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
