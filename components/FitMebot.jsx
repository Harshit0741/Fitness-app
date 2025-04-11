import React from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function FitMeBot() {
  const { height, width } = Dimensions.get('window');

  return (
    <View className="flex-1 items-center justify-center">
      <View 
        style={{
          height: height * 0.85, // 85% of screen height
          width: width * 0.85,   // 85% of screen width
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          overflow: 'hidden',
 
        }}
      >
        <WebView 
          source={require('../assets/chat.html')} // Ensure chat.html is in the correct path
          javaScriptEnabled
          domStorageEnabled
          style={{ flex: 1, backgroundColor: 'transparent' }}  
        />
      </View>
    </View>
  );
}
