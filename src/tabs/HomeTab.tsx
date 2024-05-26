import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HomeTab = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    firestore()
      .collection('Posts')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log('Fetched data:', data);
        setPostData(data);
      })
      .catch(error => {
        console.error('Error fetching posts: ', error);
      });
  };

  const renderPostItem = ({item}) => (
    <View style={styles.postContainer}>
      <Text style={styles.author}>{item.name}</Text>
      <Text style={styles.postTitle}>{item.postTitle}</Text>
      <Text style={styles.postDescription}>{item.postDescription}</Text>
      <Text style={styles.postCaption}>{item.postCaption}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Firebase Social Media</Text>
      </View>
      <FlatList
        data={postData}
        renderItem={renderPostItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.postList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 10, // Add some spacing at the top
  },
  banner: {
    backgroundColor: '#007BFF', // Blue color for the banner
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Add some spacing at the bottom
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  postList: {
    paddingHorizontal: 10,
    margin: 10,
  },
  postContainer: {
    backgroundColor: '#FFFFFF', // White color for the post container
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16, // Gap between each post
    padding: 15,
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  postCaption: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeTab;
