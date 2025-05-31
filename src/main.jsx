import { StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Logout from './Logout';
import ForGotPassword from './ForgotPassword';
import New_Confirm_Password from './new_confirm_password/New_Confirm_Password';
import OtpVerification from '../Otpverification';
import GetMul from './getusers/GetMul';
import Update from './getusers/Update';
import AdminPage from './component/AdminPage';
import Business from './business/Business';
import Category from './category/Category';
import Subcategory from './subcategory/Subcategory';
import Getcategory from './category/Getcategory';
import { Authentication } from './Authentication';
import Usercategory from './usercategory/Usercategory';
import Subgetcategory from './subcategory/Subgetcategory';
import Usersubcategory from './usersubcategory/Usersubcategory';
import Addtocart from './addtocart/Addtocart';
import GetBusiness from './business/GetBusiness';
import UpdateBusiness from './business/UpdateBusiness';
import Service from './services/Service';
import Getservices from './services/Getservices';
import GetUserService from '../userservices/GetUserService';
import BookServices from './bookservice/BookServices';
import Appointment from './appointment/Appointment';
import GetAppointment from './appointment/GetAppointment';
import Contact from '../user/Contact';
import Cancel from './appointment/Cancel';
import Schedule from './appointment/Schedule';
import InitialPayment from '../payment/InitialPayment';
import VerifyPayment from '../payment/VerifyPayment';
import Paymentmessage from '../payment/Paymentmessage';
import ConfirmBookAppoint from './appointment/ConfirmBookAppoint';
import Refundpayment from '../payment/Refundpayment';
import Reviewinit from './review/Reviewinit';
import Reviewupdate from './review/Reviewupdate';
import WithoutLoginBookServices from '../withoutLoginBook/WithoutLoginBookServices';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <Authentication>
   <Routes>
    {/* <Route path='/' element={<ProtectedRoute role="user"><Home /></ProtectedRoute>}></Route> */}
    <Route path='/' element={<Home/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login />}></Route> 
    <Route path='/logout' element={<Logout />}></Route> 
    <Route path="/forgot" element={<ForGotPassword/>}></Route> 
    <Route path="/newconpass" element={<New_Confirm_Password />}></Route>
    <Route path="/verify" element={<OtpVerification />}></Route> 
    <Route path="/getdata" element={<GetMul/>}></Route>
    <Route path="/update" element={<Update/>}></Route>
    {/* <Route path='/admin' element={<ProtectedRoute role="admin"><AdminPage/></ProtectedRoute>}></Route> */}
    <Route path='/admin' element={<AdminPage />}></Route>
    <Route path='*' element={<Login/>}></Route>
    <Route path='/business' element={<Business/>}></Route>
    <Route path='/category' element={<Category/>}></Route>
    <Route path='/subcategory' element={<Subcategory/>}></Route>
    <Route path='/getCategory' element={<Getcategory/>}></Route>
    <Route path='/usercategory' element={<Usercategory/>}></Route>
    <Route path='/getsubcategory' element={<Subgetcategory/>}></Route>
    <Route path='/usersubcategory' element={<Usersubcategory/>}></Route>
    <Route path='/addtocart' element={<Addtocart/>}></Route>
    <Route path='/getBusiness' element={<GetBusiness/>}></Route>
    <Route path='/updateBusiness' element={<UpdateBusiness/>}></Route>
    <Route path='/service' element={<Service/>}></Route>
    <Route path='/getservice' element={<Getservices/>}></Route>
    <Route path='/getuserservice' element={<GetUserService/>}></Route>
    <Route path='/book' element={<BookServices/>}></Route>
    <Route path='/appoint' element={<Appointment/>}></Route>
    <Route path='/getappoint' element={<GetAppointment/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/cancel' element={<Cancel/>}></Route>
    <Route path='/schedule' element={<Schedule/>}></Route>
    <Route path='/initial' element={<InitialPayment/>}></Route>
    <Route path='/payment' element={<VerifyPayment/>}></Route>
    <Route path='/paymessage' element={<Paymentmessage/>}></Route>
    <Route path='/bookconfirm' element={<ConfirmBookAppoint/>}></Route>
    <Route path='/refund' element={<Refundpayment />}></Route>
    <Route path="/review" element={<Reviewinit/>}></Route>
    <Route path="/reviewup" element={<Reviewupdate />}></Route>
    <Route path="/without" element={<WithoutLoginBookServices />}></Route>
   </Routes>
   </Authentication>
   </BrowserRouter>
  </StrictMode>,
)


// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

