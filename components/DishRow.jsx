import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon } from "react-native-heroicons/solid";
import { PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasket,
  selectBasketItemById,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [pressed, setPressed] = React.useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemById(state, id));

  const addItemsToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemsFromBasket = () => {
    if (items.length === 0) {
      return;
    }
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        className={`bg-white  p-4 ${!pressed && "border border-gray-200"}`}
        onPress={() => setPressed(!pressed)}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className={"text-lg mb-1"}>{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="USD" />
            </Text>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
              }}
              className="h-20 w-20 bg-gray-500 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {pressed && (
        <View className="bg-white  px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemsFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#00ccbb" : "gray"}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemsToBasket} className="shadow-2xl">
              <PlusCircleIcon size={40} color="#00ccbb" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
