import React from 'react'

import ram from '../../../Icons/ram.png'
import cpu from '../../../Icons/cpu.png'
import display from '../../../Icons/display.png'
import graphics from '../../../Icons/graphics.png'
import price from '../../../Icons/price.png'
import storage from '../../../Icons/storage.png'
import description from '../../../Icons/info.png'
import battery from '../../../Icons/battery.png'

const DetailedAccessories = (props:any) => {
  return (
    <div className='ml-8 w-64'>
        <p className='font-bold font-2xl'>Accessories Specs</p>
        <div className='text-left'>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={price} alt=''/>
            <p className='ml-2'>Brand: {props.post.brand} </p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={price} alt=''/>
            <p className='ml-2'>Price: {props.post.price + " birr"} </p>
        </div>            
        </div>
    </div>
  )
}

export default DetailedAccessories
