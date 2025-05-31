import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import useNavigate
import {Navbar} from 'react-bootstrap';
import { SiUnity } from "react-icons/si";
const Usersubcategory = () => {
  const [get, setGet] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7207/api/subget`)
      .then((res) => res.json())
      .then((data) => {
        setGet(data.subGet);
      });
  }, []);

  const filteredResult = get.filter(item => item.subcategory_name.toLowerCase().includes(search));
  console.log(filteredResult)
  return (
    <div style={{ backgroundImage: "url(https://booking.bijanbarihomestays.com/assets/images/index.jpg)", height: "1000px", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width: '100%'}}>
      <Navbar style={{backgroundColor: 'navy'}} >
        &nbsp;&nbsp;&nbsp;<Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold', boxShadow: '0px 0px 5px 2px #999', padding: '5px 30px'}}><SiUnity style={{ fontSize: '70px'}}/> Home</Link>
        <h3 style={{color: 'white', marginLeft: '150px'}}>Search your subcategory to services</h3><input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '25rem', margin: 'auto', boxShadow: '0px 0px 8px 2px #666' }} className="form-control" />
      </Navbar>
      <br />
      <h2 style={{ textAlign: "center", color: 'white' }}>Here presented various subcategory name for booking services...</h2>
      <br />
      <br/>
      <div>
        {
          filteredResult.map((item) => (
            <div className="card" key={item.id} style={{textAlign: "center", padding: '10px', fontWeight: 'bold',borderRadius: '0px', boxShadow: '0 0 10px 1px #999', backgroundColor: 'white', width: '20rem', height: '22rem', display: 'inline-block', margin: '25px'}}>
              <img src={item.image_logo} style={{ width: '10rem', height: '10rem', marginLeft: '.1rem', boxShadow: '0 0 10px 1px #999', marginTop: '2rem'}}/>
             <br/><br/>
              <p>Name: {item.subcategory_name}</p>
              <br />
              <Link to="/getuserservice" style={{ textDecoration: 'none', backgroundColor: 'orange', color: 'black', margin: 'auto', padding: '10px 100px', borderRadius: '50px' }}>Services</Link>
              <br />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Usersubcategory;
