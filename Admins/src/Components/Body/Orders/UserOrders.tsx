import React, {useEffect} from 'react'
import axios from 'axios';
import { URL } from '../../../Redux/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { addbooks } from '../../../Redux/Actions';


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

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
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
    try{
        let response = await axios.get(URL + "/read_all_booking.php");
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
          <h1>All orders</h1>
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
