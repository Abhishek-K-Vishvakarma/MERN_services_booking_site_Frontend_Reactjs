import { useEffect, useState } from "react"
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaPenToSquare } from "react-icons/fa6";

const GetBusiness = () =>{
const [send, setSend] = useState([]);

  useEffect(()=>{
    fetch(`http://localhost:7207/api/getallbusiness`)
    .then(e=> e.json())
    .then((data)=>{
      console.log(data);
      setSend(data.data)
    })
  }, []);


  const handleBusinessDelete = async(id)=>{
    try{
      const response = await fetch(`http://localhost:7207/api/delbusiness/${id}`,{
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json"
        }
      });
      const deldata = await response.json();
      console.log("Delete successfully!", deldata);
      setSend(send.filter(user=> user._id !== id));
    }catch(error){
      console.log("Error :", error);
    }
  }

  return (
    <div style={{background: 'url(https://static.vecteezy.com/system/resources/previews/008/969/361/non_2x/multi-layers-gray-blue-dark-texture-3d-papercut-layers-in-gradient-banner-abstract-paper-cut-art-background-design-for-website-template-topography-map-concept-or-smooth-origami-paper-cut-vector.jpg)', height: '911px', backgroundPosition: 'center', backgroundSize: 'cover'}}>
       <Navbar className="bg-dark" style={{boxShadow: '0px 0px 10px 5px white'}}>
        <Container>
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Admin</Link>
          <Navbar.Brand className="text-white">Business Page</Navbar.Brand>
          <Link to="/updateBusiness" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>UpdateBusiness <FaPenToSquare/></Link>
        </Container>
       </Navbar>
      <br/> 
      <div>
        {
          send.map((ele)=>{
            return <>
              <div className="card" style={{ width: '30rem', display: 'inline-block', margin: '70px', height: '17rem', position: 'relative', boxShadow: '0px 0px 5px 3px white',border: 'none', borderRadius: '0px'}}>
                <button onClick={() => handleBusinessDelete(ele._id)} style={{ background: 'transparent', border: 'none', width: '20px', fontSize: '20px', zIndex: '1', marginLeft: '22em', color: 'red', position: 'absolute'}}><MdOutlineDelete /></button>
                <div className="card" style={{position: 'absolute', width: '30rem', marginTop: '10rem', background: 'transparent', color: 'blue', border: 'none', borderRadius: '0px', padding: '10px'}}>
                  <p>Name : {ele.business_name}</p>
                  <p>Contact : {ele.business_contact}</p>
                  <p>Address : {ele.address}</p>
                </div>
                <div>
                  <img src={ele.logo_url} style={{width: '30rem', height: '17rem'}}/>
                </div>
            </div>
            </>
          })
        }
      </div>
    </div>
  )
}

export default GetBusiness;
