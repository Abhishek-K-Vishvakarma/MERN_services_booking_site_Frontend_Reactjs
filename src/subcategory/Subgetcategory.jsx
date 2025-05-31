// import { useEffect, useState } from "react";
// // import { ToastContainer, toast } from "react-toastify";
// const Subgetcategory = () => {
//    const [getcategory, setGetCategory] = useState([]);
//    const [ids, setIds] = useState([]);
//    useEffect(()=>{
//       fetch(`http://localhost:7207/api/subget`)
//       .then(e=> e.json())
//       .then((data)=>{
//         const allget = data.subGet
//         const findids = data.subGet.find(u=> u._id)
//         setIds(findids._id);
//         setGetCategory(allget);
//         console.log("Admin Subcategory Get :", allget);
//       }).catch(error=> console.log("Server Error in Subget :", error));
//     }, []);

//     const handleDeleteSubcategory = async(id)=>{
//       try{
//         const response = await fetch(`http://localhost:7207/api/subdel/${ids}`,{
//          method: 'DELETE',
//          headers : {
//           "Content-Type" : "application/json"
//          }
//         });
//         const delsubcategpory = await response.json();
//         console.log("deleted :", delsubcategpory.message);
//         setIds(ids.filter((user)=> user._id !== id));
//         if(!response.ok){
//            alert("Inside the not subcategory Id");
//         }else{
//            alert(delsubcategpory.message);
//         }
//       }catch(error){
//         console.error("Server error :", error);
//       }
//     }
//     console.log("Set ids", ids);
//   return (
//     <div>
//       <h2 style={{ color: 'white', backgroundColor: 'red', padding: '10px', fontWeight: 'bold', textAlign: 'center'}}>Subcategory</h2>
//       <div style={{position: 'relative', display: 'flex', gap: '20px'}}>
//         <hr/>
//         {
//           getcategory.map((ele) => {
//             return <>
//               <div className="card" style={{ width: '20rem', height: '20rem'}}>
//                    <p style={{color: 'yellow', backgroundColor: 'navy', fontSize: '15px', textAlign: 'center', padding: '5px'}}>SubcategoryName: {ele.subcategory_name}</p>
//                    <img src={ele.image_logo} style={{width: '250px', margin: 'auto', boxShadow: '0px 0px 5px 2px #888', borderRadius: '10px', backgroundRepeat: 'none', backgroundSize: 'cover', backgroundPosition: 'center'}}/>
//                    <br/>
//                    <button onClick={()=> handleDeleteSubcategory(ele._id)} className="btn btn-danger" style={{borderRadius: '0px'}}>Delete</button>
//               </div>
//             </>
//           })
//         }
//       </div>
//       {/* <ToastContainer/> */}
//     </div>
//   )
// }

// export default Subgetcategory;



import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {Link} from 'react-router-dom';
import {Navbar, Container} from 'react-bootstrap';
const Subgetcategory = () => {
  const [getcategory, setGetCategory] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7207/api/subget")
      .then((res) => res.json())
      .then((data) => {
        setGetCategory(data.subGet); // Store all subcategories
        console.log("Admin Subcategory Get:", data.subGet);
      })
      .catch((error) => console.error("Server Error in Subget:", error));
  }, []);
  const handleDeleteSubcategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:7207/api/subdel/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Error deleting subcategory: " + result.message);
        return;
      }
      setGetCategory(getcategory.filter((subcategory) => subcategory._id !== id));

      toast.success(result.message);
    } catch (error) {
      console.error("Server error:", error);
      alert("Failed to delete subcategory!");
    }
  };

  const searchData = getcategory.filter(ele => ele.subcategory_name.toLowerCase().includes(search));
  return (
    <div style={{ background:'url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkxNS10ZWNoaS0wMDJfMS5qcGc.jpg)', height: '911px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <Navbar style={{ color: "white", backgroundColor: "navy", padding: "10px", fontWeight: "bold", textAlign: "center", display: 'flex'}}>
        <Container>
          <Link to="/admin" style={{ fontSize: '20px', textDecoration: 'none', color: 'white' }}>Admin</Link>
          <h3>SUBCATEGORY PAGE</h3>
          <input type="text" className="form-control" style={{width: '30rem'}} placeholder="Search..." onChange={(e)=> setSearch(e.target.value)}/>
        </Container>
      </Navbar>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {searchData.map((ele) =>(
          <div key={ele._id} className="card" style={{ width: "20rem", height: "20rem", padding: "10px", textAlign: "center"}}>
            <p style={{ color: "yellow", backgroundColor: "navy", fontSize: "15px", textAlign: "center", padding: "8px" }}>
              Subcategory: {ele.subcategory_name}
            </p>
            <img
              src={ele.image_logo}
              alt="subcategory"
              style={{
                width: "60%",
                height: "60%",
                margin: 'auto',
                objectFit: "cover",
                boxShadow: "0px 0px 5px 2px #888",
                marginTop: '20px',
                borderRadius: '100%'
              }}
            />
            <button onClick={() => handleDeleteSubcategory(ele._id)} className="btn btn-danger" style={{ borderRadius: "0px", marginTop: "10px" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Subgetcategory;
