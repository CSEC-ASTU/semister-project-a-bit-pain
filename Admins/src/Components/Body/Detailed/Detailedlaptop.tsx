import React from 'react'
import ram from '../../../Icons/ram.png'
import cpu from '../../../Icons/cpu.png'
import display from '../../../Icons/display.png'
import graphics from '../../../Icons/graphics.png'
import price from '../../../Icons/price.png'
import storage from '../../../Icons/storage.png'
import description from '../../../Icons/info.png'
import battery from '../../../Icons/battery.png'
import { Ilaptop } from '../../../Models/Models'

const Detailedlaptop = (props:any) => {
  return (
    <div>
      <div className='ml-8'>
          <p className='font-bold font-2xl'>Laptop Specs</p>
          <div className='text-left'>
            <div className='flex flex-row my-2'>
              <img className='h-8' src={ram} alt=''/>
              <p className='ml-2'>RAM: </p>
            </div>
            <div className='flex flex-row my-2'>
              <img className='h-8' src={display} alt=''/>
              <p className='ml-2'>Display: </p>
            </div>
            <div className='flex flex-row my-2'>
              <img className='h-8' src={storage} alt=''/>
              <p className='ml-2'>Storage: </p>
            </div>
            <div className='flex flex-row my-2'>
              <img className='h-8' src={cpu} alt=''/>
              <p className='ml-2'>CPU: </p>
            </div>
            <div className='flex flex-row my-2'>
              <img className='h-8' src={graphics} alt=''/>
              <p className='ml-2'>Graphics card: </p>
            </div>
            <div className='flex flex-row my-2'>
              <img className='h-8' src={battery} alt=''/>
              <p className='ml-2'>Battery: </p>
            </div>
            <div className='flex flex-row my-2'>
              <img className='h-8' src={price} alt=''/>
              <p className='ml-2'>Price: </p>
            </div>
            <div className='flex flex-row my-2'>
              <img className='h-8' src={description} alt=''/>
              <p className='ml-2'>Description: </p>
            </div>
            <div className='flex justify-center'>
              <button className='border-2 border-black rounded-2xl bg-white text-black px-2 hover:bg-black hover:text-white m-4 md:m-0'>Cart Item</button>
            </div>            
          </div>
        </div>
    </div>
  )
}

export default Detailedlaptop
