import { useEffect, useState } from "react";
import { useAuth } from "../Authentication";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
// import { FaHome } from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';
import { SiUnity } from "react-icons/si";

const Addtocart = () => {
  const { addsend } = useAuth();
  const [get, setGet] = useState([]);
  const [cart, setCart] = useState(true);
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)){
          setGet(parsedCart);
        } else {
          setGet([]);
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setGet([]);
      }
    }
  }, [addsend]);


  const handleDelete = (id) =>{
    const updatedCart = get.filter((item) => item && item._id !== id);
    setGet(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  console.log("Add to cart :", addsend);

  const getdata =  get.map((data)=>{
      return parseInt(data.price);  
   });
   
  useEffect(()=>{
  const timer = setTimeout(()=>{
  setCart(false);
  }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(()=>{
   let timeUp = setTimeout(()=>{
       setShow(false);
   }, 10000);
   return ()=> clearTimeout(timeUp);
  }, []);

  const sum = 0;
  const total = getdata.reduce((acc, item) => acc + item, sum);
  console.log("Total Price :", total);
  return (
    <div>
      {
        cart ?
        <div style={{backgroundColor: 'black', height: '911px'}}>
          <h2 style={{color: 'white',  marginTop: '25rem', position: 'absolute', marginLeft: '35rem'}}>Welcome to Cart Page, View your one more services!</h2>
        </div>
        :
          <div style={{ backgroundColor: '#0d89', height: '911px'}}>
            <Navbar style={{background: 'navy',  color: 'white'}}>
              <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0px 0px 5px 2px #999', padding: '6px 10px', marginLeft: '2rem'}} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home Dashboard</Link>
              <h4 style={{ marginLeft: '4rem' }}>Check out your added services</h4>
            </Navbar>
           {
              show ? 
              <Alert className="container" variant="success" style={{zIndex: '1', position: 'absolute', left: '20rem', top: '20rem', height: '20rem', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999'}} dismissible>
                  <Alert.Heading>🛒 Service Booking Cart</Alert.Heading>
                <p>
                    Almost done! Your selected services are reserved temporarily.
                </p>
                <br/>
                  <h4>Time-Sensitive Messaging</h4>
                  <p>Dispatch slot reservation duration in 15 minutes.
                    Show selected time slots prominently.
                  </p>
                  <br/>
                  <h4>My Services booking site :  green services, instant dispatch</h4>
              </Alert>
              :
              null
           }
            <div className="card" style={{ width: '20rem', height: "10rem", marginTop: '1rem', padding: '10px', borderRadius: '0px' }}>
              <p style={{ color: 'white', backgroundColor: '#cc0c39', width: '9rem', textAlign: 'center', marginLeft: '10rem', fontWeight: 'bold', fontSize: '11px', padding: '5px' }}>Limited Time Deal</p>
              <img src="bag.svg" style={{ width: '20px' }} />
              <p style={{ color: 'green', fontWeight: 'bold' }}>Cart Subtotal Price</p>
              <p style={{ fontWeight: 'bold' }}>Subtotal (Price): ₹{(total * 87.19).toFixed(2)}</p>
            </div>
            <div>
              {get.length > 0 ? (
                get
                  .filter((data) => data !== null && data !== undefined)
                  .map((data) => (
                    <div key={data._id} className="card" style={{ width: "25rem", height: "26rem", padding: '20px', display: 'inline-block', margin: '30px', borderRadius: '0px' }}>

                      <img src={data.service_img} style={{ width: "10rem", height: '10rem', textAlign: "center", marginLeft: "100px", marginTop: "10px", cursor: 'pointer', boxShadow: '0px 0px 5px 2px #999' }} alt="Service" title="Installation Services" />
                      <p style={{ color: 'green', marginLeft: '17rem', marginTop: '-10rem', position: 'absolute', fontSize: '18px', fontWeight: 'bold' }}><img src="badge.svg" /> Instock</p>
                      <br />
                      <p style={{ fontSize: "15px", fontWeight: "bold" }}>  Name: {data.service_name} </p>
                      <p style={{ fontSize: "15px", fontWeight: "bold" }}>  Price: ₹{(data.price * 87.19).toFixed(2)}</p>
                      <p style={{ fontSize: "15px", fontWeight: "bold" }}> Description: {data.description} </p>
                      <button onClick={() => handleDelete(data._id)} className="btn btn-danger" style={{ width: '100%', overflow: 'hidden' }}>Delete</button>
                    </div>
                  ))
              ) : (
                <p style={{ color: 'white' }}>No items in cart</p>
              )}
            </div>
          </div>
      }
    </div>
  );
};

export default Addtocart;
