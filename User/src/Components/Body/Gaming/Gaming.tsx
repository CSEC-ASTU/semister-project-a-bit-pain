import React,{useState, useEffect} from 'react'
import Menu from '../../../Icons/menu.png';
import { Carditems } from '../../Cards/Carditems';
import close from '../../../Icons/close.png';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Card } from '@mui/material';
import { addall } from '../../../Redux/Actions';
import { useDispatch } from 'react-redux';
import { URL } from '../../../Redux/ActionTypes';


const Laptops = () => {
  const [open, setOpen] = useState(false);
  const [page, SetPage] = useState(1);
  const [itemsthere, setitemsthere] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const gaming = useSelector((state:any) => state.allitems.allitems);
  useEffect(() => {
    if(gaming.length === 0){
      axios.get(URL +"/read.php").then((response) => {
          dispatch(addall(response.data.data));     
          if(response.data.data === "no posts found"){
          }
      });
    }
  }, []);
  let gameitems = gaming.filter((game:any) => game.types === 'gaming');
  const handleChange = (e:any, p:any) => {
    SetPage(p);
  }
  return (
    <div>
          <div className='shadow border-b-2 border-gray-400 mx-4 md:mx-16 mt-8'>
            <h1>Shop Brand Gaming Consoles</h1>
          </div>
          <div className="relative flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden mx-4 md:mx-16 mt-2">
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
              placeholder="Search gaming consoles.." /> 
          </div>
          {(()=>{
              if(itemsthere){
                  return(
                    <div className='mt-10'>
                       <h1>we will add contents soon</h1>
                    </div>
                    )
              }
              else if(gameitems.filter((items:any) => items.name.toLowerCase().includes(search) || items.brand.toLowerCase().includes(search)|| items.price.toLowerCase().includes(search)).length === 0 ){
                return(
                  <div className='h-96 flex justify-center align-center items-center'>
                    <p>There is no gaming console with name {search}</p>
                  </div>
                )
              }
              else{
                  return(
                    <div className='flex flex-row'>
                      <div className='flex flex-col'>
                        {/* <div onClick={()=>setOpen(!open)} className='md:hidden mx-2 w-6 mb-2'>
                          {open? <img  className='h-4 mt-2'  src={close}/> : <img className='h-4 mt-2' src={Menu}/>}
                        </div> */}
                      </div>
                    <div className='flex flex-row'>
                      <div className='md:mx-16 flex flex-wrap justify-center align-center md:flex-wrap md:pr-8 mt-2'>
                        {
                          [...gameitems].filter((item:any) => {
                            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search) || item.brand.toLowerCase().includes(search) || item.price.toLowerCase().includes(search)
                          }).slice((page-1)*12,12*page).map(({id,brand,name,catagory,price,description,types,images}:any) => (
                            <Carditems key={id} id={id} brand={brand} catagory={catagory} name={name} price={price} description={description} types={types} images={images}/>
                            ))
                        }
                      </div>
                    </div>
                  </div>
                  )
              }
          })()}
        <div className='flex justify-center my-8'>
          <Stack spacing={2}>
            <Pagination count={10} variant="outlined" shape="rounded" onChange={handleChange} />
          </Stack>
        </div>
    </div>
  )
}

export default Laptops
