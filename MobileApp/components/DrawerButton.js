import { TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppContext } from '../src/screens/Context';

const DrawerButton = ({ navigation }) => {
  const { theme } = useAppContext();

  return (
    <View
      style={{
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        right: 10,
        zIndex: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={50} color={theme.isDark ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  );
};

export default DrawerButton;
