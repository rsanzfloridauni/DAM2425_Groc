import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import Daily from './Daily';
import Infinite from './Infinite';
import Logout from './Logout';
import Ranking from './Ranking';
import User from './User';
import UserViewed from './UserViewed';
import TermsScreen from './TermsScreen';
import Settings from './Settings';
import * as Font from 'expo-font';
import { useAppContext } from './Context';

const Drawer = createDrawerNavigator();

export default function App() {
  const { theme } = useAppContext(); 
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans-bold': require('../../assets/fonts/AlegreyaSansSC-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      initialRouteName="Daily"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: theme.isDark ? '#333' : '#fff',
        },
        drawerLabelStyle: {
          fontFamily: 'alegraya-sans-bold',
          color: theme.isDark ? '#fff' : '#000',
        },
      }}>
      <Drawer.Screen name="Daily" component={Daily} />
      <Drawer.Screen name="Infinite" component={Infinite} />
      <Drawer.Screen name="Ranking" component={Ranking} />
      <Drawer.Screen name="Terms & Conditions" component={TermsScreen} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen
        name="User"
        component={User}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="UserViewed"
        component={UserViewed}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
}
