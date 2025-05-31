import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer ,toast } from "react-toastify";
import { useAuth } from "./Authentication";
import { Container, Navbar } from "react-bootstrap";
import { SiUnity } from "react-icons/si";

const ForGotPassword = ()=>{
  const em = useRef();
  const old_password = useRef();
  const new_Password = useRef();
  const {user} = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState();
  const [success, setSuccess] = useState();
  const handleforgot = async(e)=>{
    e.preventDefault();
    const obj = {
      email : em.current.value,
      oldPassword: old_password.current.value,
      newPassword: new_Password.current.value 
    }

    if (user.email !== em.current.value){
      alert("Email does not matched!");
      return;
    }

    if(!em.current.value && !old_password.current.value && !new_Password.current.value){
      toast.error("Please! all fields must be required");
      return;
    }

    try{
      const response = await fetch('http://localhost:7207/api/forgot',{
        method : "POST",
        headers :{
         'Content-Type' : 'application/json'
        },
        body: JSON.stringify(obj)
      })
      const alldata = await response.json();
      console.log("Stringify :", JSON.stringify(alldata));
      console.log('Password Change :', alldata);
      
      if(alldata.status === false || alldata.status === 400){
        setMsg(alldata.message);
        toast.error(alldata.message);
        setTimeout(()=>{
          setMsg("");
        }, 3000);
      }else if(alldata.passdata.status === true){
       setSuccess(alldata.message);
       toast.success(alldata.message);
       setTimeout(()=>{
         navigate('/login');
       }, 3000)
      }

    }catch(err){
      console.log("Server error :", err);
    }
  }

  // console.log("User email :",user.email);

  return (
    <div style={{backgroundColor: '#d9s9f9f9', height: '57rem', position: 'relative'}}>
      <Navbar style={{background: 'navy'}}>
        <Container>
          
          <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginLeft: '-16rem', boxShadow: '0px 0px 5px 2px #999', padding: '6px 10px' }} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home Dashboard</Link>
            <h3 className="text-white">Forgot? your password according you</h3>
        </Container>
      </Navbar>
      <form className="card mt-5" onSubmit={handleforgot} style={{ width: '30rem', height: '42rem', padding: '40px', marginLeft: '43rem'}}>
      <p style={{color: 'red', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>{msg}</p>
      <p style={{ color: 'green', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>{success}</p>
        <p style={{ color: 'white', backgroundColor: '#cc0c39', textAlign: 'center', fontWeight: 'bold', padding: '15px 112px', boxShadow: '0px 0px 5px 2px #999', width: '25rem' }}>Forgot Password</p>
      <br/>
        <input type="text" ref={em} className="form-control" placeholder="ENTER E-MAIL" style={{padding: '15px', width: '25rem',boxShadow: '0px 0px 5px 2px #999', borderRadius: '0px'}}/>&nbsp;
        <input type="text" ref={old_password} className="form-control" placeholder="ENTER OLD-PASSWORD" style={{ padding: '15px', width: '25rem', boxShadow: '0px 0px 5px 2px #999', borderRadius: '0px' }} />&nbsp;
        <input type="text" ref={new_Password} className="form-control" placeholder="ENTER NEW-PASSWORD" style={{ padding: '15px', width: '25rem',boxShadow: '0px 0px 5px 2px #999', borderRadius: '0px' }} />
        <br />
        <br/>
        <button type="submit" style={{ backgroundColor: 'navy', color: 'white', fontWeight: 'bold', border: 'none', padding: '15px 122px', boxShadow: '0px 0px 5px 2px #999', width: '25rem' }}>Forgot Now ?</button>
        <hr/>
        <p style={{color: 'black'}}>I can not be remembered my old password!</p>
        <Link to="/newconpass" style={{ color: 'red', fontWeight: 'bold'}}>Click! Choose New and Confirm Password!</Link>
     </form>
      <ToastContainer/>
    </div>
  )
};

export default ForGotPassword;