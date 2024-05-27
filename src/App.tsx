import React, {useEffect} from 'react';
import MainNavigator from './Screens/MainNavigator';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  NotificationListeners,
  requestUserPermission,
} from './utils/notificationServices';
import {AuthProvider} from './AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService from './utils/NavigationService.js';
const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
        .then(response => {
          console.log('Response:  ', response);
          if (!!response && response === 'granted') {
            requestUserPermission();

            NotificationListeners();
          }
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
  }, []);

  return (
    <NavigationContainer
      ref={ref => NavigationService.setTopLevelNavigator(ref)}>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
