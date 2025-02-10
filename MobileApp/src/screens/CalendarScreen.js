import { Calendar } from 'react-native-calendars';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function CalendarScreen({ navigation, props}) {
  const startDate = props.startDate;
  const endDate = props.finishDate;
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

    while (currentDate <= lastDate) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      dates[formattedDate] = {
        color: '#70d7c7',
        textColor: 'white',
        startingDay: formattedDate === start,
        endingDay: formattedDate === end,
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const [markedDates, setMarkedDates] = useState(
    getDateRange(startDate, endDate)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Streak</Text>
      <Calendar
        markedDates={markedDates}
        markingType={'period'}
        theme={{
          backgroundColor: '#f5f5f5', 
          calendarBackground: '#ffffff', 
          textSectionTitleColor: '#b6c1cd', 
          selectedDayBackgroundColor: '#ff6347', 
          selectedDayTextColor: '#ffffff', 
          todayTextColor: '#ff4500', 
          dayTextColor: '#2d4150', 
          textDisabledColor: '#d9e1e8', 
          dotColor: '#00adf5', 
          selectedDotColor: '#ffffff', 
          arrowColor: '#ff4500', 
          monthTextColor: '#4f5d75',
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
        <Text style={styles.text}>Go Back</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
