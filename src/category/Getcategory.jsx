import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Navbar, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const Getcategory = () => {
  const [get, setGet] = useState([]);
  const [msg1, setMsg1] = useState();
  const [msg2, setMsg2] = useState();
  const [subget, setSubget] = useState("");
  const [sendSub, setSendSub] = useState([]);
  const [imgdel, setImgDel] = useState([]);
  const image_urlRef = useRef();
  const [fire, setFire] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    fetch("http://localhost:7207/api/get_category")
      .then((e) => e.json())
      .then((data) => {
        setGet(data.category);
        console.log("Data :", data.category);
      })
      .catch((error) => {
        console.log("Server Error:", error);
      });
  }, []);

  const handleIdData = (id) =>{
    setSubget(id);
  };
 
  const DelImage = async(id)=>{
    try{
      const response = await fetch(`http://localhost:7207/api/category/image/${id}`, {
         method : "DELETE",
         headers : {
          'Content-Type' : 'application/json'
         }
      });
      const delcategoryimage = await response.json();
      setImgDel(imgdel.filter(user=> user._id !== id));
      if(!response.ok){
         alert("Response not ok!");
      }else{
        console.log("DeleteCategory Image Successfully!", delcategoryimage);
        alert("Deleted successfully!");
      }
    }catch(error){
      console.log("Server Error :", error);
    }
  }


 useEffect(()=>{
   fetch(`http://localhost:7207/api/subcategory/${subget}`)
   .then(e=> e.json())
   .then((data)=>{
    console.log(data);
     const finddata = data.findSubcategories;
     setSendSub(finddata);
   })
 }, [subget]);


  const handledelete = async (id) =>{
    try {
      const response = await fetch(
        `http://localhost:7207/api/delete_category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const deletedata = await response.json();
      if (!response.ok) {
        toast.error(deletedata.message);
        setMsg1(deletedata.message);
        setTimeout(() => {
          setMsg1("");
        }, 3000);
      } else {
        toast.success(deletedata.message);
        setMsg2(deletedata.message);
        setTimeout(() => {
          setMsg2("");
        }, 3000);
        setGet(get.filter((user)=> user._id !== id));
      }
    } catch (error) {
      console.log("Server Error:", error);
    }
  };


  const UploadImageByCategoryId = async (e) =>{
    e.preventDefault();
    const file = image_urlRef.current.files[0];

    if (!file) {
      toast.error("Please choose an image file!");
      return;
    }

    const formData = new FormData();
    formData.append("logo", file);

    try {
      const response = await fetch(`http://localhost:7207/api/category/upload/${subget}`, {
        method: "POST",
        body: formData,
      });

      const fileData = await response.json();

      if (!response.ok) {
        throw new Error(fileData.error || "Image upload failed");
      }

      console.log("Uploaded Image URL:", fileData.logo_url);
      setFire(fileData.logo_url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Server Error:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

console.log("Sub get :", subget);
// console.log("Send Sub", sendSub);
  return (
    <div style={{ background: 'url(https://img.freepik.com/premium-vector/blue-white-abstract-banner-background-with-geometric-shapes-copy-space_712219-745.jpg?semt=ais_hybrid)', height: '911px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
      <Navbar style={{backgroundColor: 'navy', color: 'white'}}>
        <Container>
          <Link to="/admin" style={{textDecoration: 'none', color: 'white', fontSize: '20px'}}>Admin</Link>
         <h3>GET CATEGORY PAGE IN ADMIN</h3>
        </Container>
      </Navbar>
      <div>

        <div style={{ padding: '30px', display: 'flex', position: 'relative', gap: '30px'}}>
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {msg1}
          </p>
          <p
            style={{
              color: "green",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {msg2}
          </p>
          
        </div>

        {
          get.map((ele)=>{
            return<>
              <div className="card" style={{width: '22rem', height: '25rem', display: 'inline-block', margin: '10px', borderRadius: '0px', overflow: 'hidden'}}>
                <button onClick={() => DelImage(ele._id)} style={{ border: 'none', background: 'transparent' }}><MdDelete style={{ fontSize: '25px' }} title="Delete Image" /></button>
                <br/><br/>
                <img src={ele.logo_url} style={{width: '12rem', height: '12rem', marginLeft: '80px'}}/>
                <br/><br/>
                <p style={{textAlign: 'center', fontSize: '20px'}}>Category Name : {ele.category_name}</p>
                <br/>
                <button onClick={() => handledelete(ele._id)} className="btn btn-danger"> DELETE <MdDeleteSweep style={{ fontSize: '25px', color: 'pink', width: '16.75rem', textAlign: 'center'}} /> </button>
              </div>
            </>
          })
        }

        <button onMouseOver={handleShow} style={{position: 'absolute', top: '60px', backgroundColor: 'red', border: 'none', color: 'white', fontWeight: 'bold', left: '94rem', boxShadow: '0px 0px 5px 2px blue'}}>Choose Category and Uploading File(Logo, Image)</button>
        <Offcanvas show={show} onHide={handleClose} style={{width: '38rem', height: '40rem', position: 'absolute', left : '40rem', padding: '40px', marginTop: '5rem'}}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Choose Category Name and Uploading Image, Logo, and such as few types of source!</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="card" style={{ width: '30rem', padding: '30px', gridGap: '20px', boxShadow: '0px 0px 5px 1px #999' }}>
              <select value={subget} onChange={(e) => handleIdData(e.target.value)} className="form-control" style={{ cursor: 'pointer' }}>
                <option value="">Choose Category</option>
                {get.map((ele) => (
                  <option key={ele._id} value={ele._id} className="form-control">{ele.category_name}</option>
                ))}
              </select>
              <form onSubmit={UploadImageByCategoryId}>
                <input type="file" ref={image_urlRef} accept="image/*" style={{ cursor: 'pointer', backgroundColor: 'pink', fontWeight: 'bold', width: '20rem' }} className="form-control" />
                <button type="submit" className="btn btn-primary" style={{ marginLeft: '21rem', marginTop: '-4rem' }}><IoCloudUploadSharp /></button>
              </form>
            </div>

            <div>
              <div className="card" style={{ width: '30rem', padding: '50px', boxShadow: '0px 0px 5px 1px #999', marginTop: '20px' }}>
                <h4>Subcategories:</h4>
              </div>
              <ul>
                {sendSub.length > 0 ? (
                  sendSub.map((sub) => <li key={sub._id} style={{fontSize: '20px', fontWeight: 'bold'}}>{sub.subcategory_name}</li>)
                ) : (
                  <li>No subcategories found</li>
                )}
              </ul>
            </div>
            {fire && (
              <div>
                <h4>Uploaded Image:</h4>
              </div>
            )}
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
     </div>
    </div>
  );
};

export default Getcategory;
