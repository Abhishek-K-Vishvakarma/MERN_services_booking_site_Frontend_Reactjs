import { Navbar, Nav, Offcanvas, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Authentication';
import { IoIosList } from "react-icons/io";
import { PiUserListLight } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import Carousel from 'react-bootstrap/Carousel';
import { FaFacebook } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { LuCircleUser } from "react-icons/lu";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { TiShoppingCart } from "react-icons/ti";
import { MdPhone } from "react-icons/md";
import { FaServicestack } from "react-icons/fa6";
import { VscMenu } from "react-icons/vsc";
import { CgMenuGridO } from "react-icons/cg";
import { FcApproval } from "react-icons/fc";
import { RiMessage2Fill } from "react-icons/ri";
import { HiOutlineRefresh } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";
// import { IoStarHalf } from "react-icons/io5";
import { IoLogoBuffer } from "react-icons/io";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaPerbyte } from "react-icons/fa6";
import { SiUnity } from "react-icons/si";
import './para.css';
const Home = () => {
  const { user, addsend } = useAuth();
  const [show, setShow] = useState(false);
  const [send, setSend] = useState([]);
  const [show1, setShow1] = useState(false);
  const [serve, setServe] = useState([]);
  const [showtime, setShowTime] = useState(true);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const navigate = useNavigate();
  const [udata, setUData] = useState([]);
  const [get, setGet] = useState([]);
  const [getusers, setGetUsers] = useState();
  const [ datatime, setTimeData] = useState(0);
  // const [rate, setRate] = useState([]);
  // const [prog, setProg] = useState({1:0, 2:0, 3:0, 4:0, 5:0});
  // const now = 60;

  useEffect(() => {
    fetch(`http://localhost:7207/api/getallbusiness`)
      .then(e => e.json())
      .then((data) => {
        console.log("Business :",data.data);
        setSend(data.data);
      })
  }, []);

  useEffect(()=>{
    fetch("http://localhost:7207/api/getservice")
    .then(e=> e.json())
    .then((data)=>{
      console.log("Service :", data.serviceId);
      setServe(data.serviceId);
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:7207/api/getappoint')
      .then(e => e.json())
      .then((data) => {
        console.log("Get appointment :", data);
        setGet(data.findAll);
      }).catch(error => console.log('Server error:', error));
  }, []);
  console.log("Send :", send);
  useEffect(() => {
    fetch('http://localhost:7207/api/alluser')
      .then(response => response.json())
      .then((users) => {
        // const data = users.find(u => u);
        // console.log("Data is", data._id)
        setUData(users);
        console.log(users);
      })
      .catch(err => console.log("Error fetching users:", err));
      
  }, []);
 
  const handleRefresh = ()=>{
        navigate(0);
  }
  console.log(udata);
  useEffect(()=>{
    let interval = setInterval(()=>{
    setTimeData((prev)=>{
      if(prev >= 100){
         clearInterval(interval)
         setShowTime(false);
         return 100;
      }
      return prev + 30;
    });
    }, 350);
    return () => clearInterval(interval);
  }, []);

  
  //  useEffect(()=>{
  //    fetch(`http://localhost:7207/api/reviewget`)
  //    .then(e=> e.json())
  //    .then((data)=>{
  //      setRate(data.reviews);
  //      console.log("Rewiew", data.reviews);
  //      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  //      data.reviews.forEach(review=>{
  //       const roundRating = Math.round(review.rating);
  //       distribution[roundRating]++;
  //      })
  //      setProg(distribution);
  //    })
  //  }, []);

  //  const totalReviews = rate.length;
  //  const getPercentage = (count)=>{
  //   return totalReviews ? Math.round((count / totalReviews)*100) : 0;
  //  }

   useEffect(()=>{
     fetch(`http://localhost:7207/api/total`)
     .then(e=> e.json())
     .then((data)=>{
          setGetUsers(data)
     })
   }, []);
  // console.log("Prog :", prog);
  return (
    <div>
      {
        showtime
        ?
        <div style={{color: 'white', textAlign: 'center', backgroundColor: 'black', height: '911px', position: 'relative'}}>
            <h2 style={{ marginTop: '16rem', position: 'absolute', marginLeft: '49rem' }}>Welcome to home page!</h2>
            <p style={{marginTop: '23rem', position: 'absolute', marginLeft: '50rem'}}>
              <h2>Loading...</h2>
              <ProgressBar variant='light' now={datatime} label={`${ datatime }%`} visuallyHidden style={{ width: '20rem', height: '50px', border: '2px solid white', borderRadius: '0px', background: 'none'}} />
            </p>
        </div>
        :
          <div>
            {
              !user ?
                <div style={{ backgroundColor: 'lightblue', textAlign: 'center', color: 'black', height: '911px' }}>
                  <div>
                    <Navbar style={{ position: 'fixed', top: '0px', width: '100%', zIndex: '1', backgroundColor: 'navy' }}>
                      <Navbar.Brand href="#home" style={{ color: 'white' }}>User Dashboard</Navbar.Brand>
                      <Nav>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link to="/contact" style={{ textDecoration: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>CONTACT US<MdPhone /></Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link to="/without" style={{ textDecoration: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>SERVICES <FaServicestack /></Link>
                      </Nav>
                    </Navbar>
                  </div>
                  <Carousel data-bs-theme="dark" style={{ height: '60rem', marginTop: '3.9rem'}}>
                    <Carousel.Item interval={1000}>
                      <img
                        className="d-block w-100"
                        style={{ height: '53rem' }}
                        src="https://img.freepik.com/premium-vector/plumber-services-cartoon-web-with-text_82574-12515.jpg"
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                      <img
                        className="d-block  w-100"
                        style={{ height: '53rem' }}
                        src="https://cdn.vectorstock.com/i/500p/50/41/handy-men-installation-and-repair-air-conditioner-vector-26365041.jpg"
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                      <img
                        className="d-block w-100"
                        style={{ height: '53rem' }}
                        src="https://img.freepik.com/premium-vector/professional-home-cleaning-services-cleaning-every-part-house-mopping-floor-cleaning-window-illustration_142963-465.jpg"
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  <h2>Find all services... </h2>
                  <br/>
                  <div>
                    Back to <Link to="/login">Login</Link>
                  </div>
                  <div>
                    {
                      serve.map((ele) => {
                        return <>
                          <div className='card' style={{ width: '23rem', height: '27rem', fontWeight: 'bold', padding: '25px', marginTop: '18rem', boxShadow: '0px 0px 10px 2px #888', display: 'inline-block', margin: '20px', overflow: 'hidden' }}>
                            <p><img src={ele.service_img} style={{ width: '11rem', height: '10rem', boxShadow: '0px 0px 10px 2px #999' }} /></p>
                            <p>Name: {ele.service_name}</p>
                            <p>Price: ₹{(ele.price * 87.19).toFixed(2)}</p>
                            <p>Description: {ele.description}</p>
                          </div>
                        </>
                      })
                    }
                  </div>
                </div>
                :
                <div>
                  <div>
                    <Navbar style={{ position: 'fixed', top: '0px', width: '100%', zIndex: '1', backgroundColor: 'navy' }}>
                      
                      <h2 style={{ color: 'white' }}><SiUnity style={{fontSize: '80px'}}/> Home Dashboard</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/usercategory" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white', padding: '5px 10px' }}>CATEGORYLIST <IoLogoBuffer/></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/usersubcategory" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white', padding: '5px 10px' }}>SUBCATEGORYLIST <FaPerbyte/></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/addtocart" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white', padding: '5px 10px' }}>ADDTOCART</Link>
                      <TiShoppingCart style={{ fontSize: '25px', color: 'white' }} /><p title='Not found addtocart data' style={{ marginTop: '-20px', marginLeft: '-17px', fontSize: '20px', color: 'red' }}>{addsend.length}</p>
                      <button onClick={handleRefresh} style={{ background: 'transparent', marginLeft: '10rem', border: 'none', color: 'white', fontWeight: 'bold'}}>Refresh <HiOutlineRefresh /></button>
                      <Nav>
                         <div>
                        </div>
                        <p style={{ color: 'white', marginLeft: '20rem', fontWeight: 'bold' }} >Profile &nbsp;<LuCircleUser style={{ fontSize: '40px', cursor: 'pointer' }} onMouseOver={handleShow} /></p>
                        <Offcanvas show={show} onHide={handleClose} style={{ width: '30rem', height: '26rem', marginLeft: '68rem', marginTop: '40px', padding: '20px', backgroundColor: 'navy', color: 'white', boxShadow: '0px 0px 6px 1px #fff' }}>
                          <h2 style={{margin: 'auto', fontSize: '60px', borderRadius: '20%', boxShadow: '0px 0px 5px 2px #999', padding: '10px'}}>👨🏻‍💻</h2>
                          <hr/>
                          {
                            udata.map((ele)=>{
                              return<>
                              {
                                (ele.email === user.email) ? <p style={{color: 'white', fontSize: '20px', fontWeight: 'bold'}}>User Name : {ele.name}</p> : null
                              }
                              </>
                            })
                          }
                          {user ? <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Email :  {user.email}</p> : <p style={{ color: 'red' }}>Please log in.</p>}
                          <Link to="/register" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white', fontSize: '20px'}}>Registration <PiUserListLight /></Link>&nbsp;
                          <Link to="/logout" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white', fontSize: '20px' }}>Logout <MdLogout /></Link>&nbsp;
                          <DropdownButton id="dropdown-basic-button" title="Setting" variant='outline-info'>
                            <Dropdown.Item><Link to="/forgot" style={{ color: 'red', textDecoration: 'none', fontWeight: 'bold', borderRadius: '0px'}} className="btn btn-warning"> Forgot Password ?</Link></Dropdown.Item>
                          </DropdownButton>
                        </Offcanvas>
                      </Nav>
                    </Navbar>
                  </div>
                  <br />
                  <br />
                  <div style={{ position: 'absolute', top: '25rem', left: '19rem', color: 'white' }}>
                    <h1>Welcome to top most popular services site, Book my services to your according</h1>
                    <br />
                    <Link to='/getuserservice' id='para' style={{ marginLeft: '36rem', border: '2px solid white', width: '15rem', padding: '10px', textAlign: 'center', textDecoration: 'none', fontSize: '20px'}}>View all my services...</Link>
                  </div>
                  <div>
                    <img src='https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' style={{ width: '100%', height: '53.7rem' }} />
                    <button onClick={handleShow1} style={{ background: 'none', border: 'none', top: '15rem', zIndex: '2', color: 'blue', backgroundColor: '#455', width: '100%', padding: '20px'}}><VscMenu style={{ fontSize: '35px', color: '#fff'}} /></button>
                    <Offcanvas show={show1} onHide={handleClose1} style={{ width: '20rem', backgroundColor: '#aa99', boxShadow: '0px 0px 2px 1px white'}}>
                      <Offcanvas.Header closeButton>
                        <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Menu <CgMenuGridO /></p>
                      </Offcanvas.Header>
                      <hr style={{ color: 'blue', boxShadow: '0px 0px 5px 5px white'}} />
                      <Offcanvas.Body>
                        <Link to="/getappoint" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0px 0px 3px 2px white', padding: '5px 30px' }}><Badge>{get.length}</Badge> View Appointment <FcApproval style={{ boxShadow: '0px 0px 3px 2px blue' }} /></Link><br /><br />
                        <Link to="/paymessage" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0px 0px 3px 2px white', padding: '5px 81px' }}>Messages <RiMessage2Fill style={{ boxShadow: '0px 0px 3px 2px blue' }} /></Link><br /><br />
                        <Link to="/getdata" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0px 0px 3px 2px white', padding: '5px 86px' }}>LISTING <IoIosList style={{ boxShadow: '0px 0px 3px 2px blue' }} /></Link><br/><br/>
                      </Offcanvas.Body>
                    </Offcanvas>
                    </div>
                    <br />
                    <br />
                    <div className='container'>
                    <br />
                    <h2 style={{ fontWeight: 'bold' }}>Find and book services...</h2>
                    <br />
                    <h3 style={{ fontWeight: 'bold' }}>Top Services...</h3>
                    <br />
                    <div style={{width: '62rem', display: 'inline-block'}}>
                      <div className='card' style={{ border: 'none' }}>
                        <div className='row'>
                          <div className='col-4'>
                            <img className='card' style={{ width: '20rem', height: '12rem', boxShadow: '0px 0px 5px 2px #999' }} src='https://freshysites.com/wp-content/uploads/house-cleaning.jpg' />
                            <p>House Cleaning</p>
                          </div>
                          <div className='col-4'>
                            <img className='card' style={{ width: '20rem', height: '12rem', boxShadow: '0px 0px 5px 2px #999' }} src='https://media.istockphoto.com/id/1221974656/photo/asian-woman-wearing-rubber-protective-gloves-cleaning-kitchen-cupboards-in-her-home-during.jpg?s=612x612&w=0&k=20&c=yubOtg_8-L1K4mi_aWdstCVGFNlhT1WQeWMDbhPVt9s=' />
                            <p>Kitchen Cleaning</p>
                          </div>
                          <div className='col-4'>
                            <img className='card' style={{ width: '20rem', height: '12rem', boxShadow: '0px 0px 5px 2px #999' }} src='https://airtasker-seo-assets-prod.s3.amazonaws.com/en_AU/1646351181982_a-bearded-man-assembling-a-small-cabinet.jpg' />
                            <p>Furniture Assembling</p>
                          </div>
                        </div>
                      </div>

                      <div className='card' style={{ border: 'none' }}>
                        <div className='row'>
                          <div className='col-4'>
                            <img className='card' style={{ width: '20rem', height: '12rem', boxShadow: '0px 0px 5px 2px #999' }} src='https://atharvitsolutions.com/wp-content/uploads/2022/02/Interior-Design-Site.webp' />
                            <p>Interior Design</p>
                          </div>
                          <div className='col-4'>
                            <img className='card' style={{ width: '20rem', height: '12rem', boxShadow: '0px 0px 5px 2px #999' }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVjhiipozhTiPclDUfrsVYqdvKjvhzHyCLqA&s' />
                            <p>Full Body Massage</p>
                          </div>
                          <div className='col-4'>
                            <img className='card' style={{ width: '20rem', height: '12rem', boxShadow: '0px 0px 5px 2px #999' }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd8CZ13kKilk9uLS5Wt0HTM2WTY3yKFWNCWA&s' />
                            <p>Facial & Skin Treatments</p>
                          </div>
                        </div>
                      </div>
                      <div className='card' style={{width: '30rem', height: '15rem', position: 'position', left: '68rem', top: '-29rem', textAlign: 'center'}}>
                        <h2>Rating and Users</h2>
                        <hr/>
                        <p style={{fontSize: '20px'}}>
                          <HiUserGroup /> {getusers?.totalUsers}
                          <p>Globally Users</p>
                        </p>
                        <p style={{ fontSize: '20px'}}>
                          {/* <IoStarHalf />{prog[5]} */}
                          <p>Service Rating</p>
                        </p>
                      </div>
                    </div>
                    <h2>Rating & Review From Users:</h2>
                    <br />
                    {/* {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="d-flex align-items-center mb-2">
                        <div className="star-label me-2" style={{ width: '30px' }}>
                          {star} ★
                        </div>
                        <ProgressBar
                          now={getPercentage(prog[star])}
                          label={`${ getPercentage(prog[star]) }%`}
                          variant='dark'
                          style={{ height: '12px', width: '100%', borderRadius: '10px' }}
                        />
                        <div className="count-label ms-2" style={{ width: '50px' }}>
                          ({prog[star]})
                        </div>
                      </div>
                    ))} */}
                    <div className="mt-3 text-muted">
                      {/* Based on {totalReviews} customer reviews */}
                    </div>
                    <br />
                   </div>
                   <br />
                   <div style={{ backgroundColor: 'lightgrey', textAlign: 'center', color: 'black' }}>
                    <h2>Contact Us
                      <p style={{ width: '0', height: '2px', backgroundColor: 'blue', margin: 'auto' }}></p>
                    </h2>
                    <br />
                    <div className='row'>
                      <div className='col-3'>
                        <h4>Company</h4>
                        <Link to="/about" style={{ textDecoration: 'none', color: 'black' }}>About Us</Link>
                        <br />
                        <p>Terms & Conditions</p>
                        <p>Privacy & Policy</p>
                        <p>Anti-discrimination policy </p>
                      </div>
                      <div className='col-3'>
                        <h4>For customers</h4>
                        <p>Categories near you</p>
                        <p>Contact us</p>
                      </div>
                      <div className='col-3'>
                        <h4>For Portners</h4>
                        <p>Register as a professional </p>
                      </div>
                      <div className='col-3'>
                        <h4>Social links</h4>
                        <FaFacebook style={{ fontSize: '30px' }} /> &nbsp;&nbsp;
                        <CiInstagram style={{ fontSize: '30px' }} />&nbsp;&nbsp;
                        <CiTwitter style={{ fontSize: '30px' }} />&nbsp;&nbsp;
                        <CiLinkedin style={{ fontSize: '30px' }} />&nbsp;&nbsp;
                      </div>
                    </div>
                  </div>
                </div>
            }
            
          </div>
      }
    </div>
  )
}

export default Home;
