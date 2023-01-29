import React from 'react'
import iphone from '../../Images/iphone.jpg'
import {Link} from 'react-router-dom'

interface Catagories {
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
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className='h-52 hover:border-2 hover:border-gray-400 shadow hover:shadow- md:h-52 md:shadow md:w-48 rounded-md m-2 p-2'>
      <Link  to={`/detailed/${props.id}`}>
        <div className='h-32 w-28 flex justify-center md:h-36 md:w-44'>
          <img className='h-32 md:mt-0 rounded-md' src={"http://localhost/blacknebecom/api/post/photos/" + images[0]} alt=''/>
        </div>
      </Link>
      <div>
        <p className=''>{name}</p>
      </div>
    </div>
  )
}

