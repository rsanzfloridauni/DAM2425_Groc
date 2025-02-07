import { TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from '../src/screens/Context';

const UserButton = ({ navigation }) => {
  const { name, picture } = useContext(Context);

  const handlePress = () => {
    if (name !== '') {
      navigation.navigate('User');
    }
  };

  return (
    <SafeAreaView style={{ flex: 0 }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 40,
          left: 10,
        }}
        onPress={handlePress}>
        {picture ? (
          <Image
            source={{ uri: picture }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        ) : (
          <Icon name="person" size={50} color="#000" />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserButton;
