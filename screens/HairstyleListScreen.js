import { useNavigation } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, Text, View, StyleSheet, Dimensions, Pressable, ActivityIndicator } from 'react-native'
import { images_hairstyle } from '../hairimages';
import * as FileSystem from 'expo-file-system';
import { Asset, useAssets } from 'expo-asset';
import { getAccessToken, uploadReference, blendHair, sendPushNotification } from '../mlrequest';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";

// get push notification token
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  console.log(`Push Notification token is ${JSON.stringify(token)}`);
  return token;
}

const HairstyleListScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageClick = (item) => {  
    console.log('selected hairstyle:' + JSON.stringify(item));

    // local the asset image (hairstyle) user selected
    Asset.loadAsync(images_hairstyle[item.id].uri).then((localUri) => {
      // console.log(localUri);
      
      const user_id = user.uid;
      console.log(`uid: ${user_id}`);

      // upload selected hairstyle to azure ml workspace
      getAccessToken('storage').then(response => {
        uploadReference(response.access_token, localUri[0].localUri, user_id).then(response => {
          // console.log(response);
          getAccessToken('ml').then(response => {
            blendHair(response.access_token, user_id).then(response => {
              // the blendHair will return the ml job name
              const jobName = response.name;
              // console.log(response.name);
              // sendingthe job name together with pushToken to express server
              // let server check the job status routinely and then then push notification to client when the job is done
              registerForPushNotificationsAsync().then(pushToken => {
                // setExpoPushToken(token);
                sendPushNotification(pushToken, jobName);
              });
              navigation.navigate('Result');
            }).catch(error => alert(error.message))
          }).catch(error => alert(error.message));


        }).catch(error => alert(error.message));
      }).catch(error => alert(error.message));
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <View>
      <FlatList
        numColumns={2}
        data={images_hairstyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={ () => handleImageClick(item) }>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
            <Image source={ item.uri } style={styles.image} onLoad={() => setIsLoading(false)} />
          </Pressable>
        )}
      />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 2 - 10,
    height: 200,
    margin: 5,
  },
});

export default HairstyleListScreen
