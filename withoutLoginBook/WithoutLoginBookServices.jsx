import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WithoutLoginBookServices = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:7207/api/getservice')
    .then(e=> e.json())
    .then((data)=>{
      console.log(data);
      setData(data.serviceId);
    })
  }, []);



  return (
    <div>
      <h2>Welcome to Services Booking site!</h2>
      <div>
        {
          data.map((ele)=>{
            return<>
            <div className="card" style={{width: '27rem', height: '27rem', padding: '35px', display: 'inline-block', margin: '20px'}}>
                <img src={ele.service_img} style={{ width: '150px', height: '150px' }}/>
                <p>ServiceName : {ele.service_name}</p>
                <p>Price : {ele.price}</p>
                <p>Description : {ele.description}</p>
                <hr/>
                <button style={{backgroundColor: 'orange', border: 'none', borderRadius: '20px', padding: '5px 20px'}} onClick={()=> navigate('/login')}>Book Service</button>
            </div>
            </>
          })
        }
      </div>
    </div>
  )
}

export default WithoutLoginBookServices;
