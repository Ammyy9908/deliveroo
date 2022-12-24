import { ScrollView, Text } from 'react-native'
import React from 'react'
import CategoryCard from "./CategoryCard";
import sanity from "../sanity";

const Categories = () => {
    const [categories, setCategories] = React.useState([])

    React.useEffect(()=>{

        sanity.fetch(`*[_type=="category"]`).then((data)=>{
            console.log(data)
            setCategories(data)

        }).catch((e=>{
            console.log(e)
        }))
    },[])
  return (
    <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={
        {
            paddingHorizontal:15,
            paddingTop:15
        }
    }>
        {/*Category Card */}

        {categories.map((category)=>{
        return <CategoryCard imgUrl={category.image} title={category.name}/>
    })
        }

    </ScrollView>
  )
}

export default Categories