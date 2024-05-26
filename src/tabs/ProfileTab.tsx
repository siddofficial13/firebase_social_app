import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfileTab = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileTab</Text>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
