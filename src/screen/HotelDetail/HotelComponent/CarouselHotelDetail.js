import React from 'react'
import { Image, ScrollView, Dimensions} from 'react-native'
import { apiURL2 } from '../../../constant/apiURL'

const {width} = Dimensions.get('window')
const height = width * 0.9 // 60%
const CarouselHotelDetail = ({images}) => {
    
    return (
            <ScrollView 
            horizontal
            style={{width, height}}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            >
            {
                images &&
                images.map((image, index) => (
                    <Image 
                    key={index}
                    source={{uri : apiURL2 + '/public/hotel-images/' + image.url}}
                    style={{width, height, resizeMode : 'cover'}}
                    />
                ))
            }
            </ScrollView>
    )
}

export default CarouselHotelDetail
