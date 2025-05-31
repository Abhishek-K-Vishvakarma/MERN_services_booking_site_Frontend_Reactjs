// import { useEffect, useRef, useState } from "react";

// const Business = () => {
//   const bnameRef = useRef();
//   const baddress = useRef();
//   const bmob = useRef();
//   const burl = useRef();
//   const bid = useRef();
//   const [msg, setMsg] = useState();
//   const [msg1, setMsg1] = useState();
//   const [userId, setUserId] = useState([]);
//   const [selId, setSelId] = useState();
//   useEffect(()=>{
//     fetch(`http://localhost:7206/api/alluser`)
//     .then(e=> e.json())
//     .then((data)=>{
//       console.log(data);
//      setUserId(data);
//     })
//   }, []);

//    const handleId = (id)=>{
//     const selectId = userId.find(u=> u._id === id);
//     if(selectId){
//       setSelId(selectId._id || '');
//       console.log(selectId._id);
//     }
//    }

//   const handleBusiness = async (e) => {
//   e.preventDefault();
//     const business_obj = {
//       business_name: bnameRef.current.value,
//       address: baddress.current.value,
//       business_contact: bmob.current.value,
//       logo_url : burl.current.value,
//       user_id: bid.current.value
//     }
//     if(!bnameRef.current.value && !baddress.current.value && !bmob.current.value && !burl.current.value && bid.current.value){
//       alert("Fill all fields!");
//       return;
//     };


//     try{
//       const response = await fetch(`http://localhost:7206/api/business`, {
//         method: "POST",
//         headers: {
//           'Content-Type': "application/json"
//         },
//         body: JSON.stringify(business_obj)
//       });
      
//       const data = await response.json();
//       console.log(data);
//       if(!response.ok){
//         setMsg(data.message);
//         setTimeout(() => {
//           setMsg("");
//         }, 3000);
//       }else{
//          setMsg1(data.message);
//          setTimeout(()=>{
//           setMsg1("");
//          },  3000);
//       }
//     }catch(error){
//      console.log("Server Error :", error);
//     }
//   }

//   return (
//     <div>
//       <div className="card" style={{width: '30rem', margin : 'auto', alignItems: 'center', padding: '40px', marginTop: '9rem'}}>
//         <form onSubmit={handleBusiness}>
//           <h3 className="text-center">Business Page</h3>
//           <p style={{color: 'red', textAlign: 'center'}}>{msg}</p> <p style={{color: 'green', fontWeight: 'bold', textAlign: 'center'}}>{msg1}</p>
//           <hr/>
//           <label>Enter BusinessName</label>
//           <input type="text" ref={bnameRef} placeholder="Enter BusinessName" className="form-control"/>
//           <br />
//           <label>Enter BusinessAddress</label>
//           <input type="text" ref={baddress} placeholder="Enter BusinessAddress" className="form-control" />
//           <br />
//           <label>Enter BusinessContact</label>
//           <input type="text" ref={bmob} placeholder="Enter BusinessContact" className="form-control" />
//           <br />
//           <label>Choose BusinessLogoUrl</label>
//           <input type="file" accept="image/*" ref={burl}  placeholder="Choose BusinessLogoUrl" className="form-control" />
//           <br />
//           <label>Choose UserId</label>
//           <select className="form-control" ref={bid} value={selId} onChange={(e) => handleId(e.target.value)}>
//             <option className="form-control">Plesase Select UserId</option>
//             {
//               userId.map((data) => {
//                 return <>
//                   <option>{data._id}</option>
//                 </>
//               })
//             }
//           </select>
//           <br/><br/>
//           <button type="submit" className="btn btn-success">Business</button>
//         </form>
//       </div>
//     </div>
//   )
// };
// export default Business;




import { useEffect, useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
const Business = () => {
  const bnameRef = useRef();
  const baddress = useRef();
  const bmob = useRef();
  const burl = useRef(null);
  const bid = useRef();
  const [msg, setMsg] = useState();
  const [msg1, setMsg1] = useState();
  const [userId, setUserId] = useState([]);
  const [selId, setSelId] = useState();
  const [urldata, setUrlData] = useState();
  const navigate = useNavigate();
  useEffect(()=>{
    fetch(`http://localhost:7207/api/alluser`)
    .then(e=> e.json())
    .then((data)=>{
      console.log(data);
     setUserId(data);
    })
  }, []);

   const handleId = (id)=>{
    const selectId = userId.find(u=> u._id === id);
    if(selectId){
      setSelId(selectId._id || '');
      console.log(selectId._id);
    }
   }


   const handlefilechoose = async()=>{

    const file = burl.current.files[0];

    if(!file){
      alert("Choose file!");
      return;
    }

    const formData = new FormData();

    formData.append('logo', file);


    try{
      const response = await fetch(`http://localhost:7207/api/upload`,{
        method : "POST",
        body : formData
      })

      const filedata = await response.json();
      console.log(filedata.logo_url);
      setUrlData(filedata.logo_url);
    }catch(error){
       console.log("Server Error :", error);
    }
   }


  const handleBusiness = async (e) =>{
  e.preventDefault();

    const business_obj = {
      business_name: bnameRef.current.value,
      address: baddress.current.value,
      business_contact: bmob.current.value,
      logo_url : urldata,
      user_id: bid.current.value
    }
    if(!bnameRef.current.value && !baddress.current.value && !bmob.current.value && bid.current.value){
      alert("Fill all fields!");
      return;
    };


    try{
      const response = await fetch(`http://localhost:7207/api/business`,{
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(business_obj)
      });
      
      const data = await response.json();
      console.log(data);
      if(!response.ok){
        setMsg(data.message);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      }else{
         setMsg1(data.message);
         setTimeout(()=>{
          setMsg1("");
           navigate('/category');
         },  3000);
      }
    }catch(error){
     console.log("Server Error :", error);
    }
  }

  return (
    <div style={{ height: '460px', backgroundColor: '#219ebc'}}>
      <Navbar style={{ backgroundColor: '#003049', color: 'white'}}>
        <Container>
          <h2>BUSINESS PAGE</h2>
        </Container>
      </Navbar>
      <div className="card" style={{width: '30rem', height: '42rem',margin : 'auto', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '0px'}}>
        <form onSubmit={handleBusiness}>
          <h3 style={{backgroundColor: '#cc0c39', color : 'white', padding: '15px', textAlign: 'center', marginTop: '25px'}}>Business Page</h3>
          <p style={{color: 'red', textAlign: 'center'}}>{msg}</p> <p style={{color: 'green', fontWeight: 'bold', textAlign: 'center'}}>{msg1}</p>
          <input type="text" ref={bnameRef} placeholder="Enter BusinessName" className="form-control" style={{borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem', marginTop: '50px'}}/>
          <br />
          <input type="text" ref={baddress} placeholder="Enter BusinessAddress" className="form-control" style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem'}} />
          <br />
          <input type="text" ref={bmob} placeholder="Enter BusinessContact" className="form-control" style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem'}} />
          <br />
          <input type="file" accept="image/*" ref={burl} onChange={(e) => handlefilechoose(e.target.value)} placeholder="Choose BusinessLogoUrl" className="form-control" style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem'}} />
          <br />
          <select className="form-control" ref={bid} value={selId} onChange={(e) => handleId(e.target.value)} style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem', background: 'transparent' }}>
            <option className="form-control">Plesase Select UserId</option>
            {
              userId.map((data) => {
                return <>
                  <option key={data._id} value={data._id} >
                    {data.name}
                  </option>
                </>
              })
            }
          </select>
          <br/><br/>
          <button type="submit" style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem', border: 'none', backgroundColor: 'navy', color: 'white', fontSize: '20px', fontWeight: 'bold'}}>Business</button>
        </form>
      </div>
    </div>
  )
};
export default Business;


