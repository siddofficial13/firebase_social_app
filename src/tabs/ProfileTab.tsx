import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../AuthProvider';
const ProfileTab = () => {
  const {logout} = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Perform logout actions here
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error in logging out from Profile.tsx', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image
          source={require('../assets/logout.png')}
          style={styles.logoutIcon}
        />
      </TouchableOpacity>
      <Text style={styles.logoutText}>Logout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ProfileTab;
