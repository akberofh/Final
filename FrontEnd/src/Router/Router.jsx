import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Profile from '../Pages/Profile/Profile'
import PrivateRoute from './PrivateRoute'
import Register from '../Pages/Register/Register'
import AboutCard from '../Pages/About/AboutCard'
import ContactUsCompliment from './ContactUs/ContactUsCompliment'
import BmwCatagory from '../Catagory/BmwCatagory'
import ChevroletCatagory from '../Catagory/ChevroletCatagory'
import LadaCatagory from '../Catagory/LadaCatagory'
import NissanCatagory from '../Catagory/NissanCatagory'
import ToyotaCatagory from '../Catagory/ToyotaCatagory'
import MercedesCatagory from '../Catagory/MercedesCatagory'
import Detailpage from '../Components/CarProductCard/DetalPages.jsx/Detailpage'
import Basket from '../Pages/Basket/Basket'
import Payment from '../Pages/Basket/Payment'
import AdminHome from '../Pages/Register/Adminhome'
import CardWish from '../Pages/Wishlist/CardWish'
import Comment from '../Comment/Comment'


const Router = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={< Home/>} />
    <Route path="/login" element={<Login />} />
   
        <Route path="/register" element={<Register />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/basket/payment" element={<Payment />} />
        <Route path="/product/:note_id" element={<Detailpage />} />
       
        <Route path="/admin" element={<AdminHome/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="" element={<PrivateRoute/>}  />
          <Route path="/about" element={<AboutCard/>} /> 
          <Route path='/contact' element={<ContactUsCompliment/>} />
          <Route path='/bmw' element={<BmwCatagory/>} />
          <Route path='/chevrolet' element={<ChevroletCatagory/>} />
          <Route path='/lada' element={<LadaCatagory/>} />
          <Route path='/nissan' element={<NissanCatagory/>} />
          <Route path='/toyota' element={<ToyotaCatagory/>} />
          <Route path='/mercedes' element={<MercedesCatagory/>} />
          <Route path='/carwis' element={<CardWish/>} />
          <Route path='/comment' element={<Comment/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default Router