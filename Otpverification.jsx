import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { TiInputChecked } from "react-icons/ti";
import { SiGmail } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
const OtpVerification = () => {
  const em = useRef();
  const verifyotp = useRef();
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  const handleOtp = async (e) => {
    e.preventDefault();

    const obj = {
      email: em.current.value,
      otp: verifyotp.current.value
    }

    if(!em.current.value && !verifyotp.current.value){
       toast.error("All fields must be required!");
       return;
    }

    try {
      const response = await fetch('http://localhost:7207/api/verify', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });

      const data = await response.json();
      if(!response.ok){
        toast.error("Please! fill correct OTP")
      }else{
        setMsg(data.message);
        toast.success(data.message);
        setTimeout(()=>{
          navigate('/login');
          setMsg("");
        }, 3000);
      }
      console.log(data);
    } catch (err) {
      console.error("Error server :", err);
    }
  }

  return (
    <div>
      <form className="card" onSubmit={handleOtp} style={{width: '30rem', margin: 'auto', marginTop: '13rem', padding: '5rem', boxShadow: '0px 0px 5px 1px #999'}}>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>E <SiGmail style={{ color: 'blue' }} /> AIL VERIFICATION</p>
        <p style={{textAlign: "center", color: 'green', fontSize: '20px'}}>{msg}</p>
        <br/>
        <label style={{fontSize: '20px'}}>Enter Email:</label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1"><IoMdMail/></InputGroup.Text>
          <Form.Control
           placeholder="Enter Email"
           ref={em}
          />
        </InputGroup>
        <br/>
        <label style={{fontSize: '20px'}}>Enter OTP:</label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1"><TiInputChecked/></InputGroup.Text>
          <Form.Control
          placeholder="Enter OTP"
          ref={verifyotp}
          />
        </InputGroup>
        <br /><br />
        <button type="submit" style={{width: '10rem', margin: 'auto', border: 'none', fontWeight: 'bold', padding: '5px'}}>OTP VERIFICATION</button>
      </form>
      <ToastContainer/>
    </div>
  )
};

export default OtpVerification;