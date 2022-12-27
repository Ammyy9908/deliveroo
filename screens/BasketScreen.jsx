import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant, setRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasket,
  selectBasketTotals,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasket);
  const dispatch = useDispatch();
  const [groupedItems, setGroupedItems] = useState();
  const basketTotal = useSelector(selectBasketTotals);

  useMemo(() => {
    const groupedItems = items.reduce((results, items) => {
      (results[items.id] = results[items.id] || []).push(items);
      return results;
    }, {});
    setGroupedItems(groupedItems);
  }, [items, restaurant]);
  console.log(restaurant);
  console.log(groupedItems);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-full bg-gray-100 absolute top-3 right-5"
            onPress={() => navigation.goBack()}
          >
            <XCircleIcon size={50} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 my-5  bg-white">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deleiver in 50-75 mins</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {groupedItems &&
            Object.entries(groupedItems).map(([key, items]) => {
              return (
                <View
                  key={key}
                  className="flex-row space-x-3 bg-white py-2 px-5 items-center"
                >
                  <Text className="text-[#00CCBB]">{items.length} x</Text>
                  <Image
                    source={{ uri: urlFor(items[0]?.image).url() }}
                    className="w-12 h-12 rounded-full"
                  />
                  <Text className="flex-1">{items[0]?.name}</Text>
                  <Text>
                    <Currency quantity={items[0]?.price} currency="USD" />
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(removeFromBasket({ id: key }));
                    }}
                  >
                    <Text className="text-[#00CCBB] text-xs">Remove</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          {items.length > 0 && (
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Subtoal</Text>
              <Text className="text-gray-400">
                <Currency quantity={basketTotal} currency="USD" />
              </Text>
            </View>
          )}
          {items.length > 0 && (
            <View className="flex-row justify-between">
              <Text className="text-[#00CCBB]">Deleivery fee</Text>
              <Text className="text-gray-400">
                <Currency quantity={5.99} currency="USD" />
              </Text>
            </View>
          )}
          {items.length > 0 && (
            <View className="flex-row justify-between">
              <Text className=" font-bold">Order Total</Text>
              <Text className="text-gray-400">
                <Currency quantity={basketTotal + 5.99} currency="USD" />
              </Text>
            </View>
          )}
          {items.length > 0 && (
            <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4">
              <Text className="text-white text-center font-bold text-lg">
                Place Order
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
