import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import Home from '../Body/Home/Home';
import Footer from '../Footer/Footer';
import Accessories from '../Body/Accessories/Accessories';
import Contact from '../Body/Contact/Contact';
import Gaming from '../Body/Gaming/Gaming';
import Laptops from '../Body/Laptops/Laptops';
import Tv from '../Body/TV/Tv';
import Phone from '../Body/Phone/Phone';
import Detailed from '../Body/Detailed/Detailed';
import Management from '../Body/Management/Management';
import UserOrders from '../Body/Orders/UserOrders';
function Mainpage() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/laptops' element={<Laptops/>}/>
        <Route path='/gaming' element={<Gaming/>}/>
        <Route path='/accessories' element={<Accessories/>}/>
        <Route path='/phone' element={<Phone/>}/>
        <Route path='/tv' element={<Tv/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/detailed/:ID' element={<Detailed/>}/>
        <Route path="/management/:ID" element={<Management/>}/>
        <Route path="/orders" element={<UserOrders/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default Mainpage;
