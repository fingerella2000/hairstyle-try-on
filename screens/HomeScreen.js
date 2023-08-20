import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../firebase';
import Button from '../components/Button';
import ImageViewer from '../components/ImageViewer';
import { getAccessToken, uploadIdentity } from '../mlrequest';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import React, { useContext, useEffect, useState, useRef } from 'react';import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const PlaceholderImage = require('../assets/demo/demo.png');

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);

  const handleSignOut = (navigation) => {
    auth
      .signOut()
      .then(() => {
        console.log('user logged out')
      })
      .catch(error => alert(error.message))
  }

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // console.log('selected portrait: ' + result.assets[0].uri);

      const user_id = user.uid;
      // console.log(`uid: ${user.uid}`);

      // upload selected portrait to azure ml workspace
      getAccessToken('storage').then(response => {
        uploadIdentity(response.access_token, result.assets[0].uri, user_id).then(response => {
          // console.log(response);
        }).catch(error => alert(error.message))
      })
      .catch(error => alert(error.message));
    } else {
      console.log('You did not select any image.');
    }
  };

  // handled push notification
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      Notifications.setBadgeCountAsync(0); // Set badge number to 0
      const reqData = response.notification.request.content.data;
      // Navigate to the desired screen
      navigation.navigate(reqData.screen);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer 
          placeholderImageSource={PlaceholderImage} 
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose one of my portraits" onPress={pickImageAsync} />
        <Button label="Select a hairstyle model" onPress={() => navigation.navigate('Hairstyles')}/>
        <Button label="My hairstyle gallery" onPress={() => navigation.navigate('Result')}/>
        <Button label="Sign out" onPress={handleSignOut}/>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 30,
  },
  footerContainer: {
    flex: 1/2,
    alignItems: 'center',
  },
})