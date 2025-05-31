import { useEffect, useState } from "react"
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

const Paymentmessage = () => {
  const [pay, setPay] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:7207/api/getpay")
    .then(e=> e.json())
    .then((data)=>{
      console.log(data.ids)
      setPay(data.ids)
    })
  }, []);
  return (
    <div>
      <Navbar className="bg-info">
        <Container>
          <Link to="/" style={{ color: 'black', textDecoration: 'none', fontSize: '20px' }}>Home <IoHomeSharp /></Link>
          <h4>Payment Paid Confirmation Message Page For Services!</h4>
        </Container>
      </Navbar>
      <div>
         {
          pay.map((ele)=>{
            return<>
              <div className="card" style={{fontSize: '14px',backgroundColor: '#123', color: 'white', width: '26.5rem', padding: '20px', height: '18rem', display: 'inline-block', margin: '20px', borderRadius: '0px', marginLeft: '30px', marginTop: '30px'}}>
                <h5>ⓘ Payment {ele.status} successfully message!</h5>
                <hr/>
                <p>Payment By : {ele.payment_method}</p>
                <p>Payment Status : {ele.status} <Link to="/payment"> [ paid from payment section ? ]</Link></p>
                <p style={{ border: '1px solid white', padding: '5px' }}>Payment ID : {JSON.stringify(ele.payment_id).slice(33, 37).padStart(32, 'x')} 🔑</p>
                <p>Paid amount : ₹{(ele.amount*87.19).toFixed(2)}</p>
            </div>
            </>
          })
         }
      </div>
    </div>
  )
}

export default Paymentmessage;
