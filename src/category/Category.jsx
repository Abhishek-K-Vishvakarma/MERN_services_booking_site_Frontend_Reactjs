// import { useRef, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// const Category = ()=>{
//   const nameRef = useRef();
//   const image_urlRef = useRef();
//   const [msg1, setMsg1] = useState();
//   const [msg2, setMsg2] = useState();
//   const [urldata, setUrldata] = useState();
//   const navigate = useNavigate();


//   const handlefileselect = async()=>{
//     const file = image_urlRef.current.files[0];
//     if (!file) {
//       alert("Please! choose any image file!");
//     };

//     const formData = new FormData();
//     formData.append("image", file);
//     try{  
//       const response = await fetch(`http://localhost:7207/api/upload`,{
//         method: 'POST',
//         body : formData
//       });

//       const imagedata = await response.json();
//       setUrldata(imagedata.logo_url);
//       console.log(imagedata.logo_url);

//     }catch(error){
//       console.log("server error :", error);
//     }
//   }


//   const handleCategory = async(e)=>{
//     e.preventDefault();
//     if(!nameRef.current.value){
//       toast.error("Please! fill all field!");
//       return;
//     } 
//     const CategoryObj = {
//       category_name : nameRef.current.value,
//       logo_url : urldata
//     }

//     try{
//       const response = await fetch(`http://localhost:7207/api/category`,{
//       method : "POST",
//       headers : {
//         "Content-Type" : "application/json"
//       },
//       body : JSON.stringify(CategoryObj)
//      })
//      const allCategoryData = await response.json();
//      console.log(allCategoryData);
//      if(!response.ok){
//        toast.error(allCategoryData);
//        setMsg1(allCategoryData.message);
//        setTimeout(()=>{
//           setMsg1("");
//        }, 3000);
//      }else{
//       toast.success(allCategoryData.message);
//       setMsg2(allCategoryData.message);
//       setTimeout(()=>{
//         setMsg2("");
//         navigate('/subcategory');
//       }, 3000);
//      }
//     }catch(error){
//       console.log("Server Error :", error);
//     }
//   }

//   return(
//     <div>
//       <div className="card" style={{width: '30rem', padding: '40px', margin: 'auto', marginTop: '15rem'}}>
//         <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{msg1}</p><p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>{msg2}</p>
//         <h2>Cteate Category</h2>
//         <hr/>
//         <form onSubmit={handleCategory} className="form-group">
//              <label style={{fontSize: '20px', fontWeight: 'bold'}}>Category</label>
//              <br/>
//              <input type="text" placeholder="Enter Category Name" className="form-control" ref={nameRef} style={{marginTop: '20px', fontSize: '20px'}}/>
//              <br/>
//              <input type="file" accept="image/*" ref={image_urlRef} onChange={(e)=> handlefileselect(e.target.value)}/>
//              <br/>
//              <button type="submit" className="btn btn-success">Category</button>
//            </form>
//       </div>
//       <ToastContainer/>
//     </div>
//   )
// };
// export default Category;

import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {Navbar, Container} from 'react-bootstrap'
const Category = () => {
  const nameRef = useRef();
  const image_urlRef = useRef();
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");
  const [urldata, setUrlData] = useState("");
  const navigate = useNavigate();

  // Handle Image Upload
  const handleFileChoose = async () => {
    const file = image_urlRef.current.files[0];

    if (!file) {
      toast.error("Please choose an image file!");
      return;
    }

    const formData = new FormData();
    formData.append("logo", file);

    try {
      const response = await fetch(`http://localhost:7207/api/upload`,{
        method: "POST",
        body: formData,
      });

      const fileData = await response.json();

      if (!response.ok) {
        throw new Error(fileData.message || "Image upload failed");
      }

      console.log("Uploaded Image URL:", fileData.logo_url);
      setUrlData(fileData.logo_url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Server Error:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  // Handle Category Submission
  const handleCategory = async (e) =>{
    e.preventDefault();

    if (!nameRef.current.value || !urldata) {
      toast.error("Please fill all fields and upload an image!");
      return;
    }

    const categoryData = {
      category_name: nameRef.current.value,
      logo_url: urldata,
    };

    try {
      const response = await fetch("http://localhost:7207/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Error creating category");
        setMsg1(result.message);
        setTimeout(() => setMsg1(""), 3000);
      } else {
        toast.success(result.message);
        setMsg2(result.message);
        setTimeout(() => {
          setMsg2("");
          navigate("/subcategory");
        }, 3000);
      }
    } catch (error) {
      console.error("Server Error:", error);
      toast.error("Failed to create category. Please try again.");
    }
  };

  return (
    <div style={{height : '911px', background: 'url(https://images-cdn.brightedge.com/f00000000295597/videos.brightedge.com/assets/blog/ecommerce-category-page-blog.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Navbar style={{backdropFilter: 'blur(40px)', color: 'white', boxShadow: '0px 0px 5px 3px white'}}>
       <Container>
        <Link to="/admin" style={{color: 'white', textDecoration: 'none', fontSize: '20px'}}>Admin</Link>
        <h2>CREATE CATEGORY</h2>
       </Container>
      </Navbar>
      <div style={{textAlign: 'center', marginTop: '25em', marginLeft: '40em', color: 'white'}}>
        <h2>Most! general and helpful services provide by my services booking app</h2>
        <p style={{border: '2px solid white', width: '15rem', margin: 'auto', padding: '10px 20px', cursor: 'pointer', backdropFilter: 'blur(30px)'}}>View more helpful? services</p>
      </div>
      <div className="card" style={{ width: "30rem", height: '32rem', padding: "40px", margin: "auto", position: 'absolute', top: '12rem', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #fff', left: '15rem'}}>
        <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>{msg1}</p>
        <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>{msg2}</p>
        <h4 style={{ backgroundColor: '#cc0c39', color: '#fff', padding: '15px', textAlign: 'center' }}>CATEGORY <img style={{ width: '40px'}} src="https://cdn2.iconfinder.com/data/icons/seo-internet-marketing-4/256/Page_Quality-512.png" /></h4>
        <form onSubmit={handleCategory} className="form-group">
          <br />
          <input
            type="text"
            placeholder="Enter Category Name"
            className="form-control"
            ref={nameRef}
            style={{ marginTop: "20px", fontSize: "20px", padding: '15px', boxShadow: '0px 0px 5px 2px #999', borderRadius: '0px'}}
          />
          <br />
          <input type="file" accept="image/*" ref={image_urlRef} onChange={handleFileChoose} className="form-control" style={{ marginTop: "20px", fontSize: "20px", padding: '15px', boxShadow: '0px 0px 5px 2px #999', borderRadius: '0px' }} />
          <br /><br />
          <button type="submit" style={{fontSize: "20px", padding: '15px 7.6rem', boxShadow: '0px 0px 5px 2px #999', borderRadius: '0px', border: 'none', backgroundColor: 'navy', color: 'white'}}>
            Category Submit!
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Category;
