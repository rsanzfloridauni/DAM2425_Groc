import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DrawerButton = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 0 }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 40,
          right: 10,
        }}
        onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={50} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DrawerButton;
