import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from './src/screens/Context';
import Main from './src/screens/Main';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Drawer from './src/screens/Drawer';

const Stack = createStackNavigator();

export default function App() {
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
          <Stack.Screen name="Drawer" component={Drawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
