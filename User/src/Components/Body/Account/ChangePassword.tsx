import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {NOTIFICATION_TYPES} from '../../../Redux/ActionTypes';
import { notification } from '../../../Redux/Actions';
import { useDispatch } from 'react-redux'
import Notification from '../../Cards/Notification';
import { Notifications } from '../../../Models/Models';
import { URL } from '../../../Redux/ActionTypes';

interface passwordhandler {
    oldpassword:string;
    newpassword:string;
    connewpassword:string;
}
interface datasend{
    oldpassword:string;
    newpassword:string;
    userid:any;
}
const ChangePassword = () => {
    const {register, handleSubmit} = useForm<passwordhandler>();
    const userinfo = useSelector((state:any) => state.user);
    const dispatch = useDispatch();
    const [notify,setnotify] = useState(false);
    const url= URL+`/change_password.php`;
    const onSubmit = handleSubmit((data) => {
        if(data.newpassword !== data.connewpassword){
            const message:Notifications = {
                message:"Passwords Aren't Same!",
                color: NOTIFICATION_TYPES.WARNING,
              }
              dispatch(notification(message));
              setnotify(true);
        }
        else{
            const sendmessage:datasend={
                oldpassword:data.oldpassword,
                newpassword:data.newpassword,
                userid:userinfo.userid
            }
            const axiosjson = (JSON.stringify(sendmessage,null,2));
            axios.post(url,axiosjson).then((response) => {
                console.log(response.data)
                if(response.data.message === "success"){
                    const message:Notifications = {
                      message:"Password Changed Successfully!",
                      color: NOTIFICATION_TYPES.SUCCESS,
                    }
                    dispatch(notification(message));
                    setnotify(true);
                  }
                  else if(response.data.message === "old password mismatch"){
                    const message:Notifications = {
                      message:"Old Password Isn't Correct!",
                      color: NOTIFICATION_TYPES.WARNING,
                    }
                    dispatch(notification(message));
                    setnotify(true);
                  }
            });
        }
    })
  return (
    <div>
        { notify? ( <div><Notification setnotify={setnotify}/></div> ) : ( <div></div> ) }
        <div className='shadow border-b-2 border-gray-400 mx-4 md:mx-16 mt-8'>
          <h1>Change Password</h1>
        </div>
        <form onSubmit={onSubmit}>
        <div className='flex justify-center items-center'>
            <div className='flex shadow justify-center items-center flex-col border-0 rounded-xl w-96 mt-8 text-gray-700'>
                <div className='mt-4'>
                    <h3 className='text-left'>Old Password</h3>
                    <input className='px-2 mt-2 border-b-2' type="password"{...register('oldpassword', {required: true})}/>
                </div>
                <div className='mt-2'>
                    <h3 className='text-left'>New Password</h3>
                    <input className='px-2 mt-2 border-b-2' type="password" {...register('newpassword', {required: true})}/>
                </div>
                <div className='mt-2'>
                    <h3 className='text-left'>Confirm New Password</h3>
                    <input className='px-2 mt-2 border-b-2' type="password" {...register('connewpassword', {required: true})}/>
                </div>
                <div>
                    <button className='my-8 border-2 px-2 rounded-md'>Change</button>
                </div>
            </div>
        </div>
    </form>
    </div>
  )
}

export default ChangePassword
