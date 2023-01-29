import React from 'react'

import ram from '../../../Icons/ram.png'
import cpu from '../../../Icons/cpu.png'
import display from '../../../Icons/display.png'
import graphics from '../../../Icons/graphics.png'
import price from '../../../Icons/price.png'
import storage from '../../../Icons/storage.png'
import description from '../../../Icons/info.png'
import battery from '../../../Icons/battery.png'

const DetailedLaptop = (props:any) => {
  return (
    <div className='ml-8 w-64'>
                      <p className='font-bold font-2xl'>Laptop Specs</p>
                      <div className='text-left'>
                        <div className='flex flex-row my-2'>
                          <img className='h-8' src={ram} alt=''/>
                          <p className='ml-2'>RAM: {props.post.ram}</p>
                        </div>
                        <div className='flex flex-row my-2'>
                          <img className='h-8' src={display} alt=''/>
                          <p className='ml-2'>Display: {props.post.display} </p>
                        </div>
                        <div className='flex flex-row my-2'>
                          <img className='h-8' src={storage} alt=''/>
                          <p className='ml-2'>Storage: {props.post.storagessd +" SSD " + props.post.storagehdd + " HDD"}</p>
                        </div>
                        <div className='flex flex-row my-2'>
                          <img className='h-8' src={cpu} alt=''/>
                          <p className='ml-2'>CPU: {props.post.cpuprocessor + " " + props.post.cpugeneration} </p>
                        </div>
                        <div className='flex flex-row my-2'>
                          <img className='h-8' src={graphics} alt=''/>
                          <p className='ml-2'>Graphics card: {props.post.graphicscardname + " " + props.post.graphicscardsize} </p>
                        </div>
                        <div className='flex flex-row my-2'>
                          <img className='h-8' src={battery} alt=''/>
                          <p className='ml-2'>Battery: {props.post.battery}</p>
                        </div>
                        <div className='flex flex-row my-2'>
                          <img className='h-8' src={price} alt=''/>
                          <p className='ml-2'>Price: {props.post.price + " birr"} </p>
                        </div>           
                      </div>
                    </div>
  )
}

export default DetailedLaptop
