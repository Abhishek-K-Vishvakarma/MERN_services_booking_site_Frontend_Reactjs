// import { useRef, useState} from "react"
// import { useNavigate } from 'react-router';
// import { useAuth } from "./Authentication";
// import { ToastContainer, toast } from "react-toastify";
// import { logins } from "./component/Logic";
// import {Spinner} from 'react-bootstrap';
// const Login = () => {
//   const em = useRef();
//   const pass = useRef();
//   const navigate = useNavigate();
//   const [msg, setMsg] = useState('');
//   const [success, setSuccess] = useState('');
//   const {user,login} = useAuth();
//   const handleLogin = async(e)=>{
//    e.preventDefault();
//     const obj = {
//       email : em.current.value,
//       password : pass.current.value
//     }

//     if(user !== em.current.value){
//       alert("Email does not matched!");
//       return;
//     }

//     const users = logins(obj.email, obj.password);
//     if (users) {
//       setTimeout(()=>{
//         navigate(users.role === "admin" ? "/admin" : "/user");
//       }, 3000);
//     } else {
//       alert("Invalid credentials");
//     }

//     if(!em.current.value && !pass.current.value){
//        toast.error('Please fill all field!');
//        return;
//     }

//     try{
//       const response = await fetch('http://localhost:7207/api/login',{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(obj)
//       })

//       const data = await response.json();
//       const token = data.data.token;
//       const send = data.data.email;
//       console.log("Data login: ",send);
//       if(!response.ok){
//         setMsg(data.message); 
//         setTimeout(()=>{
//          setMsg("");
//         }, 3000)
//       }else{
//         toast.success(data.message);
//         setSuccess(data.message);
//         login(send, token);
//         setTimeout(()=>{
//           navigate('/');
//         }, 3000);
//       }
//       console.log("Response :",response)
//       console.log("Data :", data.message);
//       console.log("Stringify :", JSON.stringify(data));
//     }catch(err){
//       console.error('Server Error :', err);
//     }

//   }
// console.log("User :",user)
//   return (
//     <div>
//       <form onSubmit={handleLogin} className="card" style={{width: '30rem', margin: 'auto', padding: '20px', marginTop: '13rem'}}>
//         {/* <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>{msg1}</p> */}
//         <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{msg}</p>
//         <p style={{ color: 'lime', fontWeight: 'bold', textAlign: 'center'}}>{success}</p>
//         <p style={{color: 'white', fontWeight: 'bold', backgroundColor: 'red', textAlign: 'center'}}>Login Page</p> <br/>
//         <input type="text" ref={em} style={{ width: '21rem', fontSize: '20px', margin: 'auto' }} placeholder="Enter Mail" className="form-control" />
//         <br/>
//         <br/>
//         <input type="password" ref={pass} style={{ width: '21rem', fontSize: '20px', margin: 'auto' }} placeholder="Enter Password" className="form-control"/>
//         <br/>
//         <br />
//         {!success ? <button type="submit" style={{color: 'white', backgroundColor: 'navy', fontSize: '20px', padding: '4px 50px', width: '10rem', border: 'none'}}>Login</button>
//          : <Spinner style={{marginLeft : '12em'}}></Spinner> 
//         }
//         <br/>
//       </form>
//       <ToastContainer/>
//     </div>
//   )
// }

// export default Login;


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./Authentication";
import { ToastContainer, toast } from "react-toastify";
import { Container, Navbar, Spinner } from "react-bootstrap";
import { logins } from "./component/Logic";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const em = useRef();
  const pass = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msg1, setMsg1] = useState("");
  const [show, setShow] = useState(true);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!em.current.value || !pass.current.value) {
      toast.error("Please fill all fields!");
      return;
    }

    const obj = {
      email: em.current.value,
      password: pass.current.value,
    };

    const user = logins(obj.email, obj.password);
    if (user) {
      navigate(user.role === 'admin' ? "/admin" : null);
      if (user.role === 'admin') {
          alert("Admin login successfully!");
      }
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:7207/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await response.json();
      if (!response.ok) {
        setMsg(data.message);
        toast.error(data.message);
        setLoading(false);
        return;
      }

      // Store email and token
      const { email, token, role } = data.data;
      // const { email, token} = data.data;
      login({ email, token });
      toast.success(data.message);
      setMsg1(data.message);
      setTimeout(() => {
        navigate(role === "user" ? "/user" : "/");
      }, 3000);
    } catch (err) {
      console.error("Server Error:", err);
      toast.error("Server Error! Try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let timers = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timers);
  }, []);
  return (
    <div style={{ background: 'url(https://img.freepik.com/premium-vector/padlock-with-keyhole-icon-personal-data-security-illustrates-cyber-data-information-privacy-idea-blue-color-abstract-hi-speed-internet-technology_542466-600.jpg)', height: '911px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {
        !show &&
        <Navbar style={{ backdropFilter: 'blur(10px)', boxShadow: '0px 0px 5px 2px #fff', color: 'white' }}>
          <Container>
            <h2>LOGIN PAGE!</h2>
          </Container>
        </Navbar>
      }

      {
        !show && <div style={{ color: 'white', marginLeft: '70rem', marginTop: '20rem' }}>
          <h1>Welcome Back!</h1>
          <br />
          <p style={{ border: '1px solid white', textAlign: 'center', width: '10rem', marginLeft: '4rem', padding: '5px 20px' }}>Now to this site!</p>
        </div>
      }

      {
        show ?
          (
            <div className="card" style={{ width: '25rem', height: '15rem', marginLeft: '46rem', padding: '20px', background: 'transparent', color: 'white', marginTop: '18rem', boxShadow: '0px 0px 5px 2px white', position: 'absolute' }}>
              <br />
              <h2>Welcome! to Login Page</h2>
            </div>
          ) :

          (

            <form onSubmit={handleLogin} className="card" style={{ width: "30rem", height: '32rem', padding: "20px", boxShadow: '0px 0px 5px 2px white', borderRadius: '0px', backdropFilter: 'blur(10px)', top: '10rem', position: 'absolute', left: '30rem', background: 'transparent' }}>
              <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>{msg}</p>
              <p style={{ color: "white", fontWeight: "bold", backgroundColor: "#cc0c39", textAlign: "center", padding: '15px', fontSize: '20px' }}>Login Page <FaRegCircleUser /></p>
              <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>{msg1}</p>
              <IoIosMail style={{color: 'white' ,top: '8.2rem', position: 'absolute', left: '36px', fontSize: '30px'}}/>
              <input type="text" ref={em} style={{ width: "25rem", fontSize: "20px", margin: "auto", boxShadow: '0px 0px 5px 2px #999', borderRadius: '0px', padding: '15px' }} placeholder="Enter Email" className="form-control" />
              <RiLockPasswordFill style={{ color: 'white', top: '15.5rem', position: 'absolute', left: '35px', fontSize: '30px' }} />
              <input type="password" ref={pass} style={{ width: "25rem", fontSize: "20px", margin: "auto", boxShadow: '0px 0px 5px 2px #999', borderRadius: '0px', padding: '15px' }} placeholder="Enter Password" className="form-control" />
              {!loading ? (
                <button type="submit" style={{ color: "white", backgroundColor: "navy", fontSize: "20px", padding: "15px 50px", width: "25rem", border: "none", margin: 'auto', boxShadow: '0px 0px 5px 2px #999', borderRadius: '0px', fontWeight: 'bold' }} className="form-control">
                  Login Now!
                </button>
              ) : (
                <Spinner style={{ marginLeft: "12em" }} />
              )}
            </form>
          )
      }
      <ToastContainer />
    </div>
  );
};

export default Login;
