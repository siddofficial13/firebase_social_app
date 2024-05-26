/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {StackActions, useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
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
      });
  };
  //   const saveData = () => {
  //     firestore()
  //       .collection('Users')
  //       .add({
  //         email: email,
  //         password: password,
  //       })
  //       .then(() => {
  //         console.log('User added successfully!!');
  //       });
  //   };

  // // const [inputTextValue, setInputTextValue] = useState('');

  // const [errorMessage, setErrorMessage] = useState('');

  // // Navigation hook
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>FireBase Social Login</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={pass => {
            setPassword(pass);
          }}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleLogin()}>
          <Text style={styles.addButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signup}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={{color: '#30336B', fontSize: 18, marginVertical: 5}}>
            New User SignUp Here!!!
          </Text>
        </TouchableOpacity>
        {/* <Text style={styles.errorText}>{errorMessage}</Text> */}
      </View>
    </View>
  );
};

export default Login;

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15, // Added padding to ensure the content is not too close to the edges
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    marginVertical: 10,
    padding: 15,
  },
  addButton: {
    backgroundColor: '#0A79DF',
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  signup: {
    alignItems: 'center',
  },
});
