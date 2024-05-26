import messaging from '@react-native-firebase/messaging';

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
