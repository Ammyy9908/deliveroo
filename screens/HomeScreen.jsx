import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { AdjustmentsVerticalIcon } from "react-native-heroicons/solid/esm";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const [featured, setFeatured] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="featured"]{
        ...,
        restaurants[]->{
        ...,
        dishes[]->
        
        }
        
        }`
      )
      .then((data) => {
        setFeatured(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row  items-center mx-4 space-x-2 py-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Bangalore,India
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 py-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={30} />
          <TextInput
            placeholder="Restaurants and cuisines"
            className="w-full"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" size={32} />
      </View>
      {/*Body */}
      <ScrollView className="bg-gray-100" contentContainerStyle={{}}>
        {/*Categories */}

        <Categories />
        {/*Featured */}

        {featured?.map((item) => {
          return (
            <FeaturedRow
              key={item._id}
              id={item._id}
              title={item.name}
              description={item.short_description}
              featuredCategory={item.featuredCategory}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
