import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import {NOTIFICATION_TYPES} from '../../../Redux/ActionTypes';
import { notification, usernames } from '../../../Redux/Actions';
import { useDispatch,useSelector } from 'react-redux'
import Notification from '../../Cards/Notification';
import { Notifications } from '../../../Models/Models';
import axios from 'axios';
import { URL } from '../../../Redux/ActionTypes';

export interface signupproperties{
    firstname:string;
    lastname:string;
    username:string;
    email:string;
    phone:string;
    password:string;
    conpassword:string;
}

const Signup = () => {
    const dispatch = useDispatch();
    const [notify,setnotify] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<signupproperties>();
    const usernameslist = useSelector((state:any) => state.usernames);
    const url= URL+`/create_account.php`;
    const urlusernames = URL + `/user_names.php`;
    useEffect(() => {
        
    }, [])
    const onSubmit = handleSubmit((data) => {
        axios.get(urlusernames).then((response) => {
            dispatch(usernames(response.data.data));
        });
        for(let i=0;i<usernameslist.length;i++){
            console.log(usernameslist[i]);
            if(data.username === usernameslist[i]){
                const message:Notifications = {
                    message:"username Is Taken!",
                    color: NOTIFICATION_TYPES.WARNING,
                  }
                  dispatch(notification(message));
                  setnotify(true);
                  return
            }
        }
        if( data.password !== data.conpassword ){
            const message:Notifications = {
                message:"Passwords Aren't Same!",
                color: NOTIFICATION_TYPES.WARNING,
              }
              dispatch(notification(message));
              setnotify(true);
        }
        else {
            const submittedform = {
                username:data.username,
                firstname:data.firstname,
                lastname:data.lastname,
                email:data.email,
                phone:data.phone,
                types:"user",
                password:data.password
            }
            const axiosjson = JSON.stringify(submittedform,null,2);
            axios.post(url,axiosjson).then((response) => {
                console.log(response.data);
                if(response.data.message === "Account created"){
                    const message:Notifications = {
                        message:"Account Created Successfully!",
                        color: NOTIFICATION_TYPES.SUCCESS,
                      }
                      dispatch(notification(message));
                      setnotify(true);
                      navigate("/signin");
                }
                else if(response.data.message === "Account not created"){
                    const message:Notifications = {
                        message:"Account Not Created!",
                        color: NOTIFICATION_TYPES.ERROR,
                      }
                      dispatch(notification(message));
                      setnotify(true);   
                }
            })
        }
    })
  return (
    <div>
        { notify? ( <div><Notification setnotify={setnotify}/></div> ) : ( <div></div> ) }
        <form onSubmit={onSubmit}>
            <div className='flex justify-center items-center'>
                <div className='flex shadow justify-center items-center flex-col border-0 rounded-xl w-96 mt-8 text-gray-700'>
                    <h1 className='border-b-2 mx-40 mt-4'>Sign Up</h1>
                    <div className='mt-4'>
                        <h3 className='text-left'>First Name</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('firstname', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Last Name</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('lastname', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>User Name</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('username', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>E-mail</h3>
                        <input className='px-2 mt-2 border-b-2' type="email" {...register('email', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Phone</h3>
                        <input className='px-2 mt-2 border-b-2' type="tel" {...register('phone', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Password</h3>
                        <input className='px-2 mt-2 border-b-2' type="password" {...register('password', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Confirm Password</h3>
                        <input className='px-2 mt-2 border-b-2' type="password" {...register('conpassword', {required: true})}/>
                    </div>
                    <div>
                        <button className='my-8 border-2 px-2 rounded-md'>Create Account</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Signup
