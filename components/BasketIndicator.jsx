import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasket, selectBasketTotals } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
const BasketIndicator = () => {
  const items = useSelector(selectBasket);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotals);
  return (
    <View className="absolute bottom-10 z-10 w-full">
      <TouchableOpacity className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row space-x-1 items-center">
        <Text className="text-white font-extrabold text-lg bg-[#01a296] py-1 px-2 rounded-md">
          {items.length}
        </Text>
        <Text className="flex-1 text-white text-center font-extrabold text-lg">
          View Basket
        </Text>
        <Text className="text-white text-lg font-extrabold">
          <Currency quantity={basketTotal} currency="USD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIndicator;
