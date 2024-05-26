/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-native/no-inline-styles */

import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './MainNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const item = {
  id: 'Welcome to the Social App',
};

const Home = ({navigation}: HomeProps) => {
  //   const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Firebase</Text>
      <Text style={styles.text2}>The Social App</Text>
      <Button
        title="Go to details page"
        onPress={() => {
          navigation.navigate('Details', {product: item});
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 40,
    fontWeight: '800',
    color: '#000',
  },
  text2: {
    fontSize: 25,
    fontWeight: '800',
    color: '#3498DB',
    marginVertical: 5,
  },
});
