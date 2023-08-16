import { useNavigation } from '@react-navigation/core'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, Text, View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { images_hairstyle } from '../hairimages';
import * as FileSystem from 'expo-file-system';
import { Asset, useAssets } from 'expo-asset';
import { getAccessToken, uploadReference, blendHair } from '../mlrequest';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';

const HairstyleListScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);

  const handleImageClick = (item) => {  
    console.log('selected hairstyle:' + JSON.stringify(item));

    // local the asset image (hairstyle) user selected
    Asset.loadAsync(images_hairstyle[item.id].uri).then((localUri) => {
      console.log(localUri);
      
      const user_id = user.uid;
      console.log(`uid: ${user.uid}`);

      // upload selected hairstyle to azure ml workspace
      getAccessToken('storage').then(response => {
        uploadReference(response.access_token, localUri[0].localUri, user_id).then(response => {
          console.log(response);

          getAccessToken('ml').then(response => {
            blendHair(response.access_token, user_id).then(response => {
              console.log(response);
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
            <Image source={ item.uri } style={styles.image} />
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
