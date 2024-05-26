import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SearchTab = () => {
  return (
    <View style={styles.container}>
      <Text>SearchTab</Text>
    </View>
  );
};

export default SearchTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
