import React from 'react'
import iphone from '../../Images/iphone.jpg'
import {Link} from 'react-router-dom'
import { URLPHOTO } from '../../Redux/ActionTypes'

export interface Catagories {
  id:string,
  brand:string,
  catagory:string,
  name:string,
  price:string,
  description:string,
  types:string,
  images:Array<string>
}

export const Carditems = (props: Catagories) => {
  const {id,brand,catagory,name,price,description,types,images} = props;
  return (
    <div className='h-44 w-32 hover:border-2 hover:border-gray-400 shadow hover:shadow- md:h-52 md:shadow md:w-48 rounded-md m-2 p-2'>
      <Link  to={`/detailed/${props.id}`}>
        <div className='h-32 w-28 flex justify-center align-center md:h-36 md:w-44'>
          <img className='md:h-32 h-20 md:mt-0 rounded-md' src={URLPHOTO + images[0].toLocaleLowerCase()} alt=''/>
        </div>
      </Link>
      <div>
        <p className=''>{name.slice(0,10) + "..."}</p>
      </div>
    </div>
  )
}

