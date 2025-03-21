import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rapidApiKey } from "../constants";

const baseUrl = 'https://exercisedb.p.rapidapi.com';

const apiCall = async (url, params) => {
    try {
        const options = {
            method: 'GET',
            url,
            params,
            headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
            }
        };
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log('API error:', err.message);
        return null;
    }
};

export const fetchExerciesByBodypart = async (bodyPart) => {
    try {
        const cachedData = await AsyncStorage.getItem(`exercises_${bodyPart}`);
        if (cachedData) {
            console.log("Using cached data");
            return JSON.parse(cachedData);
        }

        const data = await apiCall(`${baseUrl}/exercises/bodyPart/${bodyPart}`);
        if (data) {
            await AsyncStorage.setItem(`exercises_${bodyPart}`, JSON.stringify(data));
        }

        return data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return null;
    }
};
