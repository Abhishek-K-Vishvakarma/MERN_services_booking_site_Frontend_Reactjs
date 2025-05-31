import { useEffect, useState } from "react";
import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const Getservices = () => {
  const [send, setSend] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:7207/api/getservice`)
    .then(e=> e.json())
    .then((data)=>{
      console.log("Services :", data.serviceId);
      setSend(data.serviceId);
    })
  }, []);

  const handleDelete = async(id)=>{
    try{
      const response = await fetch(`http://localhost:7207/api/delservice/${id}`, {
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json"
        }
      });
      const delData = await response.json();
      setSend(send.filter(user=> user._id !== id));
      console.log("Service deleted successfully! :", delData);
      alert("Sevices deleted successfully!");
    }catch(error){
      console.log("Server Error :", error);
    }
  }

  return (
    <div style={{ background: 'url(https://png.pngtree.com/thumb_back/fh260/background/20241209/pngtree-plain-green-wall-background-with-a-chair-table-and-plant-vase-image_16759063.jpg)', height: '911px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
      <Navbar style={{backgroundColor: 'navy'}}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/admin" style={{textDecoration: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold'}}>Admin</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3 className="text-white">Top Services Available...</h3>
      </Navbar>
      <div>
        {
          send.map((data)=>{
            return<>
              <div className="card" style={{ width: '28rem', height: '27rem', fontSize: '15px', fontWeight: 'bold', margin: '14px', marginTop: '20px', padding: '5px', display: 'inline-block', borderRadius: '0px'}}>
                <p style={{color: 'yellow', backgroundColor: 'navy', textAlign: 'center', padding: '5px'}}>Service</p>
                <img src={data.service_img} style={{width: '10rem', height: '9rem', boxShadow: '0px 0px 5px 2px #999', marginLeft: '8rem'}}/>
                <br/><br/>
                <p>Name : {data.service_name}</p>
                <p>Price : ₹{(data.price * 87.19).toFixed(2)}</p>
                <p>Description : {data.description}</p>
                <button onClick={()=> handleDelete(data._id)} className="btn btn-danger">Delete</button>
            </div>
            </>
          })
        }
      </div>
    </div>
  )
}

export default Getservices
