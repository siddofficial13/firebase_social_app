import React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Details from './Details';
import Login from './Login';
import SignUp from './SignUp';
import HomeScreen from './HomeScreen';
//import NavigationService from '../utils/NavigationService.js';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Login: {screen?: string} | undefined;
  SignUp: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    // <NavigationContainer
    // ref={ref => NavigationService.setTopLevelNavigator(ref)}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
