import React from 'react'

import ram from '../../../Icons/ram.png'
import cpu from '../../../Icons/cpu.png'
import display from '../../../Icons/display.png'
import graphics from '../../../Icons/graphics.png'
import price from '../../../Icons/price.png'
import storage from '../../../Icons/storage.png'
import description from '../../../Icons/info.png'
import battery from '../../../Icons/battery.png'

const DetailedPhone = (props:any) => {
  return (
    <div>
    <div className='ml-8 w-64'>
        <p className='font-bold font-2xl'>Phone Specs</p>
        <div className='text-left'>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={ram} alt=''/>
            <p className='ml-2'>Brand: {props.post.brand}</p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={ram} alt=''/>
            <p className='ml-2'>Name: {props.post.name}</p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={ram} alt=''/>
            <p className='ml-2'>Color: {props.post.color}</p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={ram} alt=''/>
            <p className='ml-2'>RAM: {props.post.ram}</p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={ram} alt=''/>
            <p className='ml-2'>ScreenSize: {props.post.screensize}</p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={ram} alt=''/>
            <p className='ml-2'>Camera: {props.post.camerafront + " front " + props.post.cameraback + " back"}</p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={storage} alt=''/>
            <p className='ml-2'>Storage: {props.post.storage} </p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={price} alt=''/>
            <p className='ml-2'>Price: {props.post.price + " birr"}</p>
        </div>          
        </div>
    </div>
</div>
  )
}

export default DetailedPhone
