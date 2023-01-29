import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UploadLaptop from '../Upload pages/UploadLaptop'
import UploadPhone from '../Upload pages/UploadPhone'
import UploadTv from '../Upload pages/UploadTv'
import UploadAccessories from '../Upload pages/UploadAccessories'
const Management = () => {
    const [currentcomponent, setcurrentcomponent] = useState<any>(<UploadLaptop/>);
    const [currentname,setcurrentname] = useState<String>("laptop");
    const navigation = useNavigate();
    const location = useLocation();
    const components:{name:string,component:any}[] = [
        {name:"Laptops",component:<UploadLaptop/>},
        {name:"Phones",component:<UploadPhone/>},
        {name:"Tv",component:<UploadTv/>},
        {name:"Accessories",component:<UploadAccessories/>},
    ]
    useEffect(() => {
        const loc=location.pathname
        const path=loc.split("/")[2]
        if(path === "uploadlaptop"){
            setcurrentname("Laptops");
        }
        else if(path === "uploadphone"){
            setcurrentname("Phones");
        }
        else if(path === "uploadtv"){
            setcurrentname("Tv");
        }
        else if(path === "uploadaccessories"){
            setcurrentname("Accessories");
        }
    },[location]);
    useEffect(() => {
        if(currentname === "Laptops"){
            navigation(`/management/uploadlaptop`);
            setcurrentcomponent(<UploadLaptop/>);
        }
        else if(currentname === "Phones"){
            navigation(`/management/uploadphone`);
            setcurrentcomponent(<UploadPhone/>);
        }
        else if(currentname === "Tv"){
            navigation(`/management/uploadtv`);
            setcurrentcomponent(<UploadTv/>);
        }
        else if(currentname === "Accessories"){
            navigation(`/management/uploadaccessories`);
            setcurrentcomponent(<UploadAccessories/>);
        }
    }, [currentname]);
  return (
    <div>
        <div className='mx-96 mt-4 h-4'>
            <ul className='flex flex-row justify-between'>
                {
                    components.map((items) => (
                        <li className={`${currentname === items.name? "border-b-2 border-gray-700 rounded-sm" : "border-0"} hover:border-b-2`}>
                            <p onClick={()=>setcurrentname(items.name)}>{items.name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div>
            {currentcomponent}
        </div>
    </div>
  )
}

export default Management
