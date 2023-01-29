import React,{useState, useEffect} from 'react'
import {useNavigate, Link } from 'react-router-dom';
import { addtocart, adduserautorization,removeallcart } from '../../Redux/Actions';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Iuserautorization, Notifications } from '../../Models/Models';
import { REMOVE_ALL_CART, URL } from '../../Redux/ActionTypes'; 
import { notification } from '../../Redux/Actions';
import {NOTIFICATION_TYPES} from '../../Redux/ActionTypes'
import Notification from '../Cards/Notification';
import { getCookie, setCookie } from 'typescript-cookie'


import menu from '../../Icons/menu.png';
import close from '../../Icons/close.png';
import Home from '../../Icons/home.png';
import Laptop from '../../Icons/laptop.png';
import Gaming from '../../Icons/games.png';
import Accessories from '../../Icons/accessories.png';
import Phone from '../../Icons/phone.png';
import Tv from '../../Icons/television.png';
import Contact from '../../Icons/contact.png';
import About from '../../Icons/about.png';
import Cart from '../../Icons/cart.png';
import Profile from '../../Icons/profile.png'
import Upload from '../../Icons/upload.png';
import Checked from '../../Icons/checked.png';
import { useDispatch,useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CartCards from '../Cards/CartCards';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import axios from 'axios';

interface cartedidquantityinterface{
  id:any;
  quantity:any;
  price:any;
  name:any;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Navbar = () => {
    const dispatch = useDispatch();
    const carteditems = useSelector((state:any) => state.addtocart.items);
    const userinfo = useSelector((state:any) => state.user);
    const [ notify,setnotify ] = useState(false);
    const [ bookId, setBookId] = useState();
    const [price, setprice] = useState(0);
    let prices:any = 0;
    let links:{name: string, link:any, icon:any}[] = [
        {name:"Home",link:"/",icon:<img className='h-4 mt-2.5' src={Home} alt=''/>},
        {name:"Laptops",link:"/laptops",icon:<img className='h-4 mt-2.5' src={Laptop} alt=''/>},
        {name:"Gaming",link:"/gaming",icon:<img className='h-4 mt-2.5' src={Gaming} alt=''/>},
        {name:"Accessories",link:"/accessories",icon:<img className='h-4 mt-2.5' src={Accessories} alt=''/>},
        {name:"Phone",link:"/phone",icon:<img className='h-4 mt-2.5' src={Phone} alt=''/>},
        {name:"TV",link:"/tv",icon:<img className='h-4 mt-2.5' src={Tv} alt=''/>},
        //{name:"PS",link:"/ps",icon:<img className='h-4 mt-2.5' src={Ps} alt=''/>},
        {name:"Contact",link:"/contact",icon:<img className='h-4 mt-2.5' src={Contact} alt=''/>},
        {name:"About",link:"/about",icon:<img className='h-4 mt-2.5' src={About} alt=''/>},
    ];
    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('md');
    const [opening, setOpening] = React.useState(false);
    const navigate = useNavigate();
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const userid:any = getCookie("userid");
      const url= URL +`/user_info.php?id=${userid}`;
      axios.get(url).then((response) => {
        if(response.data.message === "success"){
          const statemessage:Iuserautorization = {
              userlogged:true,
              userid:response.data.userid,
              usertype:response.data.usertype,
              firstname:response.data.firstname,
              lastname:response.data.lastname,
              username:response.data.username,
              email:response.data.email,
              phone:response.data.phone,
          }
          dispatch(adduserautorization(statemessage));
      }
      });
    }, [])

    const handleToggle = () => {
      setOpening((prevOpen) => !prevOpen);
    };

    const handleLogging = () => {
      if(userinfo.userlogged === false) {
        navigate("/signin"); 
      }
      else if(userinfo.userlogged === true){
        setCookie("userid","false",{ expires: -1 });
        const statemessage:Iuserautorization = {
          userlogged:false,
          userid:"",
          usertype:"",
          firstname:"",
          lastname:"",
          username:"",
          email:"",
          phone:"",
          
      }
      dispatch(adduserautorization(statemessage));
      navigate("/");
      window.location.reload();
      }
      setOpening(false);
    }
    const handleOrders = () => {
      if(userinfo.userlogged === false){
        const message:Notifications={
          message:"Please Login to watch your orders",
          color: NOTIFICATION_TYPES.WARNING,
        }
        dispatch(notification(message));
        setnotify(true);
      }
      else{
        navigate("/userorders");
      }
      setOpening(false);
      
    }
    const handleAccount = () => {
      if(userinfo.userlogged === false) {
        const message:Notifications={
          message:"Please Login to access your account",
          color: NOTIFICATION_TYPES.WARNING,
        }
        dispatch(notification(message));
        setnotify(true);
      }
      else{
        navigate("/userprofile");
      }
      setOpening(false);
    }
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
      return prices;
    }
    const handleCart = () => {
      handleClose();
      let totalprice = calculateitem();
      if(userinfo.userlogged === false){
        setOpens(false);
        navigate("/signin");
      }
      else{
        let itemslist = [];
        for(let i=0;i<carteditems.length;i++){
          let cartedidquantity:cartedidquantityinterface = {
            id:carteditems[i].id,
            quantity:carteditems[i].quantity,
            price:carteditems[i].price,
            name:carteditems[i].name
          }
          itemslist.push(cartedidquantity)
        }
        let axiosjson = [{"userid":userinfo.userid,"totalprice":totalprice,itemslist}];
        axios.post(URL + "//createbooking.php",axiosjson).then((response) => {
          if(response.data.message === "Item Booked"){
            setBookId(response.data.id);
            handleClickOpenSuccess();
            const message:Notifications={
              message:"Thanks For Booking!",
              color: NOTIFICATION_TYPES.SUCCESS,
            }
            dispatch(notification(message));
            setnotify(true);
          }
          else if(response.data.message === "Booking Failed"){
            const message:Notifications={
              message:"Booking Failed, please Try again!",
              color: NOTIFICATION_TYPES.ERROR,
            }
            dispatch(notification(message));
            setnotify(true);
          }
        })
      }
      const stateRemove:any={
        message:"remove all"
      }
      dispatch(removeallcart(stateRemove));
      console.log("removing")
    }

    const handleCloseing = (event: Event | React.SyntheticEvent) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }

      setOpening(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpening(false);
      } else if (event.key === 'Escape') {
        setOpening(false);
      }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(opening);
    React.useEffect(() => {
      if (prevOpen.current === true && opening === false) {
        anchorRef.current!.focus();
      }

      prevOpen.current = opening;
    }, [opening]);

      const [opens, setOpens] = React.useState(false);

      const handleClickOpen = () => {
          setOpens(true);
      };

      const handleClose = () => {
          setOpens(false);
      };

      const [openssuccess, setOpensSuccess] = React.useState(false);

      const handleClickOpenSuccess = () => {
          setOpensSuccess(true);
      };

      const handleCloseSuccess = () => {
          setOpensSuccess(false);
      };
  return (
    <>
    { notify? ( <div><Notification setnotify={setnotify}/></div> ) : ( <div></div> ) }
    <Dialog
        fullWidth
        open={opens}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cart"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ul>
              <CartCards items={carteditems} />
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button autoFocus onClick={handleCart}>Cart</Button>
        </DialogActions>
      </Dialog>

      
      <Dialog
        open={openssuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cart"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ul>
              <div className='w-96'>
                <div className='flex justify-center align-center'>
                  <div>
                    <img className='h-32' src={Checked} alt="checked icon" />
                  </div>
                </div>
                <div className='mt-4'>
                  <p>Thanks for Booking.</p>
                  <p>Booking ID:{bookId}</p> 
                  <p>User Name: { userinfo.firstname + " " + userinfo.lastname }</p>
                </div>
              </div>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseSuccess}>OK</Button>
        </DialogActions>
      </Dialog>
    <nav className='shadow-md w-full sticky top-0 left-0'>
        <div className='md:flex flex items-center justify-between bg-white py-4 md:px-10 px-7'>
            <div className='font-bold text-xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
              <Link to={'/'}>
                <p className='text-black' >E-commerce</p>
              </Link>
            </div>
            <div  onClick={()=>setOpen(!open)} className='text-xl  md:hidden'>
                {open? <img  className='h-5 mt-2'  src={close} alt=''/> : <img className='h-6 mt-2' src={menu} alt=''/>}
            </div>
            <ul className={`z-10 md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-0 transition-all duration-500 ease-in ${open ? 'top-16 ':'top-[-490px]'}`}>
                {
                    links.map((link) => (
                        <Link to={link.link}>
                            <li key={link.name} className={`md:ml-8 text-sm md:my-0 my-1`} onClick={() => setOpen(false)} >
                                <div className='flex justify-center'>
                                    {link.icon}
                                    <p className='p-2'>{link.name}</p>
                                </div>
                            </li>
                        </Link>
                    ))
                }
                <li className='md:ml-8 text-sm md:my-0 my-1' onClick={handleClickOpen}>
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={carteditems.length} color="secondary">
                        <img className='h-4 mt-3' src={Cart} alt='' ></img>
                        <p className='p-2 text-sm'>Cart</p>
                      </StyledBadge>
                    </IconButton>
                </li>
                {/* <Link to="/signin">
                    <li className={`md:ml-8 text-sm md:my-0 my-1 ${userinfo.userlogged? "hidden" : "block"}`}>
                        <div className='flex justify-center bg-purple-600 rounded-md px-2'>
                            <img className='h-4 mt-2.5' src={Cart} alt=''/>
                            <p className='p-2'>Login</p>
                        </div>
                    </li>
                </Link> */}
                <Stack direction="row" spacing={2}>
                  <div className='ml-4'>
                    
                    <Popper
                      open={opening}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom-start' ? 'left top' : 'left bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleCloseing}>
                              <MenuList
                                autoFocusItem={opening}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem onClick={handleAccount}>My account</MenuItem>
                                <MenuItem onClick={handleOrders} >Orders</MenuItem>
                                <MenuItem onClick={ handleLogging}> {userinfo.userlogged? "Logout" : "Log in"}</MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </Stack>
            </ul>
            <Button
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={open ? 'composition-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      <img className='h-6' src={Profile} alt='' />
                    </Button>
        </div>
    </nav>
    </>
  )
}

export default Navbar
