import { useEffect, useState } from "react";
import { useAuth } from "../Authentication";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";

const BookServices = () => {
  const { booknow } = useAuth();
  const [send, setSend] = useState([]);
  useEffect(()=>{
      setSend(booknow);
  }, [booknow])

  console.log("Send :",send);
  const mapdata = send.map((data)=>{
    return data.price
  });
  const slicedata = mapdata.slice(1);
  console.log(slicedata);


  // const handleDelete = async (id) => {
  //   try {
  //     console.log("Deleting service with ID:", id); 
  //     const response = await fetch(`http://localhost:7207/api/delservice/${ id }`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

      // const result = await response.json();
      // console.log("Delete API Response:", result);

  //     if (response.ok) {
  //       const updatedBookNow = send.filter((user) => user._id !== id);
  //       setSend(updatedBookNow);
  //       bookserviceuser(updatedBookNow);
  //       localStorage.setItem("book", JSON.stringify(updatedBookNow));

  //       console.log("Service deleted successfully!");
  //     } else {
  //       console.log("Failed to delete service from server.");
  //     }
  //   } catch (error) {
  //     console.error("Server Error:", error);
  //   }
  // };

  // localStorage.removeItem("book");

  
  return (
    <div>
      <Navbar bg="info">
        <Container>
          <h4>Booking Services Status at Services Page!</h4>
          <Link to="/" style={{ color: "white", textDecoration: 'none', fontSize: '20px', fontWeight: 'bold'}}>Home <IoHomeSharp/></Link>
          <Link to="/paymessage" style={{ color: "white", textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>Messages <MdMessage/></Link>
        </Container>
      </Navbar>
      <div>
        {
          send.length > 0 ? 
            send.map((data) => {
              return <>
                <div className="card" style={{ width: '20rem', fontWeight: 'bold', padding: '10px', marginTop: '10rem', display: 'inline-block', margin: '30px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999'}}>
                  <p style={{ color: 'white', backgroundColor: 'red', textAlign: 'center' }}>Booked Services</p>
                  <p><img src={data.service_img} style={{ width: '10rem', height: '10rem', marginLeft: '55px'}} /></p>
                  <p>Name :{data.service_name}</p>
                  <p>Price :{data.price}</p>
                  <p>Description :{data.description}</p>
                  <br />
                </div>
              </>
            }) :

            <p style={{color: 'white'}}>No Found Services!</p>
        }
      </div>
    </div>
  )
}

export default BookServices;
