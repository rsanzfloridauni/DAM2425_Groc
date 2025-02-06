import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Provider } from './src/screens/Context';
import Main from './src/screens/Main';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Drawer from './src/screens/Drawer';
import LoadingScreen from './src/screens/LoadingScreen';
import CalendarScreen from './src/screens/CalendarScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Drawer" component={Drawer} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="CalendarScreen"
              component={CalendarScreen}
              options={{ headerShown: true, headerMode: 'none' }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
