import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Iphone } from '../../../Models/Models'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { URL } from '../../../Redux/ActionTypes'

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
    file: any;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const UploadPhone = () => {
    const {register, handleSubmit} = useForm<phoneform>();
    const [open, setOpen] = React.useState(false);
    const [snackmessage, setsnackmessage] = useState("");
    const [serv,setserv] = useState<any>("");
    const formData = new FormData();        
    const onSubmit = handleSubmit((data) => {
        const submittedform:Iphone = {
            ID:"",
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
        axios.post( URL+"/upload_phone.php",axiosjson).then((response) => {
             formData.append("ID", response.data.ID);
             formData.append("refer","phone");
             if(response.data.message === "post created"){
                formData.delete('image[]');
                for( let i=0;i<data.file.length; i++){
                    formData.append("image[]", data.file[i]);   
                }
                axios.post(URL +"/upload_file.php", formData).then(res => {
                        console.log(res.data);
                        if(res.data.status === true){
                            setsnackmessage("Item Uploaded Successfully");
                            setserv("success");
                            handleClick();
                        }
                        else{
                            setsnackmessage("Item Upload Failed");
                            setserv("error");
                            handleClick();
                        }
                    })
             }
          });
    });
    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
  return (
    <div>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
                </Alert>
            </Snackbar>
        </Stack>
        <form onSubmit={onSubmit}>
            <div className='flex justify-center items-center'>
                <div className='flex shadow justify-center items-center flex-col border-0 rounded-xl w-96 mt-8 text-gray-700'>
                    <h1 className='border-b-2 mx-28 mt-4'>Phone Entry</h1>
                    <div className='mt-4'>
                        <h3 className='text-left'>Brand</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('brand', {required: true})}/>
                    </div>
                    <div className='mt-4'>
                        <h3 className='text-left'>Name</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('name', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Ram</h3>
                        <input className='px-2 w-40 mt-2 border-b-2' type="text" {...register('ram', {required: true})}/>
                        <select className='text-xs' {...register('ramsize', {required: true})}>
                            <option value="GB">GB</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Storage</h3>
                        <input className='px-2 w-40 mt-2 border-b-2' type="text" {...register('storage', {required: true})}/>
                        <select className='text-xs' {...register('storagesize', {required: true})}>
                            <option value="GB">GB</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Color</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('color', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Screen Size</h3>
                        <input className='px-2 w-40 mt-2 border-b-2' type="text" {...register('screen', {required: true})}/>
                        <select className='text-xs' {...register('screensize', {required: true})}>
                            <option value="inch">Inch</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left pl-2'>Camera</h3>
                        <div className='flex flex-col'>
                            <div  className='ml-2'>
                                <input className='px-2 w-40 mt-2 border-b-2' placeholder='Front' type="text" {...register('camerafront', {required: true})}/>
                                <select className='ml-2 text-xs' {...register('camerafrontsize', {required: true})}>
                                    <option value="MP">MP</option>
                                </select>
                            </div>
                            <div className='ml-2'>
                                <input className='px-2 w-40 mt-2 border-b-2' placeholder='Back' type="text" {...register('cameraback', {required: true})}/>
                                <select className='ml-2 text-xs' {...register('camerabacksize', {required: true})}>
                                    <option value="MP">MP</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Photos</h3>
                        <input className='px-2 mt-2 border-b-2 w-52'  type="file" {...register('file', {required: true})} multiple />
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Price</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('price', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Description</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('description', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Types</h3>
                        <select className='ml-2 w-48 text-sm' {...register('types', {required: true})}>
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

export default UploadPhone
