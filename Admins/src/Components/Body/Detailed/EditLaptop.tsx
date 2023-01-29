import axios from 'axios';
import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { Ilaptop } from '../../../Models/Models'
import { URL } from '../../../Redux/ActionTypes'
import { useDispatch } from 'react-redux';
import { notification } from '../../../Redux/Actions';
import Notification from '../../Cards/Notification'
import { Notifications } from '../../../Models/Models'
import {NOTIFICATION_TYPES} from '../../../Redux/ActionTypes'

export interface laptopform {
    brand:string;
    name:string;
    ram:string;
    ramsize:string;
    display:string;
    storagessd:string;
    storagessdsize:string;
    storagehdd:string;
    storagehddsize:string;
    processor:string;
    generation:string;
    graphicscardname:string;
    graphicscardstore:string;
    graphicscardsize:string;
    battery:string;
    screensize:string;
    price:string;
    description:string;
    types:string;
    file:any;
}

const EditLaptop = (props:any) => {
    const dispatch = useDispatch();
    const [notify,setnotify] = useState(false);
    const {register, handleSubmit} = useForm<laptopform>();
    const [snackmessage, setsnackmessage] = useState("");
    const [open, setOpen] = React.useState(false);
    const formData = new FormData();        
    const onSubmit = handleSubmit((data) => {
        const submittedform:Ilaptop = {
            ID: props.post.id,
            brand:data.brand,
            name:data.name,
            ram:data.ram + data.ramsize,
            display:data.display,
            storagessd: data.storagessd + data.storagessdsize,
            storagehdd:data.storagehdd + data.storagehddsize,
            cpuprocessor:data.processor,
            cpugeneration:data.generation,
            graphicscardname: data.graphicscardname,
            graphicscardsize: data.graphicscardstore + data.graphicscardsize,
            battery: data.battery + "hour",
            screensize: data.screensize + "inch",
            price:data.price,
            description:data.description,
            types:data.types,
            isdeleted: "",
        }
        const axiosjson = (JSON.stringify(submittedform,null,2));
        axios.post(URL + "/update_laptop.php",axiosjson).then((response) => {
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
                    <h1 className='border-b-2 mx-28 mt-4'>Laptop Entry</h1>
                    <div className='mt-4'>
                        <h3 className='text-left'>Brand</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.brand} type="text" {...register('brand', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Name</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.name} type="text" {...register('name', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Ram</h3>
                        <input className='px-2 w-40 mt-2 border-b-2' defaultValue={props.post.ram} type="text" {...register('ram', {required: true})}/>
                        <select className='text-xs' {...register("ramsize", { required: true })}>
                            <option value="GB">GB</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Dispaly</h3>
                        <input className='px-2 mt-2 border-b-2' defaultValue={props.post.display} type="text" {...register('display', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Storage</h3>
                        <div className='flex flex-row'>
                            <div>
                                <input className='px-2 w-14 mt-2 border-b-2 text-sm' defaultValue={props.post.storagessd} placeholder='SSD' type="text" {...register('storagessd', {required: true})}/>
                                <select className='text-xs' {...register('storagessdsize', {required: true})}>
                                    <option value="GB">GB</option>
                                    <option value="TB">TB</option>
                                </select>
                            </div>
                            <div className='ml-4'>
                                <input className='px-2 w-12 mt-2 border-b-2 text-sm' defaultValue={props.post.storagehdd} placeholder='HDD' type="text" {...register('storagehdd', {required: true})}/>
                                <select className='text-xs ' {...register('storagehddsize', {required: true})}>
                                    <option value="GB">GB</option>
                                    <option value="TB">TB</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>CPU</h3>
                        <div className='flex flex-col'>
                            <div>
                                <input className='px-2 w-48 mt-2 border-b-2' defaultValue={props.post.cpuprocessor} placeholder='Processor' type="text" {...register('processor', {required: true})}/>
                            </div>
                            <div>
                                <input className='px-2 w-48 mt-2 border-b-2' defaultValue={props.post.cpugeneration} placeholder='Generation' type="text" {...register('generation', {required: true})}/>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left pl-2'>Graphics Card</h3>
                        <div className='flex flex-col'>
                            <div>
                                <input className='px-2 w-48 mt-2 border-b-2' defaultValue={props.post.graphicscardname} placeholder='Name' type="text" {...register('graphicscardname', {required: true})}/>
                            </div>
                            <div className='ml-4'>
                                <input className='px-2 w-40 mt-2 border-b-2' defaultValue={props.post.graphicscardsize} placeholder='Size' type="text" {...register('graphicscardstore', {required: true})}/>
                                <select className='ml-2 text-xs' {...register('graphicscardsize', {required: true})}>
                                    <option value="GB">GB</option>
                                    <option value="TB">TB</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Battery</h3>
                        <input className='px-2 w-36 mt-2 border-b-2' defaultValue={props.post.battery} type="text" {...register('battery', {required: true})}/>
                        <select className='ml-2 text-xs'>
                            <option value="hour">hour</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Screen Size</h3>
                        <input className='px-2 w-36 mt-2 border-b-2' defaultValue={props.post.screensize} type="text" {...register('screensize', {required: true})}/>
                        <select className='ml-2 text-xs'>
                            <option value="inch">inch</option>
                        </select>
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

export default EditLaptop
