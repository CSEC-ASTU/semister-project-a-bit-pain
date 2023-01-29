import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Itv } from '../../../Models/Models'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { URL } from '../../../Redux/ActionTypes'


interface tvform {
    ID:string;
    brand:string;
    name:string;
    screensize:string;
    displaytechnology:string;
    resolution:string;
    refreshrate:string;
    connectivity:string;
    price:string;
    description:string;
    types:string;
    isdeleted:string;
    file: any;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const UploadTv = () => {
    const {register, handleSubmit} = useForm<tvform>();
    const [open, setOpen] = React.useState(false);
    const [snackmessage, setsnackmessage] = useState("");
    const [serv,setserv] = useState<any>("");
    const formData = new FormData();        
    const onSubmit = handleSubmit((data) => {
        const submittedform:Itv = {
            ID:"",
            brand:data.brand,
            name:data.name,
            screensize:data.screensize,
            displaytechnology:data.displaytechnology,
            resolution:data.resolution,
            refreshrate:data.refreshrate,
            connectivity:data.connectivity,
            price:data.price,
            description:data.description,
            types:data.types,
            isdeleted:"",
        }
        const axiosjson = (JSON.stringify(submittedform,null,2));
        axios.post(URL + "/upload_tv.php",axiosjson).then((response) => {
             formData.append("ID", response.data.ID);
             formData.append("refer","tv");
             if(response.data.message === "post created"){
                formData.delete('image[]');
                for( let i=0;i<data.file.length; i++){
                    formData.append("image[]", data.file[i]);   
                }
                axios.post( URL + "/upload_file.php", formData).then(res => {
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
                    <h1 className='border-b-2 mx-28 mt-4'>Tv Entry</h1>
                    <div className='mt-4'>
                        <h3 className='text-left'>Brand</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('brand', {required: true})}/>
                    </div>
                    <div className='mt-4'>
                        <h3 className='text-left'>Name</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('name', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Screen Size</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('screensize', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Display Technology</h3>
                        <select className='ml-2 w-48 text-sm' {...register('displaytechnology', {required: true})}>
                            <option value="LCD">LCD</option>
                            <option value="OLED">OLED</option>
                            <option value="AMOLED">AMOLED</option>
                            <option value="Super AMOLED">Super AMOLED</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Resolution</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('resolution', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Refresh Rate</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('refreshrate', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Connectivity</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('connectivity', {required: true})}/>
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

export default UploadTv
