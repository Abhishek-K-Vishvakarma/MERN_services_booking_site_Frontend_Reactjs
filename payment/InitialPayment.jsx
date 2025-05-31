import { useEffect, useRef, useState } from "react"
import { Container, Navbar } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../src/Authentication";
const InitialPayment = () => {
  const [send, setSend] = useState([]);
  const methodRef = useRef();
  const appointIdRef = useRef();
  const amountRef = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msg1, setMsg1] = useState("");
  // const { paymentIDdata } = useAuth();
  const [method, setMethod] = useState("");
  const [method1, setMethod1] = useState("");
  const [method2, setMethod2] = useState("");
  const [method3, setMethod3] = useState("");
  const [method4, setMethod4] = useState("");
  const [method5, setMethod5] = useState("");
  const [search, setSearch] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:7207/api/getappoint")
    .then(e=> e.json())
    .then((data)=>{
      setSend(data.findAll);
      console.log("Data is :", data.findAll);
    }).catch(error=> console.log("Server error :", error));
  }, []);

  const handlePayment = async(e)=>{
    e.preventDefault();

    if (!appointIdRef.current.value || !amountRef.current.value || !methodRef.current.value){
      alert("All input field must be required!");
      return;
    }

    

    const paymentObj = {
      appointment_id : appointIdRef.current.value,
      amount : amountRef.current.value,
      payment_method : methodRef.current.value
    }
    console.log(appointIdRef.current.value);
    try{

      const response = await fetch(`http://localhost:7207/api/payment`, {
        method: 'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(paymentObj)
      })

      const res = await response.json();
      console.log("Payment created successfully! :",res);
      const payDatas = res.payment.payment_id
      console.log(payDatas);
      // paymentIDdata({payDatas});
      if(!response.ok){
        setMsg(res.message);
        setTimeout(()=>{
         setMsg("");
        }, 3000);
      }else{
        setMsg1(res.message);
        setTimeout(()=>{
          setMsg1("");
          navigate("/payment");
        }, 3000);
      }
    }catch(error){
      console.log("Server error :", error);
    }
  };

  console.log("send", send);

  const searchIds = send.filter(user=> user.status.toLowerCase().includes(search));

  return (
    <div style={{backgroundColor: 'navy', height: '2200px'}}>
      <Navbar className="bg-info">
        <Container>
          <Link to="/" style={{textDecoration: 'none', fontSize: '20px', color: 'white'}}>Home</Link>
          <h2>Payment Gateway!</h2>
        </Container>
      </Navbar>
      <br/>
      <Carousel style={{ height: '30rem'}}>
        <Carousel.Item interval={1000}>
          <img src="https://www.phonepe.com/webstatic/8834/static/bab93065eae063d167f5ea2699093877/77430/hp-banner-pg.webp" style={{width: '100%'}}/>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img src="https://www.phonepe.com/webstatic/8834/static/02bd961b06ce9f6e41f6d5e820c758c2/628b0/hp-banner-pb.webp" style={{ width: '100%' }} />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img src="https://www.phonepe.com/webstatic/8834/static/92b0e19282c7abbad37c6b0acf778876/b912d/hp-banner-indus-desktop.webp" style={{ width: '100%' }} />
        </Carousel.Item>
      </Carousel>
      <h2 style={{position: 'absolute', textAlign: 'center', backgroundColor: '#cc0c39', width: '100%', top: '45rem', color: 'white', padding: '5px'}}>Payment Section</h2>
      <div style={{ position: 'relative', display: 'flex', top: '15rem', gap: '20px', justifyContent: 'center' }}>
        <p style={{ textAlign: "center", color: 'red', fontSize: '20px', fontWeight: 'bold' }}>{msg}</p> <p style={{ textAlign: "center", color: 'green', fontSize: '20px', fontWeight: 'bold' }}>{msg1}</p>
        <form onSubmit={handlePayment} className="card" style={{width: '30rem', height: '30rem', padding: '25px', borderRadius: '0px'}}>
          <h4 style={{ backgroundColor: '#cc0c39', color: 'white', padding: '15px', textAlign: 'center', boxShadow: '0px 0px 5px 2px #999' }}>Payment Page</h4>
             <br/>
          <input type="text" ref={methodRef} value={method || method1 || method2 || method3 || method4 || method5} placeholder="Enter Payment-Method" className="form-control" style={{padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999'}}/>
               <br/>
          <input type="text" ref={amountRef} placeholder="Enter Payment-Amount" className="form-control" style={{ padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999' }} />
               <br/>
          <select type="text" ref={appointIdRef} className="form-control" style={{ padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999' }}>
                <option>Choose Appointment-ID</option>
                {
                 send.map((ele)=>{
                  return <>
                  <div>
                      {
                        (ele.status === "Scheduled" || ele.status === "Pending") ? <option>{ele._id}</option> : null
                      }
                  </div>
                  </>
                 })
                }
               </select>
               <br/><br/>
          <button type="submit" style={{ color: 'white', backgroundColor: 'navy', padding: '15px', border: 'none', boxShadow: '0px 0px 5px 2px #999' }}>PayNow!</button>
            </form>
        <div className="card" style={{width: '35rem', height: '22rem', padding: '25px', borderRadius: '0px'}}>
          <h4 style={{ backgroundColor: '#cc0c39', color: 'white', padding: '15px', textAlign: 'center', boxShadow: '0px 0px 5px 2px #999' }}>Payment Mode</h4>
          <br />
          <div style={{
            position: 'absolute', top: '8rem', left: '3em', boxShadow: '0px 0px 5px #999', padding: '25px', gap: '20px'}}>
            <button onClick={() => setMethod("Google Pay 🇬")} style={{ background: 'transparent', border: 'none', marginLeft: '10px' }}><img src="https://img.lovepik.com/png/20231120/google-pay-icon-vector-shop-website-network_642923_wh1200.png" style={{ width: '4rem', height: '4rem', borderRadius: '50%', boxShadow: '0px 0px 5px 2px #999'}} /></button>
            <button onClick={() => setMethod1("Phone Pay पे")} style={{ background: 'transparent', border: 'none', marginLeft: '20px' }}><img src="https://mir-s3-cdn-cf.behance.net/projects/404/f792f0116942453.Y3JvcCw4MDgsNjMyLDAsMA.png" style={{ width: '4rem', height: '4rem',borderRadius: '100%', boxShadow: '0px 0px 5px 2px #999' }}/></button>
            <button onClick={() => setMethod2("Paytm 🇵")} style={{ background: 'transparent', border: 'none', marginLeft: '20px' }}><img src="https://static.vecteezy.com/system/resources/thumbnails/019/909/641/small/paytm-transparent-paytm-free-free-png.png" style={{ width: '4rem', borderRadius: '50%', boxShadow: '0px 0px 5px 2px #999' }} /></button>
            <br/><br/>
            <button onClick={() => setMethod3("Debit Card 🪪")} style={{ background: 'transparent', border: 'none' }}><img src="https://www.53.com/content/dam/fifth-third/campaign/credit-card/pref-credit-card.png" style={{ width: '5rem', boxShadow: '0px 0px 5px 2px #999'}} /></button>
            <button onClick={() => setMethod4("UPI🆙")} style={{ background: 'transparent', border: 'none', fontSize: '35px', boxShadow: '0px 0px 5px 2px #999', borderRadius: '45%', marginLeft: '25px' }}>🆙</button>
            <button onClick={() => setMethod5("Bank🏛️")} style={{ background: 'transparent', border: 'none', fontSize: '35px', boxShadow: '0px 0px 5px 2px #999', borderRadius: '45%', marginLeft: '30px'}}>🏛️</button>
            <img src="https://getlogo.net/wp-content/uploads/2020/10/unified-payments-interface-upi-logo-vector.png" style={{ width: '5rem', marginLeft: '4rem'}}/> 
         </div>
        </div>
      </div>
      <div style={{marginTop: '25rem', width: '100%', padding: '50px'}}>
        <h4 className="bg-info text-center p-2">If you want to Id of appoinment for appointment payment gateway!</h4>
        <br/><br/>
        <h4 className="text-white">Search Appointment ID (Status - Pending)...</h4>
        <input type="text" placeholder="Search..." onChange={(e)=> setSearch(e.target.value)} style={{padding: '15px', width: '35rem', boxShadow: '0px 0px 5px 2px white', border: 'none'}}/>
        <br/><br/>
       <div>
          {
            searchIds.length > 0 ?
              (
                searchIds.map((ele) =>{
                  return <>
                    <div>
                     {
                      (ele.status === "Pending") ? <option className="text-warning">AppointmentID : {ele._id} || {ele.status}</option> : null
                     }
                    </div>
                  </>
                })
              )
              :
              (
                <p style={{color: 'white', textAlign: 'center'}}>Appointment specific ids not found!</p>
              )
          }
       </div>
        <div className="card" style={{padding: '20px', marginTop: '20px', borderRadius: '0px'}}>
          <h4>Access Indivisual Appointment ID for Payment process:</h4>
          <br />
          <p>Hey User!</p>
          <p>If you want to pay of Payment for appoinment booking for services, Then<mark>Choose appoinment ID</mark>
            and payment method be completed.
          </p>
          <br />
          <h4>Match Id Indivisualy:</h4>
          <p>User! please matched your appoinment id then pick id for done payment process.</p>
          <h4>How to use of appointment Id</h4>
          <p>Serach appintment id in input field by <mark>Status Pending State</mark>
            Then showing appoinment Id after than pick Id and put into Appointment Id section.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InitialPayment
