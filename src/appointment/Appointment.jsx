// import { useState, useRef, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../Authentication";
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import { IoHomeSharp } from "react-icons/io5";
// const Appointment = () => {
//   const { notification_user_id, sbook } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [services, setServices] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [selectedService, setSelectedService] = useState("");
//   const [books, setBooks] = useState();
//   const [msg, setMsg] = useState("");
//   const [msg1, setMsg1] = useState("");
//   const [pending, setPending] = useState(false);
//   const dateRef = useRef();
//   const timeRef = useRef();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:7207/api/alluser")
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.log("Server error:", error));

//     fetch("http://localhost:7207/api/getservice")
//       .then((response) => response.json())
//       .then((data) => setServices(data.serviceId))
//       .catch((error) => console.log("Server error:", error));
//   }, []);

//   const handleAppointment = async (e) => {
//     e.preventDefault();

//     if (!dateRef.current.value || !timeRef.current.value || !selectedService || !selectedUser){
//       toast.error("Please fill all fields");
//       return;
//     }

//     const appointment = {
//       appointment_date: dateRef.current.value,
//       time_slot: timeRef.current.value,
//       service_id: selectedService,
//       user_id: selectedUser,
//     };

//     try {
//       const response = await fetch("http://localhost:7207/api/appointment",{
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(appointment),
//       });

//       const data = await response.json();
//       const a = data.saveAppointment;
//       notification_user_id({a});
//       console.log("Appointment :",data)
//       if (!response.ok) {
//         setMsg(data.message);
//         setTimeout(() => setMsg(""), 3000);
//       } else {
//         setMsg1(data.message);
//         setPending(data.status);
//         setTimeout(() => {
//           navigate('/initial');
//           setMsg1("");
//         }, 3000);
//       }
//     } catch (error) {
//       console.log("Server error:", error);
//     }
//   };

//   useEffect(()=>{
//   setBooks(sbook);
//   }, [sbook]);
//   return (
//     <div style={{ background: 'url(https://img.freepik.com/free-vector/appointment-booking-smartphone_23-2148559902.jpg?t=st=1742481310~exp=1742484910~hmac=a20677b6b90ad2de7dbdae032d383dabe68dcec4f9571031eff57be333ccdaa4&w=740)', height: '911px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '50%'}}>
//       <Navbar  className="bg-info" style={{width: '200%'}}>
//         <Container>
//           <Link to="/" style={{textDecoration: 'none', fontSize: '20px', color: 'black'}}>Home <IoHomeSharp/></Link>
//          <h3>Appointment Page</h3>
//         </Container>
//       </Navbar>
//       <div className="card" style={{ width: "28rem", height: '35rem', padding: "25px", margin: "auto", boxShadow: "0 0 10px 0 white", gridGap: "20px", top: '8em', borderRadius: '0px', display: 'flex', left: '50em'}}>
//         {!msg ? <h4 style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#cc0c39', padding: '15px'}}>Appointment Page</h4> : <h4 style={{ color: 'red', textAlign: 'center' }}>{msg}</h4>}
//         <p style={{ color: 'green', textAlign: 'center', fontSize: '18px' }}>{msg1}</p>
//         <form onSubmit={handleAppointment}>
//           <input type="date" ref={dateRef} className="form-control" style={{borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999', padding: '15px'}}/>
//           <br />
//           <input type="time" ref={timeRef} className="form-control" style={{ borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999', padding: '15px' }} />
//           <br />
//           <select className="form-control" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} style={{ borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999', padding: '15px' }}>
//             <option value="">Select Service</option>
//             {
//               services.map((ele)=>{
//                 return<>
//                 {
//                     (ele._id === books._id) ? <option key={ele._id} value={ele._id}>{ele.service_name}</option> : null
//                 }
//                 </>
//               })
//             }
//           </select>
//           <br/>
//           <select className="form-control" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} style={{ borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999', padding: '15px' }}>
//             <option value="">Select User</option>
//             {users.map((u) => (
//               <option key={u._id} value={u._id}>{u.name}</option>
//             ))}
//           </select>
//           <br /><br/>
//           <button type="submit" style={{ border: 'none', boxShadow: '0px 0px 5px 1px #888', fontWeight: 'bold', backgroundColor: 'navy', color: 'white', padding: '15px 9.5em'}}>
//             {(pending !== 'Booked') ? "AppointNow" : "⌚Pending"}
//           </button>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Appointment;



import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { IoHomeSharp } from "react-icons/io5";

const Appointment = () => {
  const { notification_user_id, sbook, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [books, setBooks] = useState(null);
  const [msg, setMsg] = useState("");
  const [msg1, setMsg1] = useState("");
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);

  const dateRef = useRef();
  const timeRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users and services at the same time
    const fetchData = async () => {
      try {
        const [usersRes, servicesRes] = await Promise.all([
          fetch("http://localhost:7207/api/alluser"),
          fetch("http://localhost:7207/api/getservice"),
        ]);

        const usersData = await usersRes.json();
        const servicesData = await servicesRes.json();

        setUsers(usersData);

        // Ensure the API returns the correct structure
        if (servicesData && Array.isArray(servicesData.serviceId)) {
          setServices(servicesData.serviceId);
        } else {
          console.error("Invalid services response:", servicesData);
        }
      } catch (error) {
        console.error("Server error:", error);
      } finally {
        setLoading(false); // Stop loading when fetch is complete
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sbook) {
      setBooks(sbook);
    }
  }, [sbook]);

  const handleAppointment = async (e) => {
    e.preventDefault();

    if (!dateRef.current.value || !timeRef.current.value || !selectedService || !selectedUser) {
      toast.error("Please fill all fields");
      return;
    }

    const appointment = {
      appointment_date: dateRef.current.value,
      time_slot: timeRef.current.value,
      service_id: selectedService,
      user_id: selectedUser,
    };

    try {
      const response = await fetch("http://localhost:7207/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });

      const data = await response.json();
      if (!response.ok) {
        setMsg(data.message);
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg1(data.message);
        setPending(data.status);
        notification_user_id({ a: data.saveAppointment });

        setTimeout(() => {
          navigate("/initial");
          setMsg1("");
        }, 3000);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h2>;
  }

  console.log("Users :", users);
  console.log("services :", services);
  console.log(user);
  return (
    <div
      style={{
        background:
          "url(https://img.freepik.com/free-vector/appointment-booking-smartphone_23-2148559902.jpg?t=st=1742481310~exp=1742484910~hmac=a20677b6b90ad2de7dbdae032d383dabe68dcec4f9571031eff57be333ccdaa4&w=740)",
        height: "911px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "50%",
      }}
    >
      <Navbar className="bg-info" style={{ width: "200%" }}>
        <Container>
          <Link to="/" style={{ textDecoration: "none", fontSize: "20px", color: "black" }}>
            Home <IoHomeSharp />
          </Link>
          <h3>Appointment Page</h3>
        </Container>
      </Navbar>

      <div
        className="card"
        style={{
          width: "28rem",
          height: "35rem",
          padding: "25px",
          margin: "auto",
          boxShadow: "0 0 10px 0 white",
          gridGap: "20px",
          top: "8em",
          borderRadius: "0px",
          display: "flex",
          left: "50em",
        }}
      >
        {!msg ? (
          <h4 style={{ color: "white", textAlign: "center", fontWeight: "bold", backgroundColor: "#cc0c39", padding: "15px" }}>
            Appointment Page
          </h4>
        ) : (
          <h4 style={{ color: "red", textAlign: "center" }}>{msg}</h4>
        )}
        <p style={{ color: "green", textAlign: "center", fontSize: "18px" }}>{msg1}</p>

        <form onSubmit={handleAppointment}>
          <input type="date" ref={dateRef} className="form-control" style={inputStyle} />
          <br />
          <input type="time" ref={timeRef} className="form-control" style={inputStyle} />
          <br />

          {/* Service Dropdown */}
          <select className="form-control" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} style={inputStyle}>
            <option value="">Select Service</option>
            {
              services.map((ele)=>{
                return<>
                  {(ele.service_name === books?.service_name) ? <option value={ele._id}>{ele.service_name}</option> : null}
                </>
              })
            }
          </select>
          <br />

          {/* User Dropdown */}
          <select className="form-control" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} style={inputStyle}>
            <option value="">Select User</option>
            {
              users.map((ele)=>{
                return<>
                 {
                    (ele.email === user?.email) ? <option key={ele._id} value={ele._id}>{ele.name}</option> : null
                 }
                </>
              })
            }
          </select>
          <br />
          <br />

          <button type="submit" style={buttonStyle}>
            {pending !== "Booked" ? "Appoint Now" : "⌚ Pending"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

// Style Objects
const inputStyle = {
  borderRadius: "0px",
  boxShadow: "0px 0px 5px 2px #999",
  padding: "15px",
};

const buttonStyle = {
  border: "none",
  boxShadow: "0px 0px 5px 1px #888",
  fontWeight: "bold",
  backgroundColor: "navy",
  color: "white",
  padding: "15px 9.2rem"
};

export default Appointment;
