import { useEffect, useState } from "react"
import { useAuth } from "../src/Authentication";
import { Link, useNavigate } from "react-router-dom";
import {Navbar, Container, Carousel} from 'react-bootstrap';
// import { HiHome } from "react-icons/hi2";
import { GoStar } from "react-icons/go";
// import { FaFaceGrinStars } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { SiUnity } from "react-icons/si";

const GetUserService = () =>{
  const [data, sepata] = useState([]);
  const { bookserviceuser } = useAuth();
  const { addtoCartData } = useAuth();
  const { singleBook } = useAuth();
  const { starReview } = useAuth();
  const navigate = useNavigate();
  const [rev, setRev] = useState([]);
  const [send, setSend] = useState(true);
  const [search, setSearch] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:7207/api/getservice")
    .then(e=> e.json())
    .then((data)=>{
      sepata(data.serviceId);
      console.log("User Service :", data.serviceId);
    })
  }, []);

  const handleDelete = async(id)=>{
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try{
      const response = await fetch(`http://localhost:7207/api/reviewdel/${id}`,{
        method : "DELETE", 
        headers : {
          "Content-Type" : "application/json"
        }
      });
      const resData = await response.json();
      console.log(resData);
      if(!response.ok){
        throw new Error("Failed to delete Reviews!");
      }
      setRev(rev.filter((u) => u.review_id !== id));
    }catch(error){
      console.log("Server error :", error);
    }
    console.log("ID :", id);
  }
  
  useEffect(()=>{
    fetch("http://localhost:7207/api/reviewget")
    .then(e=> e.json())
    .then((data)=>{
      console.log("Review :", data.reviews);
      setRev(data.reviews);
    })
  }, []);


  const handleBook = (id)=>{
    const findService = data.find(u=> u._id === id);
    console.log("findService", findService);
    if(findService){
      bookserviceuser(findService);
      singleBook(findService);
      navigate("/appoint");
    }
  }

  const handleCart = (id)=>{
    const cartServices = data.find(u=> u._id === id);
    if(cartServices){
      addtoCartData(cartServices);
      navigate("/addtocart");
    }
  }

  useEffect(()=>{
   let timer = setTimeout(()=>{
     setSend(false);
   }, 1000);
   return ()=> clearTimeout(timer);
  }, []);


  const handleStar = (id)=>{
    const star = data.find(u=> u._id === id);
    console.log('Star :', star);
    if(star){
      starReview({star});
    }
    navigate("/review");
  }

  const searchServices = data.filter(finds => finds.service_name.toLowerCase().includes(search));
  return (
    <div style={{position: 'relative'}}>
      {
        send ?
        <div style={{color: 'white', position: 'absolute', backgroundColor: 'black', height: '911px', width: '100%'}}>
            <h1 style={{ color: 'white', position: 'absolute', backgroundColor: 'black', marginTop: '22rem', marginLeft: '35rem'}}>Welcome! to my Services Booking Site!</h1>
        </div>
        :
          <div>
            <Navbar style={{ background: 'navy', position: 'fixed', zIndex: '1', width: '100%'}}>
              <Container>
                <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginLeft: '-16rem', boxShadow: '0px 0px 5px 2px #999', padding: '6px 10px', fontSize: '20px'}} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home Dashboard</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h4 style={{display: 'flex', color: 'white'}}>Search services name &nbsp;<input type="text" placeholder="Search..." className="form-control" style={{ width: '25rem' }} onChange={(e) => setSearch(e.target.value)} /></h4>
              </Container>
            </Navbar>
            <br /><br /><br /><br /><br /><br />
            <Carousel className="container">
              <Carousel.Item interval={2000}>
                <img style={{ width: '100%', height: '20rem' }} src="https://appleplumbing.com/wp-content/uploads/2013/10/Well-Tanks-101-What-Is-a-Well-Tank-How-Does-a-Well-Pressure-Tank-Work-797x300.jpeg" />
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img style={{ width: '100%', height: '20rem' }} src="https://www.nobrokerhood.com/blog/wp-content/uploads/2024/12/NoBrokerHood-Home-Cleaning-Services.jpg" />
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img style={{ width: '100%', height: '20rem' }} src="https://serviceclone.com/uploads/category_images/AC-slider_1350_400.jpg"/>
              </Carousel.Item>
            </Carousel>
            <br /><br /> <br />
            <br/>
            <h2 style={{ textAlign: 'center', padding: '15px'}}>Welcome! to Service Booking Page</h2>
            <hr style={{boxShadow: '0px 0px 5px 5px #999'}}/>
            <br/>
            <h3>Find services for booking...</h3>
            <br />
            <div>
              {
                searchServices.map((ele) => {
                  return <>
                    <div className="card" style={{ width: '25rem', height: '29rem', fontSize: '15px', fontWeight: 'bold', padding: '20px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #9888', display: 'inline-block', margin: '30px'}}>
                      <p><img src={ele.service_img} style={{ width: '15rem', height: '10rem', marginLeft: '3.5rem', boxShadow: '0px 0px 5px 2px #999'}} /></p>
                      <br />
                      <p>Name :{ele.service_name}</p>
                      <p>Price : ₹{(ele.price * 87.19).toFixed(2)}</p>
                      <p>Description :{ele.description}</p>
                      <p style={{display: 'flex', alignItems: 'center'}}>Rating:<button onClick={()=> handleStar(ele._id)} style={{ background: 'none', border: 'none', fontSize: '20px'}}>⭐️</button></p>
                      <div style={{ display: 'flex' }}>
                        <button onClick={() => handleBook(ele._id)} style={{ width: '10rem', border: 'none', backgroundColor: 'orange', borderRadius: '20px', padding: '5px' }}>Book Now</button> &nbsp; <button onClick={() => handleCart(ele._id)} style={{ width: '10rem', border: 'none', backgroundColor: 'yellow', padding: '5px', borderRadius: '20px' }}>Addtocart</button>
                      </div>
                    </div>
                  </>
                })
              }
            </div>
            <div style={{ height: '500px', marginTop: '5rem' }}>
              <Navbar style={{ background: 'url(https://www.shutterstock.com/image-vector/technological-background-flat-icons-symbols-600nw-1722511141.jpg)', color: 'white', boxShadow: '-2px 2px 5px 5px #999'}}>
                <Container>
                  <h4 style={{ fontWeight: 'bold' }}>Reviews from users...</h4>
                </Container>
              </Navbar>
              <br />
              <div>
                {
                  rev.length > 0 ?
                    (
                      rev.map((ele) => {
                        return <>
                          <div className="card" style={{ width: '35rem', height: '22rem', fontSize: '18px', padding: '10px', borderRadius: '0px', boxShadow: '0px 0px 5px 1px #999', fontWeight: 'bold', display: 'inline-block', margin: '30px', alignSelf: 'center'}}>
                            <br />
                            <button onClick={() => handleDelete(ele.review_id)} style={{ border: 'none', width: '10rem', boxShadow: '0px 0px 5px 2px #999', fontWeight: 'bold', color: 'blue', background: 'transparent'}}>Delete <MdDeleteForever /></button>
                            <Link to="/reviewup" style={{textDecoration: 'none', boxShadow: '0px 0px 4px 2px #999', width: '10rem', textAlign: 'center', padding: '2.5px 30px'}}>Update <RiEdit2Fill /></Link>                         

                            <br />  <br />  <br />
                            <p>User Name : <FaRegSmile /> {ele.user_name}</p>
                            <hr />
                            <p>Rating : <GoStar />{ele.rating}</p>
                            <p>Comment : {ele.comment}</p>
                            <p>Service Name : {ele.service_name}</p>
                          </div>
                        </>
                      })
                    ) :

                    (
                      <p>Review Data not found!</p>
                    )
                }
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default GetUserService;
