import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Iphone } from '../../../Models/Models'
import { URL } from '../../../Redux/ActionTypes'
import { useDispatch } from 'react-redux';
import { notification } from '../../../Redux/Actions';
import Notification from '../../Cards/Notification'
import { Notifications } from '../../../Models/Models'
import {NOTIFICATION_TYPES} from '../../../Redux/ActionTypes'
interface phoneform {
    brand:string;
    name:string;
    ram:string;
    ramsize:string;
    storage:string;
    storagesize:string;
    color:string;
    camerafront:string;
    camerafrontsize:string;
    cameraback:string;
    camerabacksize:string;
    screen:string;
    screensize:string;
    price:string;
    description:string;
    types:string;
}
const EditPhone = (props:any) => {
    const dispatch = useDispatch();
    const [notify,setnotify] = useState(false);
    const {register, handleSubmit} = useForm<phoneform>();
    const [open, setOpen] = React.useState(false);
    const formData = new FormData();        
    const onSubmit = handleSubmit((data) => {
        const submittedform:Iphone = {
            ID:props.post.id,
            brand:data.brand,
            name:data.name,
            ram:data.ram + data.ramsize,
            storage:data.storage + data.storagesize,
            color:data.color,
            screensize:data.screen + data.screensize,
            camerafront:data.camerafront + data.camerafrontsize,
            cameraback:data.cameraback + data.camerabacksize,
            price:data.price,
            description:data.description,
            types:data.types,
            isdeleted:"",
        }
        const axiosjson = (JSON.stringify(submittedform,null,2));
        axios.post(URL + "/update_phone.php",axiosjson).then((response) => {
            console.log(response.data);
            if (response.data.message === "updated successfully"){
                const message:Notifications = {
                    message:"Updated Successfully",
                    color:NOTIFICATION_TYPES.SUCCESS,
                }
                dispatch(notification(message));
                setnotify(true);
            }
            else if(response.data.message === "update failed"){
                const message:Notifications = {
                    message:"Update Failed",
                    color:NOTIFICATION_TYPES.ERROR,
                }
                dispatch(notification(message));
                setnotify(true);
            }
        })
    });
  return (
    <div>
        { notify? ( <div><Notification setnotify={setnotify}/></div> ) : ( <div></div> ) }
        <form onSubmit={onSubmit}>
            <div className='flex justify-center items-center'>
                <div className='flex shadow justify-center items-center flex-col border-0 rounded-xl ml-8 text-gray-700'>
                    <h1 className='border-b-2 mx-28 mt-4'>Phone Entry</h1>
                    <div className='mt-4'>
                        <h3 className='text-left'>Brand</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.brand} type="text" {...register('brand', {required: true})}/>
                    </div>
                    <div className='mt-4'>
                        <h3 className='text-left'>Name</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.name} type="text" {...register('name', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Ram</h3>
                        <input className='px-2 w-40 mt-2 border-b-2' defaultValue={props.post.ram} type="text" {...register('ram', {required: true})}/>
                        <select className='text-xs' {...register('ramsize', {required: true})}>
                            <option value="GB">GB</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Storage</h3>
                        <input className='px-2 w-40 mt-2 border-b-2' defaultValue={props.post.storage} type="text" {...register('storage', {required: true})}/>
                        <select className='text-xs' {...register('storagesize', {required: true})}>
                            <option value="GB">GB</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Color</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.color} type="text" {...register('color', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Screen Size</h3>
                        <input className='px-2 w-40 mt-2 border-b-2' defaultValue={props.post.screensize} type="text" {...register('screen', {required: true})}/>
                        <select className='text-xs' {...register('screensize', {required: true})}>
                            <option value="inch">Inch</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left pl-2'>Camera</h3>
                        <div className='flex flex-col'>
                            <div  className='ml-2'>
                                <input className='px-2 w-40 mt-2 border-b-2' defaultValue={props.post.camerafront} placeholder='Front' type="text" {...register('camerafront', {required: true})}/>
                                <select className='ml-2 text-xs' {...register('camerafrontsize', {required: true})}>
                                    <option value="MP">MP</option>
                                </select>
                            </div>
                            <div className='ml-2'>
                                <input className='px-2 w-40 mt-2 border-b-2' defaultValue={props.post.cameraback} placeholder='Back' type="text" {...register('cameraback', {required: true})}/>
                                <select className='ml-2 text-xs' {...register('camerabacksize', {required: true})}>
                                    <option value="MP">MP</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Price</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" defaultValue={props.post.price} {...register('price', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Description</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" defaultValue={props.post.description} {...register('description', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Types</h3>
                        <select className='ml-2 w-48 text-sm' defaultValue={props.post.types} {...register('types', {required: true})}>
                            <option value="gaming">Gaming</option>
                            <option value="normal">Normal</option>
                        </select>
                    </div>
                    <div>
                        <button className='my-8 border-2 px-2 rounded-md'>Upload</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditPhone
