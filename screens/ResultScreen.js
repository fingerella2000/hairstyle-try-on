import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';


const ResultScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);
  
  const user_id = user.uid;
  const [isLoading, setIsLoading] = useState(true);
  const [imageSource, setImageSource] = useState(`https://mlworkspaceuk2288885558.blob.core.windows.net/azureml-blobstore-eb877bd2-e86d-4fcd-9cc8-4dde86e73c5c/LocalUpload/output/${user_id}/id_ref_ref_fidelity.png`);

  const checkImageExists = async () => {
    Image.getSize(imageSource, (width, height) => {
      // console.log(`width: ${width}, height: ${height}`);
      setIsLoading(false);
    }, failure => {
      // console.log('error getting size');
      setIsLoading(false);
      setImageSource(null); // Set image source to null if it doesn't exist
    });
  };

  checkImageExists();

  return (
    <View style={styles.container}>
      {isLoading && imageSource ? (
        <ActivityIndicator size="large" color="blue" />
      ) : imageSource ? (
        <Image
          source={{ uri: imageSource }}
          style={styles.image}
        />
      ) : (
        <Text style={styles.text}>Due to limited resource, your request may be handled in delay, we are working hard to generated your new hairstyle, please check your gallery later.</Text>
      )}
    </View>
  );
}

export default ResultScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 440,
    height: 440,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#555',
  },
})