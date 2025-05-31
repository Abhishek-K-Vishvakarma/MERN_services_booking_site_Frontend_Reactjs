// import { useEffect, useRef, useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// const Subcategory = () => {
//   const SubcategoryRef = useRef();
//   const categoryIdRef = useRef();
//   const image_urlRef = useRef();
//   const [msg, setMsg] = useState();
//   const [msg1, setMsg1] = useState();
//   const [categoryId, setCategoryId] = useState([]);
//   const [nextId, setNextId] = useState();
//   const navigate = useNavigate();
//   useEffect(()=>{
//     fetch(`http://localhost:7207/api/get_category`)
//     .then(response=> response.json())
//     .then((data)=>{
//       setCategoryId(data.category);
//       console.log(data.category)
//     }).catch((error)=>{
//       console.log("Category Server Error :", error);
//     })
//   }, []);


//   const handleId = (id)=>{
//   const allId = categoryId.find(u=> u._id === id);

//   if(allId){
//     setNextId(allId._id)
//     console.log(allId._id);
//   }
//   }

//   const handleSubcategory = async(e)=>{
//      e.preventDefault();
//      if(!SubcategoryRef.current.value){
//       toast.error("Input field must be required!");
//       return;
//      }

//     const subcategoryName = SubcategoryRef.current.value;
//     const categoryId = categoryIdRef.current.value;
//     const image = image_urlRef.current.files[0];
//     const formData = new FormData();
//     formData.append("subcategory_name", subcategoryName);
//     formData.append("category_id", categoryId);
//     formData.append("image_logo", image);
//      try{
//        const response = await fetch(`http://localhost:7207/api/subcreate/${nextId}`,{
//           method : "POST",
//           headers : {
//             "Content-Type": "multipart/form-data"
//           },
//           formData
//          });
         
//          const all_Subcategory =  await response.json();
         
//          if(!response.ok){
//            setMsg(all_Subcategory.message);
//            toast.error(all_Subcategory.message);
//            setTimeout(()=>{
//             setMsg("");
//            }, 3000);
//          }else{
//           setMsg1(all_Subcategory.message);
//           toast.success(all_Subcategory.message);
//           setTimeout(()=>{
//              navigate('/admin');
//              setMsg1("");
//           }, 3000);
//          }
//      }catch(error){
//       console.log("Server Error :", error);
//      }
//   }

//   return (
//     <div>
//        <div className="card" style={{margin : 'auto', width: '30rem', padding: '50px', marginTop: '15rem'}}>
//         <h2>Subcategory Page</h2>
//         <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{msg}</p><p style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>{msg1}</p>
//         <hr/>
//         <br/>
//          <form onSubmit={handleSubcategory}>
//              <label>Enter Subcategory Name</label>
//              <input type="text" ref={SubcategoryRef}  placeholder="Enter SubcategoryName" className="form-control"/>
//              <br/>
//              <select className="form-control" ref={categoryIdRef} value={nextId} onChange={(e)=> handleId(e.target.value)}>
//               <option>Choose</option>
//               {
//                 categoryId.map((e)=>{
//                   return<>
//                   <option key={e._id} value={e._id}>{e.category_name}</option>
//                   </>
//                 })
//               }
//              </select>
//              <br/>
//             <input type="file" accept="image/*" ref={image_urlRef}/>
//              <br/><br/>
//              <button type="submit" className="btn btn-success">Create Subcategory</button>
//          </form>
//        </div> 
//        <ToastContainer/> 
//     </div>
//   )
// }

// export default Subcategory;


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {Navbar, Container} from 'react-bootstrap' 
const Subcategory = () => {
  const subcategoryRef = useRef();
  const categoryIdRef = useRef();
  const imageRef = useRef();
  const [msg, setMsg] = useState("");
  const [msg1, setMsg1] = useState("");
  const [categories, setCategories] = useState([]);
  const [nextId, setNextId] = useState("");
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    fetch("http://localhost:7207/api/get_category")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.category);
      })
      .catch((error) => {
        console.error("Category Server Error:", error);
      });
  }, []);

  // Handle category selection
  const handleId = (id) => {
    setNextId(id);
  };

  // Handle Subcategory Creation
  const handleSubcategory = async (e) => {
    e.preventDefault();

    const subcategoryName = subcategoryRef.current.value;
    const categoryId = categoryIdRef.current.value;
    const image = imageRef.current.files[0];

    if (!subcategoryName || !categoryId || !image) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("subcategory_name", subcategoryName);
    formData.append("category_id", categoryId);
    formData.append("logo", image);

    try {
      const response = await fetch(`http://localhost:7207/api/subcreate/${nextId}`, {
        method: "POST",
        body: formData, // FormData automatically sets the correct headers
      });

      const result = await response.json();
      console.log("Result :", result);
      if (!response.ok) {
        setMsg(result.message);
        toast.error(result.message);
      } else {
        setMsg1(result.message);
        toast.success(result.message);
        setTimeout(() => {
          navigate("/service");
        }, 3000);
      }
    } catch (error) {
      console.error("Server Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div style={{ height: '911px', background: "url(https://www.webstacks.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fq9c9g16o%2Fproduction%2F99028a36705185190f43c2b0760bf371ad056112-1536x768.webp&w=3840&q=75)"}}>
      <Navbar style={{backdropFilter: 'blur(40px)', color: 'white', boxShadow: '0px 0px 5px 5px blue'}}>
        <Container>
              <h2>SUBCATEGORY CREATE PAGE</h2>
        </Container>
      </Navbar>
      <div style={{textAlign: 'center', color: 'white', marginTop: '20rem', marginLeft: '45rem'}}>
        <h1>Most relavent subcategory from category and, see all subcategory</h1>
        <br/>
        <p style={{border: '2px solid white', width: '15em', margin: 'auto', padding: '10px', cursor: 'pointer'}}>View all subcategories!</p>
      </div>
      <div className="card" style={{ position: 'absolute', alignItems: 'center', width: '30rem', height: '30rem',  borderRadius: '0px', top: '12em', boxShadow: '0px 0px 5px 2px #999', left : '20rem'}}>
        <h4 style={{color: 'white', fontWeight: "bold", backgroundColor: '#cc0c39', textAlign: 'center', padding: '15px 85px', marginTop: '40px', boxShadow: '0px 0px 5px 2px #999'}}>SUBCATEGORY PAGE</h4>
        <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{msg}</p><p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>{msg1}</p>
        <form onSubmit={handleSubcategory}>
          <input type="text" ref={subcategoryRef} placeholder="Enter Subcategory Name" className="form-control"  style={{borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem'}}/>
          <br />
          <select className="form-control" ref={categoryIdRef} onChange={(e) => handleId(e.target.value)} style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem' }}>
            <option value="">Choose a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
          <br />
          <input type="file" accept="image/*" ref={imageRef} style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem' }} />
          <br /><br />
          <button type="submit" style={{ borderRadius: '0px', padding: '15px', boxShadow: '0px 0px 5px 2px #999', width: '25rem', border: 'none', backgroundColor: 'navy', color: 'white', fontSize: '20px', fontWeight: 'bold'}}>SUBCATEGORY!</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Subcategory;
