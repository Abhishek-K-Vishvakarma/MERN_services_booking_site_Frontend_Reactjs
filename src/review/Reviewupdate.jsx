import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SiUnity } from "react-icons/si";
const Reviewupdate = () => {
  const [rev, setRev] = useState([]);
  const [msg, setMsg] = useState("");
  const [c, setC] = useState("");
  const [r, setR] = useState("");
  const [ids, setIds] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:7207/api/reviewget");
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setRev(data.reviews || []);
      } catch (err) {
        setError(err.message);
        setRev([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handlePushData = (id) => {
    const setdata = rev.find(u => u.review_id === id);
    if (!setdata) {
      alert("Review not found");
      return;
    }

    setIds(setdata.review_id);
    setC(setdata.comment || '');
    setR(setdata.rating || '');
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();

    if (!ids) {
      alert("Please select a review to update first");
      return;
    }

    if (!c.trim() || !r.trim()) {
      alert("Comment and rating cannot be empty");
      return;
    }

    const upReview = {
      comment: c,
      rating: r
    };

    try {
      const response = await fetch(`http://localhost:7207/api/reviewput/${ids}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(upReview)
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      const uprevData = await response.json();
      setMsg(uprevData.message || "Review updated successfully");

      // Refresh the reviews after update
      const refreshResponse = await fetch("http://localhost:7207/api/reviewget");
      const refreshData = await refreshResponse.json();
      setRev(refreshData.reviews || []);

      setTimeout(() => {
        setMsg("");
        navigate("/getuserservice");
      }, 3000);
    } catch (error) {
      console.error("Update error:", error);
      setMsg(error.message);
    }
  };

  const reviewSearch = rev.filter(user => {
    if (!user || !search) return true;

    const searchTerm = search.toLowerCase();
    const fieldsToSearch = ['service_name', 'user_name', 'comment'];

    return fieldsToSearch.some(field =>
      user[field] && user[field].toString().toLowerCase().includes(searchTerm)
    );
  });

  if (loading) {
    return <div className="text-center mt-5">Loading reviews...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">Error: {error}</div>;
  }

  return (
    <div style={{ backgroundColor: '#999', minHeight: '100vh', paddingBottom: '50px' }}>
      <Navbar style={{backgroundColor: 'navy', color: 'white'}}>
        <Container>
          <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', marginLeft: '-16rem', boxShadow: '0px 0px 5px 2px #999', padding: '6px 10px' }} to="/" ><SiUnity style={{ fontSize: '80px' }} /> Home Dashboard</Link>
          <h4>User Review Updation Page</h4>
          <h5>Search review data with User name</h5>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ width: '300px' }}
          />
        </Container>
      </Navbar>

      <div className="container mt-4">
        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {reviewSearch.length > 0 ? (
                reviewSearch.map((ele) => (
                  <tr key={ele.review_id}>
                    <td>{ele.user_name}</td>
                    <td>{ele.comment}</td>
                    <td>{ele.rating}</td>
                    <td>
                      <button
                        onClick={() => handlePushData(ele.review_id)}
                        className="btn btn-danger"
                        style={{ boxShadow: '0px 0px 5px 2px #999' }}
                      >
                        Update <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No reviews found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <form
              onSubmit={handleUpdateReview}
              className="card"
              style={{
                padding: '30px',
                borderRadius: '0px',
                boxShadow: '0px 0px 5px 2px #999'
              }}
            >
              {!msg ? (
                <h4 style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '15px',
                  backgroundColor: '#cc0c39'
                }}>
                  UPDATE REVIEW
                </h4>
              ) : (
                <p style={{
                  color: 'green',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>
                  {msg}
                </p>
              )}

              <div className="form-group mt-3">
                <input
                  type="text"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  placeholder="Set Comment data"
                  className="form-control"
                  style={{
                    padding: '15px',
                    border: 'none',
                    boxShadow: '0px 0px 5px 2px #999'
                  }}
                />
              </div>

              <div className="form-group mt-3">
                <input
                  type="text"
                  value={r}
                  onChange={(e) => setR(e.target.value)}
                  placeholder="Set Rating data"
                  className="form-control"
                  style={{
                    padding: '15px',
                    border: 'none',
                    boxShadow: '0px 0px 5px 2px #999'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3"
                style={{
                  padding: '15px',
                  border: 'none',
                  boxShadow: '0px 0px 5px 2px #999',
                  backgroundColor: 'navy',
                  color: 'white',
                  width: '100%'
                }}
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviewupdate;
