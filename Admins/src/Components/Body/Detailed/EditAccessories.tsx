import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Iaccessories } from '../../../Models/Models'
import { URL } from '../../../Redux/ActionTypes';
import { useDispatch } from 'react-redux';
import { notification } from '../../../Redux/Actions';
import Notification from '../../Cards/Notification'
import { Notifications } from '../../../Models/Models'
import {NOTIFICATION_TYPES} from '../../../Redux/ActionTypes'

interface accessoriesform{
    ID:string;
    brand:string;
    name:string;
    price:string;
    description:string;
    types:string;
    isdeleted:string;
}
const EditAccessoreis = (props:any) => {
    const dispatch = useDispatch();
    const [notify,setnotify] = useState(false);
    const {register, handleSubmit} = useForm<accessoriesform>();
    const [open, setOpen] = React.useState(false);
    const formData = new FormData();        
    const onSubmit = handleSubmit((data) => {
        const submittedform:Iaccessories = {
            ID:props.post.id,
            brand:data.brand,
            name:data.name,
            price:data.price,
            description:data.description,
            types:data.types,
            isdeleted:"false"
        }
        const axiosjson = (JSON.stringify(submittedform,null,2));
        axios.post(URL + "/update_accessories.php",axiosjson).then((response) => {
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
    <div className=''>
                { notify? ( <div><Notification setnotify={setnotify}/></div> ) : ( <div></div> ) }
        <form onSubmit={onSubmit}>
            <div className='flex justify-center items-center '>
                <div className='flex shadow justify-center items-center flex-col border-0 rounded-xl ml-8 text-gray-700'>
                    <h1 className='border-b-2 mx-28 mt-4'>Accessories Entry</h1>
                    <div className='mt-4'>
                        <h3 className='text-left'>Brand</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.brand} type="text" {...register('brand', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Name</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.name} type="text" {...register('name', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Price</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.price} type="text" {...register('price', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Description</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.description} type="text" {...register('description', {required: true})}/>
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

export default EditAccessoreis