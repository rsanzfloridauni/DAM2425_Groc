import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserButton = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 0 }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 40,
          left: 10,
        }}
        onPress={() => navigation.navigate('User')}>
        <Icon name="person" size={50} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserButton;
