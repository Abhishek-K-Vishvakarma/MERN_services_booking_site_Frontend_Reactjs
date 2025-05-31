// // import { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./component/ProtectedRoute";
// import Home from "./Home";
// import Register from "./Register";
// import Login from "./Login";
// import Logout from "./Logout";
// import ForGotPassword from "./ForgotPassword";
// import New_Confirm_Password from "./new_confirm_password/New_Confirm_Password";
// import OtpVerification from "../OtpVerification";
// import GetMul from "./getusers/GetMul";
// import Update from "./getusers/Update";
// import AdminPage from "./component/AdminPage";
// import Business from "./business/Business";
// import Category from "./category/Category";
// import Subcategory from "./subcategory/Subcategory";
// import Getcategory from "./category/Getcategory";
// // import { getUser } from "./component/Logic";
// const App = () => {
// //   const [userData, setUserData] = useState(null);

// //   useEffect(() => {
// //     fetch("http://localhost:7207/api/alluser")
// //       .then((response) => response.json())
// //       .then((data) => {
// //         const user = data.find((u) => u._id);
// //         setUserData(user);
// //         console.log("Fetched User Data:", user);
// //       })
// //       .catch((error) => console.error("Error fetching data:", error));
// //   }, []);
  
// //   console.log("App :",userData);
  
// //  const user = getUser();
// //  console.log(" USER IS :",user);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<ProtectedRoute role="user"><Home /></ProtectedRoute> }/>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/forgot" element={<ForGotPassword />} />
//         <Route path="/newconpass" element={<New_Confirm_Password />} />
//         <Route path="/verify" element={<OtpVerification />} />
//         <Route path="/getdata" element={<GetMul />} />
//         <Route path="/update" element={<Update />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminPage/>
//             </ProtectedRoute>
//           }
//         />
//         <Route path="*" element={<Login/>}/>
//         <Route path="/business" element={<Business/>}/>
//         <Route path="/category" element={<Category/>}/>
//         <Route path="/subcategory" element={<Subcategory/>}/>
//         <Route path="/getCategory" element={<Getcategory/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
