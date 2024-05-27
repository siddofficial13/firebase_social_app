import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import NavigationService from './NavigationService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMtoken();
  }
}

const getFCMtoken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM token:', token);
  } catch (error) {
    console.log('Error in generating token:', error);
  }
};

export async function NotificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert(
      'A new FCM message has been received !',
      JSON.stringify(remoteMessage),
    );
    if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
      try {
        const email = await AsyncStorage.getItem('EMAIL');
        console.log(email);
        if (!email) {
          NavigationService.navigate('Login', {
            screen: `${remoteMessage?.data?.redirect_to}`,
          });
        } else {
          NavigationService.navigate(`${remoteMessage?.data?.redirect_to}`);
        }
      } catch (error) {
        console.error('Error retrieving email from AsyncStorage:', error);
      }
    }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to optn from background state: ',
      remoteMessage,
    );
    if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
      try {
        const email = await AsyncStorage.getItem('EMAIL');
        console.log(email);
        if (!email) {
          NavigationService.navigate('Login', {
            screen: `${remoteMessage?.data?.redirect_to}`,
          });
        } else {
          NavigationService.navigate(`${remoteMessage?.data?.redirect_to}`);
        }
      } catch (error) {
        console.error('Error retrieving email from AsyncStorage:', error);
      }
    }
  });
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
        if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
          try {
            const email = await AsyncStorage.getItem('EMAIL');
            console.log(email);
            if (!email) {
              NavigationService.navigate('Login', {
                screen: `${remoteMessage?.data?.redirect_to}`,
              });
            } else {
              NavigationService.navigate(`${remoteMessage?.data?.redirect_to}`);
            }
          } catch (error) {
            console.error('Error retrieving email from AsyncStorage:', error);
          }
        }
      }
    });

  return unsubscribe;
}
