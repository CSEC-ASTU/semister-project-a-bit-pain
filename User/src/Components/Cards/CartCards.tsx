import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addquantity, removeitem } from '../../Redux/Actions';
import close from '../../Icons/close.png';
import reload from '../../Icons/reload.png';
import { URLPHOTO } from '../../Redux/ActionTypes';


const CartCards = (props:any) => {
  const carteditems = useSelector((state:any) => state.addtocart.items);
  const dispatch = useDispatch();
  const [price, setprice] = useState(0);
  let prices:any = 0;
  const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();
  const onSubmit=handleSubmit((data:any) => {
    
  });
  function calculateitem(){
    prices = 0;
    for(let i=0;i<carteditems.length;i++){
      if(carteditems[i].quantity <= 0){
        alert("There is item With Value Zero");
        return;
      }
    }
    for(let i=0;i<carteditems.length;i++){
      let valueone = carteditems[i].price;
      let valuetwo = carteditems[i].quantity;
      prices += valueone * valuetwo;
    }
    setprice(prices);
  }
  useEffect(() => {
    calculateitem();
  }, [])
  const deletefromcart = (target:any) => {
    dispatch(removeitem(target));
  }
  const onChange = (e:any) => {
    e.preventDefault();
    const onchanging = {
      id:e.target.name,
      value:e.target.value,
    }
    dispatch(addquantity(onchanging));
    if(e.target.value > 0){
      //calculateitem();
    }
    else{
      console.log("negative value");
    }
  }
  
  return carteditems.length <1 ? <div>There is no item in the Cart</div> : 
    <div className=''>
      <div className=''>
              <div className='flex flex-row border-b-2 m-2 p-2'>
                <div className='w-14'>
                  <h4>Image</h4>
                </div>
                <p className='ml-8 w-52 text-left'>Name</p>
                <p className='text-center w-28'>Price</p>
                <p className='h-8 ml-8'>Quantity</p>
              </div>
            </div>
      <div className='flex justify-around flex-wrap overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-96' >
        <form onSubmit={handleSubmit(onSubmit)}>
        {
          carteditems.map((items:any,index:number) => (
            <div className=''>
              <div className='flex flex-row border-b-2 m-2 p-2'>
                <div className='w-14'>
                  <img className='h-8' src={URLPHOTO + items.images.toLocaleLowerCase()} alt="" />
                </div>
                <p className='ml-8 w-52 text-left'>{items.name}</p>
                <p className='text-center w-28'>{items.price + " ETB"}</p>
                  <input className='w-14 h-8 ml-8 border-2' type="number" name={items.id} onChange={onChange} defaultValue={items.quantity}placeholder='1'></input>
                  <div onClick={()=>{deletefromcart(items.id)}} >
                    <img  className='h-3 ml-4 mt-2'  src={close} alt=''/>
                  </div>
              </div>
            </div>
          ))
          }
        </form>
      </div>
      <div className='mt-4 ml-2'>
        <div onClick={calculateitem} className='flex ' >
          <img className='h-4 mt-1' src={reload} alt='' />
          <button className='ml-2'>Refresh</button>
        </div>
        <p>Total Price: {price}</p>
      </div>
    </div>
  
}

export default CartCards
