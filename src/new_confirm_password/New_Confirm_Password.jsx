import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer ,toast } from "react-toastify";
import { useAuth } from "../Authentication";
import { SiUnity } from "react-icons/si";
import { Container, Navbar } from "react-bootstrap";

const New_Confirm_Password = () => {
  const [msg, setMsg] = useState();
  const [msg1, setMsg1] = useState();
  const navigate = useNavigate();
  const newRef = useRef();
  const conRef = useRef();
  const emRef = useRef();
  const {user} = useAuth();
  const ConfirmPassword = async (e) =>{

    e.preventDefault();
  
  const obj = {
    email: emRef.current.value,
    newPassword : newRef.current.value,
    confirmPassword : conRef.current.value
  }

  if(user.email !== emRef.current.value){
     alert("Email does not matched");
     return;
  }

    const response = await fetch('http://localhost:7207/api/newpass', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    const data = await response.json();
    console.log("All data is :",data);
    if (!response.ok){
      setMsg(data.message);
      setTimeout(()=>{
       setMsg("");
      }, 3000);
    }else if(data.status === true){
      setMsg1(data.message);
      toast.success(data.message);
      setTimeout(() =>{
        navigate('/login');
      }, 3000);
    }
    emRef.current.value = "";
    newRef.current.value = "";
    conRef.current.value = "";
  }

  return (
    <div style={{ backgroundColor: '#5672', height: '911px'}}>
      <Navbar style={{ background: 'navy' }}>
        <Container>
          <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginLeft: '-16rem', boxShadow: '0px 0px 5px 2px #999', padding: '6px 10px' }} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home Dashboard</Link>
          <h3 className="text-white">Forgot? your password according you</h3>
        </Container>
      </Navbar>
      <form className="card" onSubmit={ConfirmPassword} style={{width: '30rem', height: '40rem',margin: 'auto', padding: '50px', marginTop: '4rem', borderRadius: '0px'}}>
        <p style={{ color: "white", backgroundColor: '#cc0c39', textAlign: 'center', fontWeight: 'bold', padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999' }}>CHANGE PASSWORD</p>
        <p style={{textAlign: 'center', color: 'red'}}>{msg}</p>
        <p style={{ textAlign: 'center', color: 'green' }}>{msg1}</p>
        <label style={{ color: '#b5179e', fontWeight: 'bold', fontSize: '18px'}}>Email</label>
        <input type="text" ref={emRef} className="form-control" placeholder="Enter E-Mail" style={{padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999'}}/>
        <br/>
        <label style={{ color: '#b5179e', fontWeight: 'bold', fontSize: '18px' }}>NewPassword</label>
        <input type="text" ref={newRef} className="form-control" placeholder="Enter New-Password" style={{ padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999' }} />
        <br />
        <label style={{ color: '#b5179e', fontWeight: 'bold', fontSize: '18px' }}>ConfirmPassword</label>
        <input type="text" ref={conRef} className="form-control" placeholder="Enter Confirm-Password" style={{ padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999' }} />
        <br/><br/>
        <button type="submit" style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'navy', padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999', border: 'none'}}>ChangePassword</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default New_Confirm_Password;