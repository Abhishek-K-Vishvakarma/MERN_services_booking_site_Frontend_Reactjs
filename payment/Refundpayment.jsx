import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {Container, Navbar} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../src/Authentication";
const Refundpayment = ({appointment}) => {
const [maxso, setMaxso] = useState([]);
const [search, setSearch] = useState([]); 
const payRef = useRef();
const [msg, setMsg] = useState("");
const [status, setStatus] = useState(appointment);
const navigate = useNavigate();
const [appoint, setAppoint] = useState([]);
const [search1, setSearch1] = useState([]);
const { canid } = useAuth();
const [payid, setPayId] = useState();
  useEffect(()=>{
    fetch('http://localhost:7207/api/getpay')
    .then(e=> e.json())
    .then((data)=>{
      console.log("Refund! :",data.ids);
      setMaxso(data.ids);
    })
  }, []);

  const resSearch = maxso.filter(refunds => refunds.status.toLowerCase().includes(search));
  
  const handleRefund = async(e)=>{
    e.preventDefault();
    const payRefundObj = {
      payment_id : payRef.current.value
    }
 
     maxso.map((ele)=>{
      if(ele.appointment_id === canid.can._id){
        console.log(ele.payment_id)
        setPayId(ele.payment_id);
      }
     })

    try{
      const response = await fetch('http://localhost:7207/api/refund',{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(payRefundObj)
      });

      const resPay = await response.json();
      console.log("Created refund :", resPay);

      if(resPay.status === "success"){
        alert("Refund successful! Appointment cancelled.");
        setStatus("Cancelled");
      }else{
        alert(resPay.message);
      }

      if(!response.ok){
        alert("Response not OK!");
      }else{
         setMsg(resPay.message);
         setTimeout(()=>{
           navigate("/paymessage");
          setMsg("");
         }, 3000);
      }
    }catch(error){      
      console.log("Server Error :", error);
    }         
  }

  useEffect(()=>{
    fetch('http://localhost:7207/api/getappoint')
    .then(e=> e.json())
    .then((data)=>{
      console.log(data.findAll);
      setAppoint(data.findAll);
    })
  }, []);

  const searchAppointmentId = appoint.filter(data=> data.status.toLowerCase().includes(search1));
  console.log("maxso :", maxso);
  console.log("Canid", canid.can);
  console.log("payid :", payid);
  return (
    <div>
      <Navbar className="bg-info">
        <Container>
          <h3>Payment Refund Section</h3>
        </Container>    
      </Navbar>
      <div style={{ width: '35rem', height: '30rem', padding: '30px', borderRadius: '0px', color: 'green'}}>
        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search payment_id..."  className="form-control"/>
        <br />
        {resSearch.length > 0 ?

          (
            resSearch.map((ele) => {
              return <>
                <p>{(ele.status === "Paid") ? <p style={{ border: '1px solid blue', padding: '10px' }}>payment_id : {ele.payment_id} || {ele.status}  <p>AppointmentID : {ele.appointment_id}</p></p> : null}</p>
              </>
            })
          )
          :
          (
            <p>payment id not found!</p>
          )
        }
      </div>
      <div className="container form-group">
        <form onSubmit={handleRefund} className="card" style={{width: '30rem', height: '20rem', padding: '30px', borderRadius: '0px', marginLeft: '30rem', marginTop: '-20rem'}}>
          <p style={{color: 'green', fontSize: '20px', fontWeight: 'bold', textAlign: 'center'}}>{msg}</p>
          <h4 style={{ padding: '15px', boxShadow: '0px 0px 5px 2px #999', border: 'none', backgroundColor: '#cc0c39', color: 'white'}}>RefundPayment Page</h4>
          <br/>
              <input type="text" ref={payRef} style={{padding: '15px', boxShadow: '0px 0px 5px 2px #999', border: 'none'}} value={payid} placeholder="Enter payment_id"/>
          <br /><br />
          {
            status !== "Cancelled" 
            &&
            <button type="submit" style={{ padding: '15px', boxShadow: '0px 0px 5px 2px #999', border: 'none', backgroundColor: 'navy', color: 'white' }}>Refund Payment</button>
          }
          <p>{status}</p>
          </form>
      </div>
      <div style={{marginLeft: '85rem', marginTop: '-28rem', position: 'absolute'}}>
        <input type="text" placeholder="Search..." className="form-control" onChange={(e)=> setSearch1(e.target.value)}/>
        <br/><br/>
        {
          searchAppointmentId.map((ele) =>{
            return <>
              {(ele.status === "Cancelled") ? <p>AppointmentID: {ele._id} || {ele.status}</p> : null}
            </>
          })
        }
      </div>
    </div>
  )
};

Refundpayment.propTypes = {
  appointment : PropTypes.node.isRequired
}
export default Refundpayment;
