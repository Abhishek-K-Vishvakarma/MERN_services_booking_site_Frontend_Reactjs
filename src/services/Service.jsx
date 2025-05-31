import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {Navbar, Container} from 'react-bootstrap';
const Service = () => {
  const s_name = useRef();
  const s_description = useRef();
  const s_price = useRef();
  const s_business_id = useRef();
  const s_subcategory_id = useRef();
  const s_imageRef = useRef();
  const [busi, setBusi] = useState([]);
  const [sub, setSub] = useState([]);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    fetch("http://localhost:7207/api/subget")
    .then(e=> e.json())
    .then((data)=>{
      setSub(data.subGet);
     console.log("Sub", data);
    })
  }, []);

  useEffect(() => {
    fetch(" http://localhost:7207/api/getallbusiness")
      .then(e => e.json())
      .then((data) => {
        setBusi(data.data);
        console.log("Busi", data);
      })
  }, []);



  const handleService = async (e) => {
    e.preventDefault();

    const file = s_imageRef.current.files[0];

    const formData = new FormData();
    formData.append("service_name", s_name.current.value);
    formData.append("description", s_description.current.value);
    formData.append("price", parseInt(s_price.current.value));
    formData.append("business_id", s_business_id.current.value);
    formData.append("subcategory_id", s_subcategory_id.current.value);
    formData.append("logo", file);


    try {
      const response = await fetch("http://localhost:7207/api/service",{
        method: "POST",
        body: formData
      });
      const serviceData = await response.json();
      console.log("Service created successfully!", serviceData);
      if(!response.ok){
         toast.error(serviceData.message);
      }else{
        setMsg(serviceData.message);
        setTimeout(()=>{
               setMsg("");
               navigate("/admin");
        }, 3000);
      }
    } catch (error) {
      console.log("Server Error :", error);
    }
  }

  return (
    <div style={{ background: 'url(https://pabau.com/wp-content/uploads/2021/02/get-more-bookings.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '911px'}}>
      <Navbar style={{backdropFilter: 'blur(40px)', boxShadow: '0px 0px 5px 3px white'}}>
        <Container>
          <h2 className="text-white">SERVICE CREATE PAGE</h2>
        </Container>
      </Navbar>
      <div className="card" style={{ width: '30rem', height: '44rem', position: 'absolute', top: '7em', padding: '20px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #fff', left: '45rem', background: 'transparent'}}>
        <h4 style={{ color: 'white', backgroundColor: '#cc0c39', textAlign: 'center', padding: '15px', boxShadow: '0px 0px 5px 2px #999' }}>SERVICES PAGE</h4>
        <form onSubmit={handleService}>
          <p style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'green'}}>{msg}</p>
          <br/>
          <input type="text" ref={s_name} placeholder="Enter ServiceName" className="form-control" style={{borderRadius: '0px',padding: '12px', boxShadow: '0px 0px 5px 2px #999', background: 'transparent', color: 'white', fontSize: '20px', backdropFilter: 'blur(20px)'}}/>
          <br />
          <input type="text" ref={s_description} placeholder="Enter ServiceDescription" className="form-control" style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', background: 'transparent', color: 'white', fontSize: '20px', backdropFilter: 'blur(20px)' }} />
          <br />
          <input type="text" ref={s_price} placeholder="Enter ServicePrice" className="form-control" style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', background: 'transparent', color: 'white', fontSize: '20px', backdropFilter: 'blur(20px)' }} />
          <br />
          <select ref={s_business_id} className="form-control" style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', background: 'transparent', fontSize: '20px', backdropFilter: 'blur(20px)' }}>
                 <option>Choose BusinessId</option>
                 {
                  busi.map((ele)=>{
                    return<>
                      <option value={ele._id}>{ele.business_name}</option>
                    </>
                  })
                 }
          </select>
          <br/>
          <select ref={s_subcategory_id} className="form-control" style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', background: 'transparent', fontSize: '20px', backdropFilter: 'blur(20px)' }}>
            <option>Choose subcategoryId</option>
            {
              sub.map((ele) => {
                return <>
                  <option value={ele._id}>{ele.subcategory_name}</option>
                </>
              })
            }
          </select>
          <br/>
          <input type="file" accept="image/*" ref={s_imageRef} style={{ borderRadius: '0px', padding: '15px 72px', boxShadow: '0px 0px 5px 2px #999', color: 'white', backdropFilter: 'blur(20px)' }} />
          <br/><br/>
          <button type="submit"  style={{ borderRadius: '0px', padding: '15px 11rem', boxShadow: '0px 0px 5px 2px #999', backgroundColor: 'navy', border: 'none', color: 'white', fontSize: '20px'}}>SERVICES</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Service;
