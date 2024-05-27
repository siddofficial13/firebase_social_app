import React, {createContext, useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context to manage user authentication state
const AuthContext = createContext();
// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({children}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Logic to handle user login
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.docs);

        if (querySnapshot.docs.length > 0) {
          if (
            querySnapshot.docs[0]._data.email === email &&
            querySnapshot.docs[0]._data.password === password
          ) {
            const user = querySnapshot.docs[0]._data;
            setUser(user);
            Alert.alert('User Logged in Successfully!');
            navigation.navigate('HomeScreen');
          } else {
            Alert.alert('Invalid Credentials');
          }
          console.log(
            querySnapshot.docs[0]._data.email +
              ' ' +
              querySnapshot.docs[0]._data.password,
          );
        } else {
          Alert.alert('Account Not found!  Please SignUp First!');
          navigation.navigate('SignUp');
        }
      })
      .catch(error => {
        console.error('Login Error from the AuthProvider Page:', error);
        throw error; // Rethrow the error for handling in components
      });
  };

  const logout = async () => {
    // Logic to handle user logout

    await AsyncStorage.removeItem('EMAIL')
      .then(() => {
        console.log('Email removed successfully');
      })
      .catch(error => {
        console.error('Error removing Email from AuthProvider Logout:', error);
      });
    setUser(null);
    //navigation.navigate('Login');
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
