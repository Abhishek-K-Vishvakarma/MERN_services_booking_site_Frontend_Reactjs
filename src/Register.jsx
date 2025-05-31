import { useRef} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Navbar } from "react-bootstrap";
// import { HiHome } from "react-icons/hi2";
import { SiUnity } from "react-icons/si";

import './para.css';
const Register = () => {
  const nm = useRef();
  const em = useRef();
  const pass = useRef();
  const mob = useRef();
  const roles = useRef();
  
  const [msg, setMsg] = useState();
  const [msg1, setMsg1] = useState();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const obj = {
      name: nm.current.value, 
      email: em.current.value,
      password : pass.current.value,
      phone: mob.current.value,
      role: roles.current.value
    };


    if (!nm.current.value && !em.current.value && !pass.current.value && !mob.current.value && !roles.current.value){
      toast.error("All input fields must be required!");
      return;
    }

    try {
      const response = await fetch('http://localhost:7207/api/registration',{
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(obj)
      })
      const data = await response.json();
      console.log(data);
      if(!response.ok){
        toast.error(data.message);
        setMsg(data.message)
        setTimeout(()=>{
          setMsg("");
        }, 3000);
      }else{
        setMsg1(data.message)
        setTimeout(()=>{
          navigate('/verify');
          setMsg1("")
        }, 3000);
      }
      
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div style={{ background: "url(https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-54587.jpg)", height: "911px", position: 'relative', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
      <Navbar style={{ backgroundColor: 'navy', boxShadow: '0px 0px 5px 5px #33658a'}}>
        <Container>
          <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginLeft: '-16rem', boxShadow: '0px 0px 5px 2px #999', padding: '6px 30px', fontSize: '20px' }} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home</Link>
          <h4 className="text-white">SIGN-UP PAGE</h4>
        </Container>
      </Navbar>
      <form className="card" onSubmit={handleRegister} style={{ width: '32rem', margin: 'auto', position: "absolute", top: '56%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '0px', background: 'transparent', boxShadow: '0px 0px 5px 3px #134074', backgroundColor: '#134074'}}>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/005/437/953/small/coniferous-night-forest-landscape-illustration-vector.jpg" style={{width: '100%', height: '15rem'}}/>
        {/* <h3 style={{ boxShadow: '0px 0px 5px 1px #999' ,color: 'white', textAlign: 'center', backgroundColor: '#cc0c39', padding: '10px'}}>Sign-Up Page</h3> */}
        <p className="text-danger text-center">{msg}</p><p className="text-success text-center">{msg1}</p>
        <div style={{padding: '20px'}}>
          <InputGroup className="mb-3">
            <Form.Control id="same"
              style={{ fontSize: '20px', borderRadius: '0px', padding: '10px', background: 'transparent', color: 'white'}}
              ref={nm}
              placeholder="Username"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control 
              id="same"
              style={{ fontSize: '20px', borderRadius: '0px', padding: '10px', background: 'transparent', color: 'white' }}
              ref={em}
              placeholder="Email"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control 
              id="same"
              style={{ fontSize: '20px', borderRadius: '0px', padding: '10px', background: 'transparent', color: 'white' }}
              ref={pass}
              placeholder="Password"
              type="password"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control 
              id="same"
              style={{ fontSize: '20px', borderRadius: '0px', padding: '10px', background: 'transparent', color: 'white' }}
              ref={mob}
              placeholder="Phone"

            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control 
              id="same"
              style={{ fontSize: '20px', borderRadius: '0px', padding: '10px', background: 'transparent', color: 'white' }}
              ref={roles}
              placeholder="Role"
            />
          </InputGroup>
          <button type="submit" style={{ width: '100%', color: "white", backgroundColor: "#003566", fontSize: "20px", cursor: 'pointer', padding: '10px 10px', border: '1px solid white' }}>Sign Up!</button>
        </div>
        <br/> 
        <p style={{ color: 'pink', fontSize: '20px', textAlign: 'center'}}>Already have a Square account? <Link to="/login" style={{textDecoration: 'none', fontSize: '20px', color: 'white'}}>Login</Link></p>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Register;
