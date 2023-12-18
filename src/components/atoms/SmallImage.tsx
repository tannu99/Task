import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';

interface SmallImageProps {
  source: ImageSourcePropType;
  style?: object;
}

export const SmallImage: React.FC<SmallImageProps> = ({source, style}) => {
  return <Image source={source} style={[styles.image, style]} />;
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
