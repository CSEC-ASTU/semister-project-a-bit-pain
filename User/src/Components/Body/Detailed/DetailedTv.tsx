import React from 'react'

import ram from '../../../Icons/ram.png'
import cpu from '../../../Icons/cpu.png'
import display from '../../../Icons/display.png'
import graphics from '../../../Icons/graphics.png'
import price from '../../../Icons/price.png'
import storage from '../../../Icons/storage.png'
import description from '../../../Icons/info.png'
import battery from '../../../Icons/battery.png'

const DetailedTv = (props:any) => {
  return (
    <div className='ml-8 w-64'>
        <p className='font-bold font-2xl'>TV Specs</p>
        <div className='text-left'>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={ram} alt=''/>
            <p className='ml-2'>Brand: {props.post.brand}</p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={ram} alt=''/>
            <p className='ml-2'>Screensize: {props.post.screensize}</p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={display} alt=''/>
            <p className='ml-2'>DisplayTechnology: {props.post.displaytechnology} </p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={cpu} alt=''/>
            <p className='ml-2'>Resolution: {props.post.resolution} </p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={cpu} alt=''/>
            <p className='ml-2'>Refreshrate: {props.post.refreshrate} </p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={battery} alt=''/>
            <p className='ml-2'>Connectivity: {props.post.connectivity}</p>
        </div>
        <div className='flex flex-row my-2'>
            <img className='h-8' src={price} alt=''/>
            <p className='ml-2'>Price: {props.post.price + " birr"} </p>
        </div>         
        </div>
    </div>
  )
}

export default DetailedTv
