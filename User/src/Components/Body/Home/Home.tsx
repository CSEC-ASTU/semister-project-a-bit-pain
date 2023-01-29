import React,{useState, useEffect} from 'react';
import { Carditems } from '../../Cards/Carditems';
import { useSelector, useDispatch } from 'react-redux';
import arrayShuffle from 'array-shuffle';
import Menu from '../../../Icons/menu.png';
import close from '../../../Icons/close.png';
import Contact from '../Contact/Contact';
import axios from 'axios';
import { addall } from '../../../Redux/Actions';
import { URL } from '../../../Redux/ActionTypes';
import { Link } from 'react-router-dom';


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
const Home = () => {
  const [open, setOpen]= useState(false);
  const [itemsthere, setitemsthere] = useState(false);
  const [post,setpost] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const allitems = useSelector((state:any) => state.allitems.allitems);
  const userinfo = useSelector((state:any) => state.user);
  async function getitems (){
    try{
      let response = await axios.get(URL + "/read.php");
      setpost(response.data.data);
      dispatch(addall(response.data.data));     
      if(response.data.data === "no posts found"){
            setitemsthere(true);
          }
    }
    catch(error){
    }
  }
  useEffect(()=>{
    if(allitems.length === 0){
      getitems();
    }
  },[]);
  if(!post) return null;
  const shuffled = arrayShuffle(allitems);
  const shuffledone = arrayShuffle(allitems);
  const shuffledtwo = arrayShuffle(allitems);
  const shuffledthree = arrayShuffle(allitems);
  const shuffledfour = arrayShuffle(allitems);
  return (
    <div className=''>
        <div className='shadow border-b-2 border-gray-400 mx-4 md:mx-16 mt-8'>
          <h1>Shop every item You want</h1>
        </div>
        <div className="flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden mx-4 md:mx-16 mt-2">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
              </div>
              <input
              onChange={(e) => {
                    setSearch(e.target.value.toLowerCase());
                  }}
              className="peer h-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search products.." /> 
          </div>
        {(()=>{
              if(itemsthere){
                  return(
                      <h1>we will add contents soon</h1>
                  )
              }
              else if(shuffled.filter((items:any) => items.name.toLowerCase().includes(search) || items.brand.toLowerCase().includes(search)|| items.price.toLowerCase().includes(search)).length === 0 ){
                return(
                  <div className='h-96 flex justify-center align-center items-center'>
                    <p>There is no product with name {search}</p>
                  </div>
                )
              }
              else{
                  return(
                    <div className='flex flex-row'>
                      <div className='mx-10 w-full md:flex justify-around flex-wrap overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-[28rem] pr-8 mt-2 grid grid-cols-2'>
                        {
                          [...shuffled].filter((item:any) => {
                            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search) || item.brand.toLowerCase().includes(search) || item.price.toLowerCase().includes(search)
                          }).slice(0,24).map(({id,brand,name,catagory,price,description,types,images}:any) => (
                            <Carditems key={id} id={id} brand={brand} catagory={catagory} name={name} price={price} description={description} types={types} images={images}/>
                            ))
                        }
                      </div>
                    </div>
                  )
              }
          })()}
        <div className='shadow border-b-2 border-gray-400 mx-4 md:mx-16 mt-8'>
          <h1>Shop By Class</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 justify-around p-4 mt-4'>
          <div className=''>
            <h2 className='border-b-2 border-gray-400 mx-32 md:mx-80'>Trending</h2>
            
              {(()=>{
                    if(itemsthere){
                        return(
                            <h1>we will add contents soon</h1>
                        )
                    }
                    else{
                        return(
                          <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full mx-8 md:mx-16 my-8 h-64 md:h-72'>
                            <div className='flex flex-row'>
                          {
                            [...shuffledone].map(({id,brand,name,catagory,price,description,types,images}:any) => (
                              <Carditems key={id} id={id} brand={brand} catagory={catagory} name={name} price={price} description={description} types={types} images={images}/>
                              ))
                          }

                              </div>
                           </div>
                          
                        )
                    }
                })()}
              
          </div>
          <div className=''>
            <h2 className='border-b-2 border-gray-400 mx-32 md:mx-80'>New Arrivals</h2>
            {(()=>{
                    if(itemsthere){
                        return(
                            <h1>we will add contents soon</h1>
                        )
                    }
                    else{
                        return(
                          <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full mx-8 md:mx-16 my-8 h-64 md:h-72'>
                            <div className='flex flex-row'>
                          {
                            [...shuffledtwo].map(({id,brand,name,catagory,price,description,types,images}:any) => (
                              <Carditems key={id} id={id} brand={brand} catagory={catagory} name={name} price={price} description={description} types={types} images={images}/>
                              ))
                          }

                              </div>
                           </div>
                          
                        )
                    }
                })()}
          </div>
          <div className=''>
            <h2 className='border-b-2 border-gray-400 mx-32 md:mx-80'>Discounts</h2>
            {(()=>{
                    if(itemsthere){
                        return(
                            <h1>we will add contents soon</h1>
                        )
                    }
                    else{
                        return(
                          <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full mx-8 md:mx-16 my-8 h-64 md:h-72'>
                            <div className='flex flex-row'>
                          {
                            [...shuffledthree].map(({id,brand,name,catagory,price,description,types,images}:any) => (
                              <Carditems key={id} id={id} brand={brand} catagory={catagory} name={name} price={price} description={description} types={types} images={images}/>
                              ))
                          }

                              </div>
                           </div>
                          
                        )
                    }
                })()}
          </div>
          <div className=''>
            <h2 className='border-b-2 border-gray-400 mx-32 md:mx-72'>Popular Brands</h2>
            {(()=>{
                    if(itemsthere){
                        return(
                            <h1>we will add contents soon</h1>
                        )
                    }
                    else{
                        return(
                          <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full mx-8 md:mx-16 my-8 h-64 md:h-72'>
                            <div className='flex flex-row'>
                          {
                            [...shuffledfour].map(({id,brand,name,catagory,price,description,types,images}:any) => (
                              <Carditems key={id} id={id} brand={brand} catagory={catagory} name={name} price={price} description={description} types={types} images={images}/>
                              ))
                          }

                              </div>
                           </div>
                          
                        )
                    }
                })()}
          </div>
        </div>
        {
          userinfo.userlogged? ( <div></div> ) : ( 
          <div>
            <div className='shadow border-b-2 border-gray-400 mx-4 md:mx-16 mt-8'>
                  <h1>Be a member</h1>
                </div>
            <div className=''>
              <div>
                <h2 className='m-8'>Create Account and Join our Hood</h2>
                <div className='flex justify-around'>
                  <Link to={'/signup'}>
                    <button className='m-2 border-2 border-gray-400 shadow w-72 h-32 rounded-lg bg-slate-100 hover:bg-gradient-to-r from-cyan-500 to-blue-500'>
                      <div className='flex justify-center items-center'>
                        <h1 className='text-gray-800'>Sign Up</h1>
                      </div>
                    </button>
                  </Link>
                  <Link to={'/signin'}>
                    <button className='m-2 border-2 border-gray-400 shadow w-72 h-32 rounded-lg bg-slate-100 hover:bg-gradient-to-r from-cyan-500 to-blue-500'>
                      <div className='flex justify-center items-center'>
                        <h1 className='text-gray-800'>Sign in</h1>
                      </div>
                    </button>
                  </Link>
                  <Link to={'/contact'}>
                    <button className='m-2 border-2 border-gray-400 shadow w-72 h-32 rounded-lg bg-slate-100 hover:bg-gradient-to-r from-cyan-500 to-blue-500'>
                      <div className='flex justify-center items-center'>
                        <h1 className='text-gray-800'>Contact Admins</h1>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div> )
        }
        <Contact/>
     </div>
  )
}

export default Home
