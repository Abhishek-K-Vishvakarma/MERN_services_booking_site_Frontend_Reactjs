import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication";
import { Container, Navbar } from "react-bootstrap";
import { SiUnity } from "react-icons/si";

const Cancel = () => {
const [send, setSend] = useState([]);
const [get, setGet] = useState("");
const navigate = useNavigate();
  const { appointCancel, canid } = useAuth();
  useEffect(()=>{
    fetch("http://localhost:7207/api/getappoint")
    .then(e=> e.json())
    .then((data)=>{
      console.log("Put data :", data.findAll);
      setSend(data.findAll);
    })
  }, []);



  const cancelPutappoint = async(id)=>{
    try{
      const response = await fetch(`http://localhost:7207/api/cancel/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const cancelData = await response.json();
      console.log("Cancel Data :", cancelData);
      const can = cancelData.cancel
      appointCancel({ can });
      setGet(cancelData);
      if(!response.ok){
        alert(cancelData.message);
      }else{
        navigate('/refund');
      }
    }catch(error){
      console.log('Server error:', error);
    }
  }
  console.log("Can ID :", canid)
  // localStorage.removeItem('cencel')
  return (
    <div>
      <Navbar style={{background: 'navy', color: 'white'}}>
        <Container>
          <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginLeft: '-16rem', boxShadow: '0px 0px 5px 2px #999', padding: '6px 10px' }} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home Dashboard</Link>
          <h2>Appointment Cancellation Page</h2>
        </Container>
      </Navbar>
      <div>
        {
         send.length > 0 ? (
            send.map((ele) => {
              return <>
                <div className="card" style={{boxShadow: '0px 0px 5px 2px #999' ,width: '27rem', height: '22rem', borderRadius: '0px', padding: '10px', display: 'inline-block', margin: '20px'}}>
                  <br />
                  <h4>Appointment Page</h4>
                  <hr />
                  <div className="card" style={{ boxShadow: '0px 0px 5px 2px blue', borderRadius: '0px', padding: '5px', fontWeight: 'bold' }}>
                    <p>Appointment Status : {ele.status}</p>
                    <p>Appointment ID : {JSON.stringify(ele._id).slice(21, 25).padStart(20, 'x')}</p>
                  </div>
                  <p style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>{get.message}</p>
                  <p style={{ color: 'red', fontWeight: 'bold' }}>❗If you want to cancelled-appointment, Then Please click at given button for cancelletion  appointment</p>
                  <button onClick={() => cancelPutappoint(ele._id)} style={{ backgroundColor: 'navy', color: 'white', padding: '15px', border: 'none', width: '25rem'}}>Appointment Cancel</button>
                </div>
              </>
            })
         ) : (
          <p style={{color: 'white'}}>Cancel Page Not found!</p>
         )
        }
      </div>
    </div>
  )
}

export default Cancel
