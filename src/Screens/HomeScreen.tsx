/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import HomeTab from '../tabs/HomeTab';
import SearchTab from '../tabs/SearchTab';
import AddTab from '../tabs/AddTab';
import ChatTab from '../tabs/ChatTab';
import ProfileTab from '../tabs/ProfileTab';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={styles.container}>
      {selectedTab === 0 ? (
        <HomeTab />
      ) : selectedTab === 1 ? (
        <SearchTab />
      ) : selectedTab === 2 ? (
        <AddTab />
      ) : selectedTab === 3 ? (
        <ChatTab />
      ) : (
        <ProfileTab />
      )}
      <View style={styles.componentContiner}>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../assets/home.png')}
            style={styles.icon_element}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../assets/search.png')}
            style={styles.icon_element}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('../assets/add.png')}
            style={styles.icon_element}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={require('../assets/chat.png')}
            style={styles.icon_element}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.icon_element}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentContiner: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icons: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_element: {
    width: 24,
    height: 24,
  },
});
