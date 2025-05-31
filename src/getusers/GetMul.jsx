import { useEffect, useState } from "react";
import {Navbar, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { HiHome } from "react-icons/hi2";
import { LuServer } from "react-icons/lu";
import { AiTwotoneDelete } from "react-icons/ai";

const GetMul = () => {
  const [data, setData] = useState([]);
  const [showtime, setShowTime] = useState(true);
  const [search, setSearch] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:7207/api/alluser')
      .then(response => response.json())
      .then((users) =>{
        const data = users.find(u=> u);
        console.log("Data is",data._id)
        setData(users);
        console.log(users);
      })
      .catch(err => console.log("Error fetching users:", err));
  }, []);

  const deleteUser = async (id)=>{
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:7207/api/delusers/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok){
        throw new Error("Failed to delete user");
      }
      setData(data.filter(user => user._id !== id));
  
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  useEffect(()=>{
  let timer = setTimeout(()=>{
    setShowTime(false);
  }, 3000);
  return ()=> clearTimeout(timer);
  }, []);
  const searchName = data.filter(user=> user.name.toLowerCase().includes(search));
  return (
    <div>
      {
        showtime ?
          <div style={{ backgroundColor: 'black', height: '911px', position: 'relative' }}>
          <h2 style={{color: 'white', marginLeft: '45rem', position: 'absolute', marginTop: '24rem'}}>Welcome! to User list page!</h2>
        </div>
        :
          <div>
            <Navbar  className="bg-info">
              <Container>
                <Link to="/" style={{color: 'white', textDecoration: 'none', fontSize: '20px'}}>Home <HiHome/></Link>
                <h2>View to User List</h2>
                <input type="text" placeholder="Search user..." onChange={(e)=> setSearch(e.target.value)} className="form-control" style={{width: '20rem'}}/>
              </Container>
            </Navbar>
            <table className="container table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {searchName.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button onClick={() => deleteUser(user._id)} className="btn btn-danger">DELETE <AiTwotoneDelete/></button>&nbsp;
                      <Link to="/update" className="btn btn-warning" style={{ color: 'blue', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0px 0px 3px 2px white', padding: '5px'}}>UPDATE <LuServer /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div>
  );
};

export default GetMul;

