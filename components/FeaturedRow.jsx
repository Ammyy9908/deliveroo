import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { ArrowDownIcon, ArrowRightIcon } from "react-native-heroicons/mini";
import ResturantCard from "./ResturantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description, featuredCategory }) => {
  const [resturants, setResturants] = React.useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="featured" && _id==$id]{
        ...,
        restaurants[]->{
        ...,
        dishes[]->,
        type->{
        name
        
        }},
        }[0]`,
        { id }
      )
      .then((data) => {
        setResturants(data?.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View>
      <View className={"mt-4 flex-row items-center justify-between px-4"}>
        <Text className={"font-bold text-lg"}>{title}</Text>
        <ArrowRightIcon color={"#00CCBB"} />
      </View>
      <Text className={"text-xs text-gray-500 px-4"}>{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className={"pt-4"}
      >
        {resturants.map((resturant) => {
          return (
            <ResturantCard
              key={resturant._id}
              id={resturant._id}
              imgUrl={resturant.image}
              title={resturant.name}
              rating={resturant.rating}
              price={resturant.price}
              shortDescription={resturant.short_description}
              genre={resturant.type?.genre}
              address={resturant.address}
              long={resturant.long}
              lat={resturant.lat}
              dishes={resturant?.dishes}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
