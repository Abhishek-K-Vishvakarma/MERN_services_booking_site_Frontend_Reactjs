import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/Authentication";
import { Container, Navbar } from "react-bootstrap";
import { IoHomeSharp } from "react-icons/io5";

const VerifyPayment = () => {
  const [pay, setPay] = useState([]);
  const payRef = useRef();
  const [msg, setMsg] = useState("");
  const [msg1, setMsg1] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [xorfound, setXorFound] = useState("");
  const { notifi } = useAuth();
  const [norxi, setNorxi] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Payment IDs
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:7207/api/getpay");
        const data = await response.json();
        setPay(data.ids || []);
      } catch (error) {
        console.error("Server Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Fetch Notifications when userId is available
  useEffect(() => {
    const userId = notifi.a?.user_id;
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:7207/api/getnotify/${userId}`);
        const data = await response.json();
        setNorxi(data.notify || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [notifi]);

  // Search Payment IDs
  const searchData = pay.filter((ele) =>
    ele.status.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Payment Selection
  const handleComptIds = (id) => {
    const found = pay.find((u) => u.payment_id === id);
    if (found) {
      setXorFound(found.payment_id);
    }
  };

  // Confirm Payment
  const handleConfirmPay = async (e) => {
    e.preventDefault();
    if (!payRef.current.value) {
      alert("Please Choose Payment ID!");
      return;
    }

    const findIds = pay.find((user) => user.payment_id === xorfound);
    if (!findIds) {
      alert("Invalid payment Id!");
      return;
    }

    if (findIds.status !== "Pending") {
      alert("Already paid by this Id!");
      return;
    }

    try {
      const response = await fetch("http://localhost:7207/api/payfy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id: payRef.current.value }),
      });

      const res = await response.json();
      if (!response.ok) {
        setMsg(res.message);
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg1(res.message);
        setTimeout(() => {
          navigate("/bookconfirm");
          setMsg1("");
        }, 3000);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  // Handle Refresh
  const handleRefresh = () => {
    setLoading(true);
    setPay([]);
    navigate(0);
  };

  return (
    <div>
      {loading ? (
        <h2 style={{ textAlign: "center", marginTop: "20rem" }}>Refreshed...</h2>
      ) : (
        <div
          style={{
            background:
              "url(https://img.freepik.com/premium-vector/online-payment-online-banking-digital-technology-online-payment-via-banking-app-using-smartphone_127544-3601.jpg?semt=ais_hybrid)",
            height: "911px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Navbar className="bg-info">
            <Container>
              <Link
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Home <IoHomeSharp />
              </Link>
              <button onClick={handleRefresh} style={{ border: "none", background: "transparent" }}>
                Refresh <img src="ref.svg" alt="refresh" />
              </button>
              <h4>Verify Payment Gateway Page</h4>
            </Container>
          </Navbar>

          <div
            style={{
              width: "40rem",
              padding: "20px",
              marginTop: "20px",
              backdropFilter: "blur(100px)",
            }}
          >
            <p
              style={{
                color: "white",
                backgroundColor: "#cc0c39",
                textAlign: "center",
                padding: "15px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Choose ID for Pending Payment Process!
            </p>
            <br />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              style={{
                width: "29rem",
                padding: "15px",
                border: "none",
                boxShadow: "0px 0px 5px 2px blue",
                outline: "none",
              }}
            />
            <br />
            <br />
            {searchData.length > 0 ? (
              searchData.map((ele) =>
                ele.status === "Pending" ? (
                  <p key={ele.payment_id} style={{ color: "white" }}>
                    PaymentID: {ele.payment_id} || {ele.status}
                  </p>
                ) : null
              )
            ) : (
              <p style={{ textAlign: "center", color: "white" }}>Payment ID not found!</p>
            )}
          </div>

          <div style={{ position: "absolute", left: "50rem", top: "5rem" }}>
            <p style={{ textAlign: "center", color: "red", fontSize: "20px", fontWeight: "bold" }}>{msg}</p>
            <p style={{ textAlign: "center", color: "green", fontSize: "20px", fontWeight: "bold" }}>{msg1}</p>

            <form onSubmit={handleConfirmPay} className="card" style={{ width: "30rem", height: "28rem", padding: "30px" }}>
                <br /><br />
              <h4 style={{ textAlign: "center", backgroundColor: "#cc0c39", padding: "15px", color: 'white'}}>Payment Recharge!</h4>
                <br /><br />
              <select ref={payRef} onChange={(e) => handleComptIds(e.target.value)} style={{ padding: "15px" }}>
                <option>Choose Payment ID</option>
                {pay.map((ele) => (ele.status === "Pending" ? <option key={ele.payment_id}>{ele.payment_id}</option> : null))}
              </select>
              <br/><br/>
              <button type="submit" style={{ padding: "15px", backgroundColor: "navy", color: "white" }}>
                Confirm Payment!
              </button>
            </form>
            {msg1 &&
              norxi.map((ele) => {
                return <>
                  <h2>{alert(ele.message)}</h2>
                </>
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;
