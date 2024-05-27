import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTab = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const [postDescription, setPostDescription] = useState('');
  let name = '';
  let email = '';
  const savePostData = async () => {
    name = await AsyncStorage.getItem('NAME');
    email = await AsyncStorage.getItem('EMAIL');

    firestore()
      .collection('Posts')
      .add({
        postTitle: postTitle,
        postCaption: postCaption,
        postDescription: postDescription,
        name: name,
        email: email,
      })
      .then(() => {
        //saveLocalUserData();
        console.log('Post added successfully!!');
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Post</Text>
        <TouchableOpacity
          style={styles.bannerButton}
          onPress={() => {
            savePostData();
          }}>
          <Text style={styles.bannerButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter Post Title"
          placeholderTextColor="#999"
          value={postTitle}
          onChangeText={txt => {
            setPostTitle(txt);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Post Caption"
          placeholderTextColor="#999"
          value={postCaption}
          onChangeText={txt => {
            setPostCaption(txt);
          }}
          multiline
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Post Description"
          placeholderTextColor="#999"
          value={postDescription}
          onChangeText={txt => {
            setPostDescription(txt);
          }}
          multiline
        />
      </View>
    </View>
  );
};

export default AddTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bannerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 150, // adjust as needed
    textAlignVertical: 'top', // for multiline TextInput to start from the top
  },
});
