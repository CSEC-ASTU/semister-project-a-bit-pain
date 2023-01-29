import axios from 'axios';
import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { Ilaptop } from '../../../Models/Models'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { URL } from '../../../Redux/ActionTypes'


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
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const UploadLaptop = () => {
    const {register, handleSubmit} = useForm<laptopform>();
    const [open, setOpen] = React.useState(false);
    const [snackmessage, setsnackmessage] = useState("");
    const [serv,setserv] = useState<any>("");
    const formData = new FormData();        
    const onSubmit = handleSubmit((data) => {
        const submittedform:Ilaptop = {
            ID: "",
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
        alert(axiosjson);
        axios.post( URL + "/upload_laptop.php",axiosjson).then((response) => {             formData.append("ID", response.data.ID);
             formData.append("refer","laptop");
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
                    <h1 className='border-b-2 mx-28 mt-4'>Laptop Entry</h1>
                    <div className='mt-4'>
                        <h3 className='text-left'>Brand</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('brand', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Name</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('name', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Ram</h3>
                        <input className='px-2 w-40 mt-2 border-b-2' type="text" {...register('ram', {required: true})}/>
                        <select className='text-xs' {...register("ramsize", { required: true })}>
                            <option value="GB">GB</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Dispaly</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('display', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Storage</h3>
                        <div className='flex flex-row'>
                            <div>
                                <input className='px-2 w-14 mt-2 border-b-2 text-sm' placeholder='SSD' type="text" {...register('storagessd', {required: true})}/>
                                <select className='text-xs' {...register('storagessdsize', {required: true})}>
                                    <option value="GB">GB</option>
                                    <option value="TB">TB</option>
                                </select>
                            </div>
                            <div className='ml-4'>
                                <input className='px-2 w-12 mt-2 border-b-2 text-sm' placeholder='HDD' type="text" {...register('storagehdd', {required: true})}/>
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
                                <input className='px-2 w-48 mt-2 border-b-2' placeholder='Processor' type="text" {...register('processor', {required: true})}/>
                            </div>
                            <div>
                                <input className='px-2 w-48 mt-2 border-b-2' placeholder='Generation' type="text" {...register('generation', {required: true})}/>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left pl-2'>Graphics Card</h3>
                        <div className='flex flex-col'>
                            <div>
                                <input className='px-2 w-48 mt-2 border-b-2' placeholder='Name' type="text" {...register('graphicscardname', {required: true})}/>
                            </div>
                            <div className='ml-4'>
                                <input className='px-2 w-40 mt-2 border-b-2' placeholder='Size' type="text" {...register('graphicscardstore', {required: true})}/>
                                <select className='ml-2 text-xs' {...register('graphicscardsize', {required: true})}>
                                    <option value="GB">GB</option>
                                    <option value="TB">TB</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Battery</h3>
                        <input className='px-2 w-36 mt-2 border-b-2' type="text" {...register('battery', {required: true})}/>
                        <select className='ml-2 text-xs'>
                            <option value="hour">hour</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Screen Size</h3>
                        <input className='px-2 w-36 mt-2 border-b-2' type="text" {...register('screensize', {required: true})}/>
                        <select className='ml-2 text-xs'>
                            <option value="inch">inch</option>
                        </select>
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

export default UploadLaptop
