import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";   
import { FaUserTie } from "react-icons/fa6"; 
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "./styles.css";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlinePreview } from "react-icons/md";
import { FaServicestack } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import {useAuth} from '../Authentication';
const AdminPage = () => {
  const {user} = useAuth();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const navigate = useNavigate();
  const [busi, setBusi] = useState([]);
  const [users, setUser] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [service, setService] = useState([]);
  const pieChartRef = useRef(null);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
   


  // Business...

  useEffect(()=>{
    fetch(`http://localhost:7207/api/businessCount`)
    .then(e=> e.json())
    .then((data)=>{
      setBusi(data)
    })
    .catch(err=> console.log('Error in fetching data :', err));
  }, []);

  const handleLogout = () => {
     navigate('/logout');
  };


  // User data...

  useEffect(()=>{
    fetch(`http://localhost:7207/api/total`)
    .then(e=> e.json())
    .then(data=> setUser(data))
    .catch(err=> console.log("Server Error :", err));
  }, [])


  // Total Category...

  useEffect(()=>{
    fetch("http://localhost:7207/api/totalcategory")
    .then(e=> e.json())
    .then((data)=>{
      setCategory(data);
    })
  }, []);


  // Total Subcategory...

  useEffect(()=>{
    fetch('http://localhost:7207/api/totalSubcategory')
    .then(e=> e.json())
    .then((data)=>{
     setSubcategory(data);
    })
  }, []);


  // Total Services...

  useEffect(()=>{
    fetch("http://localhost:7207/api/totalService")
    .then(e=> e.json())
    .then((data)=>{
      setService(data);
    })
  }, []);

  useEffect(() => {
    let root = am5.Root.new("chartdiv");
    root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root,{
        valueField: "value",
        categoryField: "category",
      })
    );

    
    series.data.setAll([
      { value: 1, category: "Admin"},
      { value: category.countId, category: "Category" },
      { value: subcategory.countSub, category: "Subcategory" },
      { value: service.countService, category: "Service" },
      { value: 4, category: "Five" },
      { value: users.totalUsers, category: "Users" },
      { value: busi.countTotal, category: "Business"},
    ]);

    series.appear(1000, 100);

    pieChartRef.current = root;

    return () => {
      root.dispose();
    };
  }, [busi, users, category, subcategory, service]);

  return (
    <div style={{ background: 'url(https://png.pngtree.com/thumb_back/fh260/background/20230831/pngtree-office-space-in-new-zealand-interior-design-images-best-of-desks-image_13149213.jpg)', height: '911px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
             <div>
        <Navbar style={{ backgroundColor: "#457b9d" }}>
          &nbsp;&nbsp;&nbsp;   <h4 style={{ color: "#ffb4a2" }}>
                  ADMINISTRATOR DASHBOARD
                </h4>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Nav>
                  <Dropdown>
                    <Dropdown.Toggle style={{ background: 'transparent', border: 'none', fontSize: '18px', fontWeight: 'bold' }}>Business</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link style={{ textDecoration: 'none', fontWeight: 'bold' }} to="/business">Business <LuBriefcaseBusiness /></Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/getBusiness" style={{ fontWeight: 'bold', textDecoration: 'none' }}>GetBusiness <MdOutlinePreview /></Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Dropdown>
                    <Dropdown.Toggle style={{ background: 'transparent', border: 'none', fontSize: '18px', fontWeight: 'bold' }}>Category</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/category" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Category <TbCategoryPlus /></Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/getCategory" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Getcategory <MdOutlinePreview /></Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <Dropdown>
                    <Dropdown.Toggle style={{ background: 'transparent', border: 'none', fontSize: '18px', fontWeight: 'bold' }}>Subcategory</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/subcategory" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Subcategory<FaServicestack /></Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/getsubcategory" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Getsubcategory <MdOutlinePreview /></Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Dropdown>
                    <Dropdown.Toggle style={{ background: 'transparent', border: 'none', fontSize: '18px', fontWeight: 'bold' }}>Services</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/service" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Services <FaServicestack /></Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/getservice" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Getservices <MdOutlinePreview /></Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <button
                    style={{
                      marginLeft: "5rem",
                      background: "none",
                      border: "none",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onMouseOver={handleShow1}
                  >
              Profile <FaUserCircle style={{ fontSize: "40px", color: "#003566" }} />
                  </button>
                </Nav>
              </Navbar>

              <Offcanvas show={show1} onHide={handleClose1} style={{ width: "20rem", height: "50px", marginLeft: "100rem", marginTop: "55px" }}>
                <p style={{ display: "flex", color: "white", backgroundColor: "seagreen", fontWeight: "bold" }}>
                  &nbsp;<FaUserTie style={{ fontSize: "20px" }} />
                  &nbsp;&nbsp; Abhishek Vishvakarma &nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ backgroundColor: "green", fontWeight: "bold", color: "white", textAlign: "center", padding: "2px 10px", height: '30px', cursor: 'pointer' }} onMouseOver={handleShow2}>
                    Admin
                  </span>
                </p>
                <div className="card">
                  <p style={{ color: "white", backgroundColor: "navy", padding: "10px", textAlign: "center", fontWeight: "bold" }}>
                    Users Community
                  </p>
                  <div className="card" style={{ backgroundColor: "#003049", height: "51.5rem" }}>
                    <div className="card" style={{ width: "20rem", backgroundColor: "#16425b", borderRadius: "0px", boxShadow: "0px 0px 4px 2px #e0fbfc", padding: "5px", color: "white", fontSize: "20px", fontWeight: "bold" }}>
                      <p>All Registered Users : {users.totalUsers}</p>
                    </div>
                  </div>
                </div>
                <Offcanvas classNameName="card" style={{ marginTop: '80px', width: '20rem', height: '18rem', marginLeft: '95rem', borderRadius: '0px', padding: '10px', backgroundColor: 'navy', color: '#f4effa', fontWeight: 'bold' }} show={show2} onHide={handleClose2}>
                  <p style={{ textAlign: 'center', backgroundColor: '#87bba2', padding: '2px', color: 'green', cursor: 'pointer' }}><FaUserTie style={{ fontSize: "20px" }} /> Admin</p>
                  <p style={{ color: 'red' }}>[ Role : {user?.role || "Admin"} ]</p>
                  <p>Name : Abhishek Vishvakarma</p>
                  <p>E-Mail : admin@example.com</p>
                  <p>Contact info : (India) +91 9324393412</p>
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "blue",
                      color: "yellow",
                      border: "none",
                      padding: "5px 50px",
                      height: "40px",
                    }}>Logout</button>
                </Offcanvas>
              </Offcanvas>
              <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            </div>
      
      { <p style={{ color: '#e3d5ca', textAlign: 'center', marginTop: '70px',marginLeft: '3rem', fontSize:'18px'}}>WELCOME TO ADMIN DASHBOARD</p>}

    </div>
  );
};

export default AdminPage;