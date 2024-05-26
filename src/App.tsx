import React, {useEffect} from 'react';
import MainNavigator from './Screens/MainNavigator';
import {PermissionsAndroid, Platform} from 'react-native';
import {requestUserPermission} from './utils/notificationServices';

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
          }
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
  }, []);

  return <MainNavigator />;
};

export default App;
