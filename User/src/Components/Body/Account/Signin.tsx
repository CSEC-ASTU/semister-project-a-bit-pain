import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';
import { getCookie, setCookie } from 'typescript-cookie';
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux';
import { Iuserautorization } from '../../../Models/Models'
import { adduserautorization } from '../../../Redux/Actions'
import { notification } from '../../../Redux/Actions';
import Notification from '../../Cards/Notification'
import { Notifications } from '../../../Models/Models'
import {NOTIFICATION_TYPES} from '../../../Redux/ActionTypes'
import { URL } from '../../../Redux/ActionTypes';

interface loginprofile {
    username:string;
    password:string;
}

const Signin = () => {
    const {register, handleSubmit} = useForm<loginprofile>();
    const dispatch = useDispatch();
    const [post,setpost] = useState<any[]>([]);
    const navigate = useNavigate();
    const [notify, setnotify] = useState(false);
    const url= URL + "/read_user.php";
    const onSubmit = handleSubmit((data:loginprofile) => {
        axios.post(url,{username:data.username, password:data.password}).then((response) => {
            setpost(response.data);
            console.log(response.data);
            if(response.data.message === "success"){
                const statemessage:Iuserautorization = {
                    userlogged:true,
                    userid:response.data.userid,
                    usertype:response.data.usertype,
                    firstname:response.data.firstname,
                    lastname:response.data.lastname,
                    username:response.data.username,
                    email:response.data.email,
                    phone:response.data.phone,
                }
                setCookie("userid", response.data.userid,{ expires: 1/144 })
                dispatch(adduserautorization(statemessage));
                navigate("/");
            }
            else if( response.data.message === "error" ){
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
        <form onSubmit={onSubmit}>
            <div className='flex justify-center items-center'>
                <div className='flex shadow justify-center items-center flex-col border-0 rounded-xl h-80 w-96 mt-8'>
                    <h1 className='border-b-2 mx-40 mt-4'>Log in</h1>
                    <div className='mt-4'>
                        <h3 className='text-left'>User name</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('username', {required: true})}/>
                    </div>
                    <div className='mt-4'>
                        <h3 className='text-left'>Password</h3>
                        <input className='px-2 mt-2 border-b-2' type="password" {...register('password',{required: true})}/>
                    </div>
                    <div>
                        <button type='submit' className='mt-2 border-2 px-2 rounded-md'>Login</button>
                    </div>
                    <div className='border-b-2 m-2'></div>
                    <div>
                        <Link to="/signup">
                            <p>Don't have an account?</p>
                        </Link>
                        <p>forget password!</p>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Signin
