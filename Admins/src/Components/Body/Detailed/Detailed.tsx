import React,{useState, useEffect} from 'react'
import iphone from '../../../Images/iphone.jpg'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { Carditems } from '../../Cards/Carditems'
import { addall } from '../../../Redux/Actions';
import { laptopform } from '../Upload pages/UploadLaptop'
import EditAccessoreis from './EditAccessories'
import EditPhone from './EditPhone'
import EditLaptop from './EditLaptop'
import EditTv from './EditTv'
import { URL } from '../../../Redux/ActionTypes'
import { notification } from '../../../Redux/Actions';
import Notification from '../../Cards/Notification'
import { Notifications } from '../../../Models/Models'
import {NOTIFICATION_TYPES} from '../../../Redux/ActionTypes'



const Detailed = () => {
  const [notify,setnotify] = useState(false);
  const [imageshown, setimageshown] = useState<string>();
  const location = useLocation();
  const loc = location.pathname;
  const path=loc.split("/")[2];
  const [post,setpost] = useState<any>();
  const checker = path.split("");
  const catagorygetter = (checker[0] + checker[1] + checker[2]);
  const dispatch = useDispatch();
  const allitems = useSelector((state:any) => state.allitems.allitems);
  function deleteitem(){
    const submittedform:any= {
      ID:path
  }
  const axiosjson = (JSON.stringify(submittedform,null,2));
    axios.post(URL + "/deleteitems.php", axiosjson).then((response) => {
      console.log(response.data);
      if (response.data.message === "deleted successfully"){
        const message:Notifications = {
            message:"Deleted Successfully",
            color:NOTIFICATION_TYPES.SUCCESS,
        }
        dispatch(notification(message));
        setnotify(true);
    }
    else if(response.data.message === "detete failed"){
        const message:Notifications = {
            message:"Delete Failed",
            color:NOTIFICATION_TYPES.ERROR,
        }
        dispatch(notification(message));
        setnotify(true);
    }
    })
  }
  useEffect(() => {
    console.log(path);
    axios.get(URL + `/read_single.php?id=${path}`).then((response) => {
      setpost(response.data);
      console.log(response.data);
      setimageshown(response.data.images[0]);
    })
    if(allitems.length === 0){
      axios.get( URL + "/read.php").then((response) => {
          dispatch(addall(response.data.data));     
          if(response.data.data === "no posts found"){
          }
      });
    }

  }, []);
  if(!post) return null;
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div>
      { notify? ( <div><Notification setnotify={setnotify}/></div> ) : ( <div></div> ) }
      <div className='shadow border-b-2 border-gray-400 mx-4 md:mx-16 mt-8 mt-10'>
          <h1 className='text-md'>{post.name}</h1>
        </div>
        <div className='ml-8 h-24'>
          <div className='flex flex-row flex-wrap mt-4'>
            {
              post.images.map((items:string) => (
                <div key={items} className='hover:border-b-2 mx-4' onClick={()=> setimageshown(items)}>
                  <img className='h-20 rounded-md p-2' src={"http://localhost/blacknebecom/api/post/photos/" + items} alt=''/>
                </div>  
              ))
            }
          </div>
        </div>
      <div className='flex flex-wrap justify-start  pt-8'>
        <div className='w-[32rem] ml-20 '>
          <div className=''>
            <img className='h-96 shadow rounded-md' src={"http://localhost/blacknebecom/api/post/photos/" + imageshown} alt=''/>
          </div>
        </div>
        <div className='flex flex-row'>
          <div>
            {(()=>{
                if(post.catagory === "accessories"){
                    return(
                      <div className='ml-8'>
                        <EditAccessoreis post={post} />
                      </div>
                    )
                }
                else if(post.catagory === "laptop"){
                    return(
                      <div>
                        <EditLaptop post={post} />
                      </div>
                      )
                }
                else if(post.catagory === "tv"){
                  return(
                    <div className='ml-8'>
                        <EditTv post={post} />
                      </div>
                  )
              }
              else if(post.catagory === "phone"){
                return(
                  <div>
                    <EditPhone post={post} />
                  </div>
                  )
            }
            })()}
          </div>
          <div>
              <button onClick={deleteitem} className='my-8 ml-10 border-2 px-2 rounded-md bg-red-700 text-white'>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detailed
