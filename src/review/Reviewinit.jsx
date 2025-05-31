import { useEffect, useState, useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Authentication";
import { SiUnity } from "react-icons/si";

const Reviewinit = () => {
  const [users, setUser] = useState([]);
  const [service, setService] = useState([]);
  const commentRef = useRef();
  const ratingRef = useRef();
  const uidRef = useRef();
  const serviceRef = useRef();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { rate } = useAuth();
  const { user } = useAuth();
  const [stars, setStars] = useState();
  const [view, setView] = useState();
  const [deepseek, setDeepSeek] = useState(true);
  useEffect(() => {
    fetch("http://localhost:7207/api/alluser")
      .then(e => e.json())
      .then((data) => {
        console.log("User data :", data);
        setUser(data);
      })
  }, []);


  useEffect(() => {
    fetch("http://localhost:7207/api/getservice")
      .then(e => e.json())
      .then((data) => {
        console.log("Services data :", data.serviceId);
        setService(data.serviceId);
      })
  }, []);

  const handleReviewPost = async (e) => {
    e.preventDefault();

    const reviewObj = {
      service_id: serviceRef.current.value,
      user_id: uidRef.current.value,
      comment: commentRef.current.value,
      rating: ratingRef.current.value
    }

    try {
      const response = await fetch("http://localhost:7207/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewObj)
      });
      const resRev = await response.json();
      console.log(resRev);
      if (!response.ok) {
        alert("Response is not ok!");
      } else {
        setMsg(resRev.message);
        setTimeout(() => {
          navigate("/getuserservice");
          setMsg("");
        }, 3000);
      }
    } catch (error) {
      console.log("Server error :", error);
    }
  }

  useEffect(() => {
    if (rate) {
      setStars(rate.star || []);
    } else {
      setStars([]);
    }
  }, [rate]);

  useEffect(() => {
    fetch("http://localhost:7207/api/reviewcount")
      .then(e => e.json())
      .then((data) => {
        setView(data);
      })
  }, []);

  useEffect(() => {

    const refreshTimer = setTimeout(() => {
      setDeepSeek(false);
    }, 1000);
    return () => clearTimeout(refreshTimer);
  }, []);

  console.log("Rate :", stars);
  console.log(user);
  console.log(view);
  return (
    <div style={{ position: 'relative'}}>
      {
        deepseek ?
        <div style={{backgroundColor: 'black', position: 'relative', height: '911px'}}>
          <h2 style={{color: 'white', position: 'absolute', top: '23rem', left: '41rem'}}>Welcome! to Review & rating page</h2>
        </div>
        :
          <div style={{ background: 'url(https://www.newgenapps.com/hubfs/Imported_Blog_Media/Website-Design-Background-Feb-09-2022-03-13-55-73-AM.png)', height: '911px', position: 'relative' }}>
            <Navbar style={{backgroundColor: 'navy', color: 'white'}}>
              <Container>
                <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginLeft: '-16rem', boxShadow: '0px 0px 5px 2px #999', padding: '6px 10px' }} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home Dashboard</Link>
                <h4 style={{ display: 'flex', alignItems: 'center' }}>User Review Page for Comment and Rating!</h4>
                <p style={{ color: 'blue', fontSize: '20px', alignItems: 'center', fontWeight: 'bold' }}>Rating & review : [ {view?.count} ⭐️]</p>
              </Container>
            </Navbar>
            <form onSubmit={handleReviewPost} className="card" style={{ width: '30rem', height: '30rem', gap: '20px', borderRadius: '0px', padding: '20px', boxShadow: '0px 0px 5px 2px #999', position: 'absolute', justifyContent: 'center', left: '45rem', top: '10rem' }}>
              {!msg ? <h4 style={{ color: "white", backgroundColor: '#cc0c39', padding: '15px', textAlign: 'center', boxShadow: '0px 0px 5px 2px #999' }}>Review Page</h4> : <h4 style={{ color: 'green', textAlign: 'center' }}>{msg}</h4>}
              <input type="text" ref={commentRef} style={{ padding: '15px', border: 'none', boxShadow: '0px 0px 5px 2px #999' }} placeholder="Drop Comment" />
              <select ref={ratingRef} style={{ padding: '15px', border: 'none', boxShadow: '0px 0px 5px 2px #999' }}>
                <option>Choose Rating</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
              </select>

              <select type="text" ref={uidRef} style={{ padding: '15px', border: 'none', boxShadow: '0px 0px 5px 2px #999' }}>
                <option>Choose user_id</option>
                {
                  users.map((ele) => {
                    return <>
                      {
                        (ele.email === user?.email) ? <option key={ele._id} value={ele._id}>{ele.name}</option> : null
                      }
                    </>
                  })
                }
              </select>
              <select type="text" ref={serviceRef} style={{ padding: '15px', border: 'none', boxShadow: '0px 0px 5px 2px #999' }}>
                <option>Choose Service_id</option>
                {
                  service.map((ele) => {
                    return <>
                      {
                        (ele.service_name === stars.service_name) ? <option key={ele._id} value={ele._id}>{ele.service_name}</option> : null
                      }
                    </>
                  })
                }
              </select>
              <button type="submit" style={{ backgroundColor: 'navy', color: 'white', padding: '15px', border: 'none', boxShadow: '0px 0px 5px 2px #999' }}>Post Review</button>
            </form>
          </div>
      }
    </div>
  )
}

export default Reviewinit;
