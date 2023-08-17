import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import Button from '../components/Button';


const ResultScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);
  
  const user_id = user.uid;
  const imageUri = `https://mlworkspaceuk2288885558.blob.core.windows.net/azureml-blobstore-eb877bd2-e86d-4fcd-9cc8-4dde86e73c5c/LocalUpload/output/${user_id}/id_ref_ref_fidelity.png`;
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    // Fetch the image and check for errors
    const checkImageExists = async () => {
      try {
        const response = await fetch(imageUri);
        if (response.ok) {
          setImageExists(true);
        }
      } catch (error) {
        setImageExists(false);
      }
    };

    checkImageExists();
  }, []);

  const goHomepage = (navigation) => {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      {imageExists ? (
        <Image
          style={styles.image}
          source={{ uri: imageUri }}
        />
      ) : (
        <Text style={styles.text}>
          Due to limited resource, your request may be handled in delay, we are working hard to generated your new hairstyle, please check your gallery later.
        </Text>
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