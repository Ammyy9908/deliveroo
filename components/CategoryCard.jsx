import {Image, View, TouchableOpacity, Text, Alert} from 'react-native'
import React from 'react'
import {urlFor} from "../sanity";

const CategoryCard = (props)=>{
    return(
        <TouchableOpacity className={"mr-2"} onPress={()=>{
        Alert.alert("You clicked on "+props.title)
        }
        }>
            <Image source={{uri:urlFor(props.imgUrl).url()}} className={"w-32 h-32 rounded"}/>
            <Text className={"absolute bottom-1 text-white font-bold left-1"}>{props.title}</Text>
        </TouchableOpacity>
    )
}


export default CategoryCard

