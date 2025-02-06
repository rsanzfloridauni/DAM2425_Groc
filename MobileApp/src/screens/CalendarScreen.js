import { Calendar } from 'react-native-calendars';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function CalendarScreen({ navigation }) {
  const startDate = '2025-02-10';
  const endDate = '2025-03-04';
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
          backgroundColor: '#f5f5f5', // Fondo del calendario
          calendarBackground: '#ffffff', // Fondo dentro del calendario
          textSectionTitleColor: '#b6c1cd', // Color del texto de los títulos (días de la semana)
          selectedDayBackgroundColor: '#ff6347', // Color del día seleccionado (rojo tomate)
          selectedDayTextColor: '#ffffff', // Texto del día seleccionado
          todayTextColor: '#ff4500', // Color del texto del día actual (naranja)
          dayTextColor: '#2d4150', // Color del texto de los días normales
          textDisabledColor: '#d9e1e8', // Color de los días deshabilitados
          dotColor: '#00adf5', // Color del punto en fechas marcadas
          selectedDotColor: '#ffffff', // Color del punto en fechas seleccionadas
          arrowColor: '#ff4500', // Color de las flechas de navegación
          monthTextColor: '#4f5d75', // Color del mes en la parte superior
          indicatorColor: 'blue', // Color del indicador de carga
          textDayFontFamily: 'alegraya-sans',
          textMonthFontFamily: 'alegraya-sans-bold',
          textDayHeaderFontFamily: 'alegraya-sans',
          textDayFontSize: 16, // Tamaño del texto de los días
          textMonthFontSize: 18, // Tamaño del texto del mes
          textDayHeaderFontSize: 14, // Tamaño del texto del encabezado
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
