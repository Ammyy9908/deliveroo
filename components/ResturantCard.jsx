import { Image, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/mini";
import { MapIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const ResturantCard = ({
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
  dishes,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className={" bg-white mr-3 shadow"}
      onPress={() => {
        navigation.navigate("Resturant", {
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
          dishes,
        });
      }}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className={"w-64 h-64 rounded-sm"}
      />
      <View className={"px-3 pb-4"}>
        <Text className={"text-lg pt-2 font-bold"}>{title}</Text>
        <View className={"flex-row items-center space-x-1"}>
          <StarIcon color={"green"} opacity={0.6} size={22} />
          <Text className={"text-xs text-gray-500"}>
            <Text className={"text-green-500"}>{rating}</Text> . {genre}
          </Text>
        </View>
        <View className={"flex-row items-center space-x-1"}>
          <MapIcon color={"gray"} opacity={0.4} size={22} />
          <Text className={"text-xs text-gray-500"}>
            Nearby {rating}. {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResturantCard;
