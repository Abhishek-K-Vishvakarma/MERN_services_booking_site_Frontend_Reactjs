import { useEffect, useState } from "react";
import {Navbar} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { MdOutlineSchedule } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { SiUnity } from "react-icons/si";

const GetAppointment = () => {
  const [get, setGet] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:7207/api/getappoint')
    .then(e=> e.json())
    .then((data)=>{
      console.log("Get appointment :",data);
      setGet(data.findAll);
    }).catch(error=> console.log('Server error:', error));
  }, []);


  return (
    <div>
      <Navbar style={{backgroundColor: 'navy', position: 'fixed', zIndex: '1', width: '100%', marginTop: '-3.5rem'}}>
        <Navbar.Text>
          <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginLeft: '1rem', boxShadow: '0px 0px 5px 2px #999', padding: '35px 10px' }} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home Dashboard</Link>
          <Link to="/schedule" style={{ textDecoration: 'none', fontSize: '20px', color: 'white', marginLeft: '2rem' }}>Appointment Schedule <MdOutlineSchedule style={{color: 'yellow'}}/></Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/cancel" style={{ textDecoration: 'none', fontSize: '20px', color: 'white' }}>Appointment Cancel <MdCancel style={{ color: 'red' }} /></Link>
          <Link to="/paymessage" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px', marginLeft: '40rem' }}>Paymentmessage <MdOutlineMessage/></Link>
        </Navbar.Text>
      </Navbar>
      <div style={{margin: '50px'}}>
        {get.length > 0 ? (
          get.map((e) => {
            return (
              <div key={e._id} className="card" style={{ display: 'inline-block', width: '25rem', marginTop: '100px', marginLeft: '50px', borderRadius: '0px', padding: '10px'}}>
                <p style={{ backgroundColor: '#cc0c40', textAlign: 'center', color: 'white' }}>Appointment {e.status} 📑</p>
                <br />
                <div className="card" style={{ boxShadow: '0px 0px 5px 2px blue', padding: '5px', borderRadius: '0px' }}>
                  <div>
                    <p>AppointmentDate: &nbsp;{e.appointment_date}📆</p>
                  </div>
                  <div>
                    <p>AppointmentTime: {e.time_slot}🕒</p>
                  </div>
                  <p style={{ display: 'flex' }}>AppointmentStatus : &nbsp; {(e.status === "Pending") ? <Link to="/initial">InitialPayment</Link> : <p>{e.status}</p>}📑</p>
                  <div>
                    <p>Appointment ID: {JSON.stringify(e._id).slice(21, 25).padStart(20, 'x')}🔑</p>
                  </div>
                </div>
              </div>
            )
          })
        ) :
       ( 
       <p style={{color: 'white', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginTop: '23rem'}}>Appointment Status Page not found!</p>)
        }
      </div>
    </div>
  )
}

export default GetAppointment
