import { TouchableOpacity, View, Image, Platform } from 'react-native';
import { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from '../src/screens/Context';

const UserButton = ({ navigation }) => {
  const { name, picture } = useContext(Context);

  const handlePress = () => {
    if (name !== 'Guest' && name !== '') {
      navigation.navigate('User');
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40, 
        left: 10,
        zIndex: 10, 
      }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {picture ? (
          <Image
            source={{ uri: picture }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        ) : (
          <Icon name="person" size={50} color="#000" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserButton;
