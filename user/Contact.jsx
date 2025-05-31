import { Navbar } from "react-bootstrap";
import { LuCircleUser } from "react-icons/lu";
const Contact = () => {

  return (
    <div style={{ backgroundColor: '#1e88e5', height: '911px'}}>
      <Navbar className="bg-info">
        <Navbar.Brand>Contact Page</Navbar.Brand>
      </Navbar>
      <div className="card" style={{width: '26rem', height: '12rem', position: 'relative', left: '40%', top: '10%', boxShadow: '0px 0px 10px 1px blue', borderRadius: '10px', backgroundColor: 'white'}}>
        <div className="card" style={{ width: '10rem', height: '10rem', borderRadius: '50%', marginLeft: '7.5rem', marginTop: '-70px' , boxShadow: '0px 0px 10px 1px blue'}}>
          <p><LuCircleUser style={{fontSize: '10rem', color: 'blue'}}/></p>
          </div>
        <div className="card" style={{ border: 'none', fontWeight: 'bold', padding: '15px', boxShadow: '0px 0px 10px 1px blue'}}>
          <p>Admin Name: Admin Parker</p>
          <p>Email address: admin@gmail.com</p>
          <p>Contact info: +91 9876545678</p>
        </div>
      </div>
    </div>
  )
}

export default Contact;
