import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

const ConfirmBookAppoint = () => {
  const [app, setApp] = useState([]);
  const [store, setStore] = useState();
  const [msg, setMsg] = useState();
  const [msg1, setMsg1] = useState();
  const statusRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7207/api/getappoint")
      .then(e => e.json())
      .then((data) => {
        console.log(data.findAll);
        setApp(data.findAll);
      })
  }, []);
 
  const handleId = (id) => {
    const findIds = app.find(u => u._id === id);
    console.log("FindIds :", findIds._id);
    if (findIds) {
      setStore(findIds._id);
    }
  }

  const handleBookAppoint = async (e)=>{
    e.preventDefault();

    if(!statusRef.current.value){
      alert("Fill input field!");
      return;
    }

    const putObj = {
      status : statusRef.current.value
    }

    try {
      const response = await fetch(`http://localhost:7207/api/putbook/${store}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(putObj)
      })
      const res = await response.json();
      console.log(res);
      if(!response.ok){
         setMsg(res.message);
         setTimeout(()=>{
           setMsg("");
         }, 3000);
      }else{
        setMsg1(res.message);
        setTimeout(()=>{
            setMsg1("");
            navigate("/book");
        }, 3000);
      }
    } catch (error) {
      console.log("Server error :", error);
    }
  };



  console.log("Store :", store);
  console.log("app",app);
  return (
    <div style={{backgroundColor: 'navy', height: "911px"}}>
      <div style={{position: 'relative', display: 'flex', justifyContent: 'center', top: '12rem'}}>
        <p style={{ textAlign: "center", color: 'red', fontSize: '20px', fontWeight: 'bold' }}>{msg}</p> <p style={{ textAlign: "center", color: 'green', fontSize: '20px', fontWeight: 'bold' }}>{msg1}</p>
        <form onSubmit={handleBookAppoint} className="card" style={{padding: '50px', width: '30rem', height: '25rem', borderRadius: '0px', boxShadow: '0px 0px 5px 2px #999'}}>
          <h4 style={{ backgroundColor: '#cc0c39', color: 'white', padding: '15px', textAlign: 'center', boxShadow: '0px 0px 5px 2px #999' }}>Confirm BookServices</h4>
          <br/>
          <select ref={statusRef} className="form-control">
            <option>Choose Status</option>
            {
              app.length > 0
              ? 
              (
              app.map((ele)=>{
                return<>
                {
                  (ele.status === "Pending" || ele.status === "Scheduled") ? <option>Booked</option> : null
                }
                </>
              })
              )
              :
              <p></p>
            }
          </select>
          <br />
          <select value={store} onChange={(e) => handleId(e.target.value)} style={{ padding: '15px', boxShadow: '0px 0px 5px 2px #999', border: 'none'}}>
            <option>Choose appointmentId</option>
            {
              app.map((ele) => {
                return <>
                  <div>
                    {
                      (ele.status === "Scheduled" || ele.status === "Pending") ? <option>{ele._id}</option> : null
                    }
                  </div>
                </>
              })
            }
          </select>
          <br /> <br /> 
          <button type="submit" style={{ padding: '15px', color: 'white', backgroundColor: 'navy', border: 'none', boxShadow: '0px 0px 5px 2px #999' }}>Confirm Book</button>
        </form>
      </div>
    </div>
  )
}

export default ConfirmBookAppoint;
