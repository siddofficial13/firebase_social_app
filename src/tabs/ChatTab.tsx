import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatTab = () => {
  return (
    <View style={styles.container}>
      <Text>ChatTab</Text>
    </View>
  );
};

export default ChatTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
