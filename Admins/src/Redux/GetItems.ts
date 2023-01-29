import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { addall } from './Actions'

export const Getdata = () =>{
	const dispatch = useDispatch();
	axios.get("http://localhost/blacknebecom/api/post/read.php").then((response) => {
          dispatch(addall(response.data.data));
          console.log(response.data.data);
          
          if(response.data.data === "no posts found"){
          }
      });
}
