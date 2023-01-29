import React, {useEffect} from 'react'
import axios from 'axios';
import { URL } from '../../../Redux/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { addbooks } from '../../../Redux/Actions';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button, {ButtonProps} from '@mui/material/Button'
import { purple, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import {createTheme } from '@mui/system';




import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
    BID: string,
    date: number,
    totalPrice: number,
    userid:any,
    itemslist:any
  ) {
    return {
      BID,
      date,
      totalPrice,
      userid,
      history: itemslist
    };
  }

  const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
  ];
  
  const ITEM_HEIGHT = 48;
  const theme = createTheme({
    palette: {
      background: {
        paper: '#fff',
      },
      text: {
        primary: '#173A5E',
        secondary: '#46505A',
      },
      action: {
        active: '#001E3C',
      },
      success: {
        dark: '#009688',
      },
    },
  });

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openan = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.BID}
          </TableCell>
          <TableCell align="right">{row.date}</TableCell>
          <TableCell align="right">{row.totalPrice}</TableCell>
      <div>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={openan}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 300,
              width: '40ch',
            },
          }}
        >
          <div className='p-4'>
            user { row.BID } will be deleted. Do you want to proceed?
            <div className='flex justify-around'>
              <Button variant="outlined" sx={{ color: 'black', backgroundColor: 'white', borderColor: 'green' }}>Cancel</Button>
              <Button variant="contained" sx={{ color: 'white', backgroundColor: 'green', borderColor: 'green' }}>Proceed</Button>
            </div>
          </div>
        </Menu>
      </div>
      
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Detailed
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>CustomerID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Booking ID</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((itemsRow:any) => (
                      <TableRow key={itemsRow.ID}>
                        <TableCell component="th" scope="row">{row.date}</TableCell>
                        <TableCell>{row.userid}</TableCell>
                        <TableCell align="right">{itemsRow.name}</TableCell>
                        <TableCell align="right">{row.BID}</TableCell>
                        <TableCell align="right">{itemsRow.quantity}</TableCell>
                        <TableCell align="right">{itemsRow.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  


const UserOrders = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const userinfo = useSelector((state:any) => state.user);
  const booked = useSelector((state:any) => state.books);
  async function getbookeddata(){
    const sendjson = JSON.stringify(
        {
            userid : userinfo.userid
        }
    );
    try{
        let response = await axios.post(URL + "/read_booking.php", sendjson);
        if(response.data.data !== "no posts found"){
            dispatch(addbooks(response.data.data));
        }
        console.log(response.data.data);
    }
    catch(error){
        console.log(error);
    }
}
    useEffect(() => {
        getbookeddata();
    }, [])

  return (
    booked.length === 0 ? <div>You have not ordered any items</div> :
    <div className=' '>
        <div className='shadow border-b-2 border-gray-400 mx-4 md:mx-16 mt-8'>
          <h1>Your Orders List</h1>
        </div>
        <div className='mt-8 mx-4 md:mx-16'>
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Booking ID</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {booked[0].reverse().map((row:any) => (
                    <Row key={row.BID} row={createData(row.BID, row.date, row.totalprice,row.userid,row.itemslist)} />
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default UserOrders
