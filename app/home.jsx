import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageSlider from '../components/ImageSlider';
import { useRouter } from 'expo-router';
import BodyParts from '../components/BodyParts';
import FitMeBot from '../components/FitMebot';

export default function Home() {
  const router = useRouter();
  const [isChatVisible, setIsChatVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white flex space-y-5" edges={['top']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text style={{ fontSize: hp(4.5) }} className="font-bold tracking-wider text-neutral-700">
            READY TO
          </Text>
          <Text style={{ fontSize: hp(4.5) }} className="font-bold tracking-wider text-rose-500">
            WORKOUT
          </Text>
        </View>

        <View className="flex justify-center items-center space-y-2">
          <Image source={require('../assets/avatar.png')} style={{ height: hp(6), width: hp(6) }} className="rounded-full" />
          <View
            className="bg-neutral-200 rounded-full flex justify-center items-center border-[3px] border-neutral-300"
            style={{ height: hp(5.5), width: hp(5.5) }}
          >
            <Ionicons name="notifications" size={30} />
          </View>
        </View>
      </View>

      {/* Image Slider */}
      <View style={{ height: 200 }}>
        <ImageSlider />
      </View>

      {/* Body Parts */}
      <View style={{ flex: 1 }}>
        <BodyParts />
      </View>

  {/* Chatbot Panel */}
  {isChatVisible && (
        <View className="absolute bottom-24 right-6 h-[90%] w-[80%] rounded-2xl shadow-lg z-40 overflow-hidden">
          <FitMeBot />
        </View>
      )}

      {/* Floating Chat Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 z-50 bg-rose-500 p-4 rounded-full shadow-lg"
        onPress={() => setIsChatVisible(!isChatVisible)}
      >
        <Ionicons
          name={isChatVisible ? "close" : "chatbubble-ellipses"}
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
