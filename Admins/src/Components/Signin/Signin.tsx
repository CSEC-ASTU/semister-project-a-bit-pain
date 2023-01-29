import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { getCookie, setCookie } from 'typescript-cookie'
import { useForm } from 'react-hook-form'
import Logo from '../../Icons/Logo.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from '../../Redux/Actions';
import Notification from '../Cards/Notification'
import { Notifications } from '../../Models/Models'
import {NOTIFICATION_TYPES} from '../../Redux/ActionTypes'
import { URL } from '../../Redux/ActionTypes'


interface loginprofile {
    username:string;
    password:string;
}

const Signin = ({setlog}:any) => {
    const [notify,setnotify] = useState(false);
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm<loginprofile>();
    const [severity, setservity] = useState<any>();
    const [snackmessage,setsnackmessage] = useState<string>();
    const [post,setpost] = useState<any[]>([]);
    const [auth,setauth] =useState(false);
    const url= URL + "/read_user.php";
    const readcookie = () =>{
        // setauth(Cookies.get("user"));
      }
    useEffect(() => {
        readcookie();
    },[readcookie]);
    
    const onSubmit = handleSubmit((data:loginprofile) => {
        axios.post(url,{username:data.username, password:data.password}).then((response) => {
            setpost(response.data);
            console.log(response.data);
            if(response.data.message === "success"){
                setCookie("user", "true",{ expires: 1/144 })
                setlog(true);
            }
            else{
                console.log(notify);
                const message:Notifications = {
                    message:"Login failed",
                    color:NOTIFICATION_TYPES.ERROR,
                }
                dispatch(notification(message));
                setnotify(true);
            }
         });
    })
    
  return (
    <div>
        { notify? ( <div><Notification setnotify={setnotify}/></div> ) : ( <div></div> ) }
        <div className='shadow  flex items-center justify-center'>
          <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
              <img className='h-20' src={Logo} alt='' />
              <p className='text-black' >Blackneb</p>
              <img className='h-20' src={Logo} alt='' />
          </div>
      </div>
      {(()=>{
                    if(getCookie("user")){
                      setlog(true);
                    }
                    else{
                        return(
                            <form className='flex justify-center items-center mt-20' onSubmit={onSubmit}>
                            <div className='' >
                                <div className='flex shadow shadow-gray-500 justify-center items-center flex-col border-0 rounded-xl h-80 w-72 md:w-96 mt-8'>
                                    <h1 className='border-b-2 mx-28 mt-4'>Log in</h1>
                                    <div className='mt-4'>
                                        <h3 className='text-left'>User name</h3>
                                        <input className='px-2 mt-2 border-b-2' type="text" {...register('username', {required: true})}/>
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='text-left'>Password</h3>
                                        <input className='px-2 mt-2 border-b-2' type="password" {...register('password',{required: true})}/>
                                    </div>
                                    <div>
                                        <button type='submit' className='mt-2 w-48 border-2 px-2 rounded-md'>Login</button>
                                    </div>
                                    <div className='border-b-2 m-2'></div>
                                    <div>
                                        <p>forget password!</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                        )
                    }
                })()}
      
    </div>
  )
}

export default Signin