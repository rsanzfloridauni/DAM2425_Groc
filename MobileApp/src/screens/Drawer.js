import { createDrawerNavigator } from '@react-navigation/drawer';
import Daily from './Daily';
import Infinite from './Infinite';
import Logout from './Logout';
import Ranking from './Ranking';
import User from './User';

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      initialRouteName="Daily"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}>
      <Drawer.Screen name="Daily" component={Daily} />
      <Drawer.Screen name="Infinite" component={Infinite} />
      <Drawer.Screen name="Ranking" component={Ranking} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen
        name="User"
        component={User}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
}
