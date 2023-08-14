import { StyleSheet, Image } from 'react-native';

// the component to display image
export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 440,
    height: 440,
    borderRadius: 18,
  },
});
