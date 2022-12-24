import React, {useLayoutEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, Alert, SafeAreaView} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {urlFor} from "../sanity";
import {
    ArrowLeftIcon,
    ChevronRightIcon,
    MapPinIcon,
    QuestionMarkCircleIcon,
    StarIcon
} from "react-native-heroicons/mini";


const ResturantScreen = () => {
    const navigation = useNavigation()

    const {params:{
        id,
        imgUrl,
        title,
        rating,
        price,
        time,
        shortDescription,
        genre,
        address,
        long,
        lat,
        dishes
    }} = useRoute()

    useLayoutEffect(()=>{

        navigation.setOptions({
            headerShown:false
        })
    },[])

    return  (
        <ScrollView>
            <View className={"relative"}>
                <Image source={{uri:urlFor(imgUrl).url()}} className={"w-full h-64 bg-gray-400 p-4"}></Image>
                <TouchableOpacity className={"absolute top-4 left-4 h-12 w-12 bg-gray-100 top-12 flex items-center justify-center text-white rounded-full"} onPress={()=>navigation.goBack()}>
                    <ArrowLeftIcon size={20} color={"#00CCBB"}/>
                </TouchableOpacity>
            </View>

            <View className={"bg-white"}>
                <View className={"px-4 pt-4"}>
                    <Text className={"text-3xl font-bold"}>{title}</Text>
                    <View className={"flex-row space-x-2 my-1"}>
                        <View className={"flex-row space-x-1 items-center"}>
                            <StarIcon color={"green"} opacity={.5} size={22}/>
                           <Text className={"text-xs text-gray-500"}> <Text className={"text-green-300"}>{rating}</Text> . <Text>{genre}</Text></Text>

                        </View>
                        <View className={"flex-row space-x-1 items-center"}>
                            <MapPinIcon color={"gray"} opacity={.4} size={22}/>
                            <Text className={"text-xs text-gray-500"}> <Text className={"text-gray-500"}>Nearby .{address}</Text></Text>

                        </View>
                    </View>
                    <Text className={"text-gray-500 mt-2 pb-4"}>{shortDescription}</Text>
                </View>
                <TouchableOpacity className={"flex-row items-center space-x-2 p-4 border-y border-gray-200"}>
                    <QuestionMarkCircleIcon color={"gray"} opacity={.5} size={22}/>
                    <Text className={"text-md flex-1  font-bold"}>Have a food allergy?</Text>
                    <ChevronRightIcon color={"#00CCBB"}/>
                </TouchableOpacity>

            </View>
            <View>
                <Text className={"pt-6 px-4 font-bold text-xl"}>Menu</Text>
            </View>
            {/* Dishes */}
            {dishes.map((dish,index)=>{
                return <View><Text>1</Text></View>
            })}
        </ScrollView>
    )
}

export default ResturantScreen