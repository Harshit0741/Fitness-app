import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchExerciesByBodypart } from '../api/exerciesDB';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExerciesList from '../components/ExerciesList';
import { ScrollView } from 'react-native-virtualized-view';
import { debounce } from 'lodash';
import { demo } from '../constants';

export default function ExercisesScreen() {
    const router = useRouter();
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const item = useLocalSearchParams();


    const getExercises = useCallback(
        debounce(async (bodyPart) => {
            setLoading(true);
            let data = await fetchExerciesByBodypart(bodyPart);
            if (data) setExercises(data);
            setLoading(false);
        }, 500),
        []
    );


    useEffect(() => {
        if (item?.name && exercises.length === 0) {
            getExercises(item.name);
        }
    }, [item]);

    return (
        <ScrollView>
            <StatusBar style="light" />
            <Image
                source={item.image}
                style={{ width: wp(100), height: hp(45) }}
                className="rounded-b-[40px]"
            />
            <TouchableOpacity
                onPress={() => router.back()}
                className="bg-rose-500 absolute flex justify-center items-center pr-1 rounded-full"
                style={{ height: hp(5.5), width: hp(5.5), marginTop: hp(5.5) }}
            >
                <Ionicons name="caret-back-outline" size={30} color='white'/>
            </TouchableOpacity>

            <View className="mx-4 space-y-3 mt-4">
                <Text
                    style={{ fontSize: hp(2.5), height: hp(3.5) }}
                    className="font-semibold text-neutral-700"
                >
                    {item.name} exercises
                </Text>

                <View className="mb-10">
                    {loading ? (
                        <ActivityIndicator size="large" color="#ff5733" />
                    ) : (
                        <ExerciesList data={exercises} />
                    )}
                </View>
                {/* <View className="mb-10">

                        <ExerciesList data={exercises} />

                </View> */}
            </View>
        </ScrollView>
    );
}
