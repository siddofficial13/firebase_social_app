import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './MainNavigator';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details = ({route}: DetailsProps) => {
  const {product} = route.params;

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>{product.id}</Text>
      <Button
        title="Go to Login page"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
