/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-native/no-inline-styles */
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
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const saveData = () => {
    firestore()
      .collection('Users')
      .add({
        email: email,
        password: password,
        name: name,
      })
      .then(() => {
        saveLocalUserData();
        console.log('User added successfully!!');
        navigation.navigate('Login');
      });
  };
  const saveLocalUserData = async () => {
    await AsyncStorage.setItem('NAME', name)
      .then(() => {
        console.log('Name saved successfully');
      })
      .catch(error => {
        console.error('Error saving Name:', error);
      });
    await AsyncStorage.setItem('EMAIL', email)
      .then(() => {
        console.log('Email saved successfully');
      })
      .catch(error => {
        console.error('Error saving email:', error);
      });
  };
  // // const [inputTextValue, setInputTextValue] = useState('');

  // const [errorMessage, setErrorMessage] = useState('');

  // // Navigation hook
  // const navigation = useNavigation();

  // const handleLogin = async () => {
  //   try {
  //     //   const isUserCreated = await auth().createUserWithEmailAndPassword(
  //     //     email,
  //     //     password,
  //     //   );
  //     //   console.log(isUserCreated);
  //     if (email.length > 0 && password.length > 0) {
  //       const isUserLogin = await auth().signInWithEmailAndPassword(
  //         email,
  //         password,
  //       );
  //       console.log(isUserLogin);
  //       setErrorMessage('');
  //       // navigation.navigate('Home');
  //       navigation.dispatch(StackActions.replace('Home'));
  //     } else {
  //       Alert.alert('Pls enter the credentials ');
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     setErrorMessage(error.message);
  //   }
  // };
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>FireBase Social Login</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your Name"
          keyboardType="default"
          value={name}
          onChangeText={txt => {
            setName(txt);
          }}
        />
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
        <TouchableOpacity style={styles.addButton} onPress={() => saveData()}>
          <Text style={styles.addButtonText}>SignUp</Text>
        </TouchableOpacity>

        {/* <Text style={styles.errorText}>{errorMessage}</Text> */}
      </View>
    </View>
  );
};

export default SignUp;

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
