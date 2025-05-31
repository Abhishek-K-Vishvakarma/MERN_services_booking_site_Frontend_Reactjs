import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
const  UpdateBusiness = ()=>{
  const [business, setBusiness] = useState([]);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [ids, setIds] = useState();
  const b_nameRef = useRef();
  const b_addressRef = useRef();
  const b_contactRef = useRef();
  useEffect(()=>{
    fetch(`http://localhost:7207/api/getallbusiness`)
    .then(e=> e.json())
    .then((data)=>{
      console.log(data);
      setBusiness(data.data);
    })
  }, []);

  const handleSet = (id)=>{
     const businessid = business.find((u)=> u._id === id);
     setIds(businessid._id);
     console.log("businessid :", businessid);
     if(businessid){
       if (businessid) b_nameRef.current.value = businessid.business_name
       if (businessid) b_addressRef.current.value = businessid.address
       if (businessid) b_contactRef.current.value = businessid.business_contact
     }
  }

  const handleBusinessUpdate = async(e)=>{
    e.preventDefault();

    const businessObj = {
      business_name : b_nameRef.current.value,
      address : b_addressRef.current.value,
      business_contact : b_contactRef.current.value
    }
 
    try{
      const response = await fetch(`http://localhost:7207/api/updateBusiness/${ids}`,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(businessObj)
      });
      const businessData = await response.json();
      console.log("BusinessData", businessData);
      if(!response.ok){
         toast.error(businessData.message);
      }else{
        setMsg(businessData.message);
        setTimeout(()=>{
          setMsg("");
          navigate("/getBusiness");
        }, 3000);
      }
    }catch(error){
      console.log("Server error :", error);
    }
  }
  console.log(":",ids);
  return (
    <div style={{ background: 'url(https://t4.ftcdn.net/jpg/09/50/19/79/360_F_950197917_8jlXmDdb6uNMoteub41vDGd9CDCqJBmZ.jpg)', height: '911px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <Navbar className="bg-dark text-white">
        <Container>
          <Navbar.Brand className="text-white">BUSINESS UPDATION PAGE</Navbar.Brand>
          &nbsp;[ If you want toupdate your business Please choose your business data, for updation! ]
        </Container>
      </Navbar>
     <table className="table table-hover table-striped table-bordered">
      <thead>
       <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Updated Now!</th>
       </tr>
      </thead>
      <tbody>
          {
            business.map((ele) => {
              return <>
                <tr>
                  <td>{ele.business_name}</td>
                  <td>{ele.address}</td>
                  <td>{ele.business_contact}</td>
                  <td>
                    <button className="btn btn-info text-white" onClick={()=> handleSet(ele._id)}>Update Business</button>
                  </td>
                </tr>
              </>
            })
          }
      </tbody>
     </table>


     <div className="card" style={{width: '30rem', padding: '20px', margin: 'auto', background: 'transparent', backdropFilter: 'blur(20px)', height: '28rem', boxShadow: '0px 0px 5px 2px #fff'}}>
        <form onSubmit={handleBusinessUpdate}>
          {msg ? <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'green', textAlign: 'center' }}>{msg}</p> : <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', textAlign: 'center', boxShadow: '0px 0px 5px 2px #fff', padding: '10px'}}>Update Page</p>}
          <br/>
          <input type="text" ref={b_nameRef} placeholder="Enter BusinessName" className="form-control" style={{ padding: '10px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #fff', border: 'none'}}/>
         <br/>
          <input type="text" ref={b_addressRef} placeholder="Enter BusinessAddress" className="form-control" style={{ padding: '10px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #fff' , border: 'none'}} />
         <br/>
          <input type="text" ref={b_contactRef} placeholder="Enter BusinessContact" className="form-control" style={{ padding: '10px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #fff', border: 'none' }} />
         <br/><br/>
         <button type="submit" style={{width: '27.3rem', padding: '8px', border: 'none', boxShadow: '0px 0px 5px 2px #fff', background: 'transparent', color: 'white', fontSize: '20px', fontWeight: 'bold'}}>Save Changes</button>
       </form>
     </div>
     <ToastContainer/>
    </div>
  )
};

export default UpdateBusiness;
// http://localhost:7207/api/updateBusiness