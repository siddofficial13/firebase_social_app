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
      <View style={{flex: 1}}>
        <FlatList
          data={postData}
          renderItem={renderPostItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.postList}
        />
      </View>
      {/* Your component that should always remain visible at the bottom */}
      <View style={styles.bottomComponent}>
        {/* Add your bottom component here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    paddingBottom: 16, // Adjusted to accommodate bottom component
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
  bottomComponent: {
    // Style your bottom component here
    height: 100, // Adjust as per your requirement
    backgroundColor: 'lightgrey', // Example background color
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeTab;
