import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { sliderImages } from '../constants';

const { width } = Dimensions.get('window');

const ImageSlider = () => {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width * 0.85} 
        height={width / 2}
        autoPlay={true}
        autoPlayInterval={3000}
        pagingEnabled={true} 
        data={sliderImages}
        scrollAnimationDuration={1000}
        renderItem={({ item, index, animationValue }) => (
          <ItemCard item={item} animationValue={animationValue} />
        )}
      />
    </View>
  );
};

const ItemCard = ({ item, animationValue }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-1, 0, 1], [0.9, 1, 0.9]); // Zoom in & out
    return { transform: [{ scale }] };
  });

  return (
    <View style={styles.slide}>
      <Animated.Image source={item} style={[styles.image, animatedStyle]} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: width * 0.85,
    height: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#ddd',
    alignSelf: 'center',
  },
});

export default ImageSlider;
