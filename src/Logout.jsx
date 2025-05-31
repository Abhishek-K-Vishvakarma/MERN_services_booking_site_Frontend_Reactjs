// import { useNavigate } from 'react-router';
// import { useAuth } from './Authentication';
// import { Spinner } from 'react-bootstrap';
// import { useState } from 'react';
// const Logout = () => {
//   const navigate = useNavigate();
//   const [msg, setMsg] = useState();
//   const {logout} = useAuth();
//   const sendsdata = () => {
//     logout();
//     setMsg("User || Admin Logout Successfully!");
//     setTimeout(() => {
//       navigate('/login');
//     }, 3000);
//   }

//   return (
//     <div >
//       <div className='card' style={{ width: '30rem', margin: 'auto', padding: '80px', marginTop: '22em' }}>
//         <h2 style={{ color: 'white', textAlign: "center", fontSize: '15px', backgroundColor: 'red', padding: '5px', fontWeight: 'bold' }}>PLEASE! LOGOUT</h2>
//         <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{msg}</p>
//         <br />
//         {!msg ? <button onClick={sendsdata} style={{ color: '#fceade', width: '10rem', margin: 'auto', padding: '5px', fontSize: '20px', fontWeight: 'bold', border: 'none', backgroundColor: '#00a5e0', boxShadow: '0px 0px 4px 3px white' }}>Logout</button>
//           : <Spinner style={{ marginLeft: '145px' }}></Spinner>
//         }

//       </div>
//     </div>
//   )
// };

// export default Logout;

// // import { useNavigate } from "react-router";
// // import { useAuth } from "./Authentication";
// // import { Spinner } from "react-bootstrap";
// // import { useState } from "react";

// // const Logout = () => {
// //   const navigate = useNavigate();
// //   const [msg, setMsg] = useState("");
// //   const { user, logout } = useAuth();

// //   const sendsdata = () => {
// //     logout();
// //     setMsg("User || Admin Logout Successfully!");
// //     setTimeout(() => {
// //       navigate("/login");
// //     }, 3000);
// //   };
// //   console.log("Logout is :", user.email)
// //   return (
// //     <div>
// //       <div
// //         className="card"
// //         style={{
// //           width: "30rem",
// //           margin: "auto",
// //           padding: "80px",
// //           marginTop: "22em",
// //         }}
// //       >
// //         <h2
// //           style={{
// //             color: "white",
// //             textAlign: "center",
// //             fontSize: "15px",
// //             backgroundColor: "red",
// //             padding: "5px",
// //             fontWeight: "bold",
// //           }}
// //         >
// //           PLEASE! LOGOUT
// //         </h2>
// //         {user && <p style={{ textAlign: "center", fontWeight: "bold" }}>Logged in as: {user.email}</p>}
// //         <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
// //           {msg}
// //         </p>
// //         <br />
// //         {!msg ? (
// //           <button
// //             onClick={sendsdata}
// //             style={{
// //               color: "#fceade",
// //               width: "10rem",
// //               margin: "auto",
// //               padding: "5px",
// //               fontSize: "20px",
// //               fontWeight: "bold",
// //               border: "none",
// //               backgroundColor: "#00a5e0",
// //               boxShadow: "0px 0px 4px 3px white",
// //             }}
// //           >
// //             Logout
// //           </button>
// //         ) : (
// //           <Spinner style={{ marginLeft: "145px" }} />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Logout;


import { useNavigate } from "react-router";
import { useAuth } from "./Authentication";
import { Spinner } from "react-bootstrap";
import { useState } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMsg("Logging out...");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div style={{backgroundColor: "navy", height: '911px', position: 'relative'}}>
      <div className="container card" style={{marginTop: '12rem', position: 'absolute', left: '18rem', height: '20rem', borderRadius: '0px'}}>
        <h2 style={{ color: "white", textAlign: "center", fontSize: "15px", backgroundColor: "red", padding: "5px", fontWeight: "bold" }}>
          PLEASE LOGOUT
        </h2>
        {user && <p style={{ textAlign: "center", fontWeight: "bold", fontSize: '30px'}}>Logged in as: {user.email}</p>}
        <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>{msg}</p>
        <br />
        {!msg ? (
          <button onClick={handleLogout} style={{ color: "#fceade", width: "10rem", margin: "auto", padding: "5px", fontSize: "20px", fontWeight: "bold", border: "none", backgroundColor: "#00a5e0", boxShadow: "0px 0px 4px 3px white" }}>
            Logout
          </button>
        ) : (
          <Spinner style={{ marginLeft: "40rem" }} />
        )}
      </div>
    </div>
  );
};

export default Logout;
