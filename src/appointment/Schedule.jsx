import {  useEffect, useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { HiHome } from "react-icons/hi2";
import { SiUnity } from "react-icons/si";
const Schedule = () => {
const dateRef = useRef();
const timeRef = useRef();
const [send, setSend] = useState([]);
const [ids, setIds] = useState();
const [search, setSearch] = useState([]);
const navigate = useNavigate();
const [msg, setMsg] = useState("");
useEffect(()=>{
  fetch(`http://localhost:7207/api/getappoint`)
   .then(e=> e.json())
   .then((data)=>{
     console.log("Scheduled :", data.findAll);
     setSend(data.findAll);
   })
}, []);



  const handleSchedule = async(e)=>{
    e.preventDefault();

    const selectedAppointment = send.find((ele) => ele._id === ids);

    if (!selectedAppointment) {
      alert("Invalid appointment ID.");
      return;
    }

    if (selectedAppointment.status === "Scheduled"){
      alert("This appointment is already scheduled!");
      return;
    }
    
    

    const scheduleObj = {
      appointment_date : dateRef.current.value,
      time_slot : timeRef.current.value
    }

    try{
      const response = await fetch(`http://localhost:7207/api/schedule/${ids}`,{
        method: "PUT",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(scheduleObj)
      });
      const resData = await response.json();
      console.log("ResSchedule :", resData);
      if(!response.ok){
        toast.error(resData.message);
      }else{
        setMsg(resData.message);
        setTimeout(()=>{
          setMsg("");
          navigate("/initial");
        }, 3000);
      }
    }catch(error){
      console.log("Server error :", error);
    }
  }
  const searchmap = send.filter(user=> user.status.toLowerCase().includes(search));
  console.log(ids)
  console.log(":", send)
  // localStorage.removeItem("cencel");
  return (
    <div style={{ background: 'url(https://images6.alphacoders.com/728/728101.png)', height: '911px'}}>
      <Navbar style={{ background: 'navy' }}>
              <Container>
                <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginLeft: '-16rem', boxShadow: '0px 0px 5px 2px #999', padding: '6px 10px' }} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home Dashboard</Link>
                <h3 className="text-white">Forgot? your password according you</h3>
              </Container>
      </Navbar>
      <br/><br/>
      <div>
        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="Search..." style={{padding: '10px', border: 'none', boxShadow: '0px 0px 5px 2px #999', outline: 'none', marginLeft: '5rem', width: '30rem', borderRadius: '30px'}}/>
        <br/><br/>
        <div style={{marginLeft: '7rem'}}>
          {
           searchmap.length > 0 ?
          (
                searchmap.map((ele) => {
                  return <>
                    <div>
                      {(ele.status === "Cancelled") ? <p className="text-white" style={{border: '1px solid blue', width: '26rem'}}> Appointment ID: {ele._id} || {ele.status}</p> : null}
                    </div>
                  </>
                })
          ): 
          (
            <p className="text-white">appointment id not found!</p>
          )
          }
        </div> 
        <form onSubmit={handleSchedule} style={{position: 'fixed', left: '47rem', top: '15.5rem', width: '20rem'}}>
          {!msg ? <p style={{ color: "white", backgroundColor: '#CC0C39', textAlign: 'center', padding: '12px', fontWeight: 'bold', boxShadow: '0px 0px 3px 2px #999' }}>Schedule Appointment</p> : <p style={{color: 'green', fontSize: '20px', textAlign: 'center'}}>{msg}</p>}
          <br/>
          <input type="date" className="form-control" ref={dateRef} style={{padding: '10px' ,boxShadow: '0px 0px 5px 1px #fff', cursor: 'pointer', borderRadius: '0px', height: '50px', background: 'transparent', width: '20rem', border: 'none', color: 'white'}} />
          <br/>
          <input type="time" className="form-control" ref={timeRef} style={{ padding: '10px', boxShadow: '0px 0px 5px 1px #fff', cursor: 'pointer', borderRadius: '0px', height: '50px', background: 'transparent', width: '20rem', border: 'none', color: 'white'}} />
          <br/>
          <select type="text" onChange={(e) => setIds(e.target.value)} style={{padding: '10px', boxShadow: '0px 0px 5px 1px #fff', border: 'none', background: 'transparent', width: '20rem' }}>
            <option>Choose appintment-ID</option>
            {
              send.map((ele)=>{
                return <>
                <div>
                  {(ele.status === "Cancelled" ? <option>{ele._id}</option> : null)}
                </div>
                </>
              })
            }
          </select>
          <br /><br /><br /><br /><br/>
          <button type="submit" style={{color: 'white', padding: '5px 10px', border: '2px solid yellow', background: 'transparent', marginLeft: '90px'}}>SCHEDULE NOW</button>
       </form>
      </div>
      {/* <div className="card" style={{ width: '35rem', padding: '5px', marginLeft: '35rem', borderRadius: '0px', marginTop: '-20px', position: 'absolute', boxShadow: '-2px 2px 6px 3px white' }}>
        <h4>Note : </h4>
        <h5>Hey! users,</h5>
        <p>If you want to appointment scheduled then <mark>search..., appintment Id for in given search box at Cancelled</mark>status point.</p>
      </div> */}
      <ToastContainer/>
    </div>
  )
}

export default Schedule;
