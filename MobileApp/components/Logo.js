import React from 'react';
import { SafeAreaView, Image } from 'react-native';

const Logo = () => {
  return (
    <SafeAreaView style={{ flex: 0 }}>
      <Image
        style={{
          alignSelf: 'center',
          width: 50,
          height: 50,
          marginTop: 40,
        }}
        source={require('../assets/imgini.png')}
      />
    </SafeAreaView>
  );
};

export default Logo;
