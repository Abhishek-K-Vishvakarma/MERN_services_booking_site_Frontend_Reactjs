import { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IoHomeSharp } from "react-icons/io5";

const Update = () => {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [nm, setNm] = useState('');
  const [em, setEm] = useState('');
  const [mob, setMob] = useState('');
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState([]);
  // Fetch all users
  useEffect(() => {
    fetch(`http://localhost:7207/api/allUser`)
      .then(response => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Handle user selection
  const handleSelectUser = (id) => {
    const user = users.find(user => user._id === id);
    console.log(user);
    if (user) {
      setSelectedId(user._id);
      setNm(user.name || '');
      setEm(user.email || '');
      setMob(user.phone || '');
    }
  };

  // Handle update
  const handleUpdate = async ()=> {
    if (!selectedId){
      toast.error('Please select a user to update.');
      return;
    }
    const dataToUpdate = {
      name: nm,
      email: em,
      phone: mob
    };

    await fetch(`http://localhost:7207/api/updateUser/${selectedId}`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToUpdate)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Update Success:', data.message);
        setMsg(data.message)
        setTimeout(()=>{
         setMsg("");
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });

  };
  const searchUser = users.filter(user=> user.name.toLowerCase().includes(search));
  return (
    <div style={{backgroundColor: 'navy', height: '911px'}}>
      <Navbar className='bg-info'>
        <Container>
          <Link to="/" style={{color: 'black', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px'}}>Home <IoHomeSharp/></Link>
          <h3>Search Ourname for updation your credintails</h3>
          <input type='text' placeholder='Search name...' onChange={(e)=> setSearch(e.target.value)} className='form-control' style={{width: '20rem'}}/>
        </Container>
      </Navbar>
      <h4 style={{ color: 'white' }}>SELECT A USER TO UPDATE</h4>
     <table className='table table-hover table-striped table-bordered'>
      <thead>
        <tr>
          <th>Sr No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
          {
            searchUser.map((ele, ind)=>{
              return <>
               <tr key={ele._id}>
                <td>{ind + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.phone}</td>
                <td>
                    <button onClick={() => handleSelectUser(ele._id)} className='btn btn-info text-white' style={{fontWeight: 'bold'}}>Update</button>
                </td>
               </tr>
              </>
            })
          }
      </tbody>
      </table>
      <br />
      <div className='card' style={{width: '30rem', alignItems: 'center', padding: '45px', height: '30rem', boxShadow: '0px 0px 10px 1px white', borderRadius: '0px', position: 'sticky', left: '45rem', top: '10px'}}>
        {!msg ? <p style={{ color: 'white', backgroundColor: '#cc0c39', padding: '15px', width: '25rem', fontWeight: 'bold', boxShadow: '0px 0px 5px 2px #999', textAlign: 'center'}}>UPDATION FORM</p> : <p style={{color: 'lime', fontWeight: 'bold'}}>{msg}</p>}
        <input type='text' placeholder='Name' value={nm} onChange={(e) => setNm(e.target.value)} style={{ width: '25rem', fontSize: '20px', padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999'}} className="form-control"/>
        <br />
        <input type='text' placeholder='Email' value={em} onChange={(e) => setEm(e.target.value)} style={{ width: '25rem', fontSize: '20px', padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999' }} className="form-control" />
        <br />
        <input type='text' placeholder='Phone' value={mob} onChange={(e) => setMob(e.target.value)} style={{ width: '25rem', fontSize: '20px', padding: '15px', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999' }} className="form-control" />
        <br/>
        <button onClick={handleUpdate} style={{ backgroundColor: 'navy', color: 'white', fontSize: '15px', padding: '15px', width: '25rem', border: 'none', fontWeight: 'bold', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999' }}>SAVE CHANGES</button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Update;
