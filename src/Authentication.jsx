import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);
  const [addsend, setAddSend] = useState([]);
  const [booknow, setBookNow] = useState([]);
  const [appointment, setAppointment] = useState([])
  // const [payid, setPayId] = useState([]);
  const [notifi, setNotifi] = useState([]);
  const [canid, setCanId] = useState([]);
  const [sbook, setSBook] = useState();
  const [rate, setRate] = useState();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setAddSend(JSON.parse(storedCart)); // ✅ Parse stored JSON correctly
      console.log("✅ Authentication Cart Data:", JSON.parse(storedCart));
    }

    const bookData = localStorage.getItem("book");
    if(bookData){
      setBookNow(JSON.parse(bookData));
      console.log("Book data from Authentication :", JSON.parse(bookData));
    } 

    const appointBook = localStorage.getItem("appoint");
    if(appointBook){
      setAppointment(JSON.parse(appointBook));
      console.log("Auth Appoint data :", appointBook);
    } 

    // const paybook = localStorage.getItem("pay");
    // if(paybook){
    //   setPayId(JSON.parse(paybook));
    //   console.log("Payment-Id from Authentication :", paybook);
    // }

    const canData = localStorage.getItem("cencel");
    if(canData){
      setCanId(JSON.parse(canData));
      console.log("Cancel Id from Authentication :", canData);
    }

    const notifyId = localStorage.getItem("notify");
    if(notifyId){
      setNotifi(JSON.parse(notifyId));
      console.log("Notify from Authentication :", notifyId);
    }

    const sBookData = localStorage.getItem("s_books");
    if(sBookData){
       setSBook(JSON.parse(sBookData));
       console.log("Service booking single data from Authentication :", sBookData);
    }

    const rStar = localStorage.getItem('star');
    if(rStar){
      setRate(JSON.parse(rStar));
      console.log("Star Rating from Authentication :", rStar);
    }
  }, []);

  // ✅ Login Function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ Add Item to Cart (without overwriting previous items)
  const addtoCartData = (addcart) => {
    setAddSend((prevCart) => {
      const updatedCart = [...prevCart, addcart];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };


  const bookserviceuser = (book) => {
    setBookNow((prevBook) => {
      const updatedBook = [...prevBook, book];
      localStorage.setItem("book", JSON.stringify(updatedBook));
      return updatedBook;
    });
  };

  const appointmentService = (appoint)=>{
    const app = localStorage.setItem("appoint", JSON.stringify(appoint));
    setAppointment(app);
  };

  // const paymentIDdata = (pay)=>{
  //   const locatePay = localStorage.setItem("pay", JSON.stringify(pay));
  //   setPayId(locatePay);
  // }

  const appointCancel = (cancel)=>{
    const locateAppoint = localStorage.setItem("cencel", JSON.stringify(cancel))
    setCanId(locateAppoint);
  }

  const notification_user_id = (user_ids)=>{
    const localnotify = localStorage.setItem("notify", JSON.stringify(user_ids));
    setNotifi(localnotify);
  }

  const singleBook = (single)=>{
      const books = localStorage.setItem("s_books", JSON.stringify(single));
      setSBook(books);
  }

  const starReview = (star)=>{
     const ratStar = localStorage.setItem('star', JSON.stringify(star));
     setRate(ratStar);
  }

  // const reviewUpdate = (view)=>{
  //   const rev = localStorage.setItem("view", view);

  // }

  return (
    <AuthContext.Provider value={{ user, login, logout, addtoCartData, addsend, bookserviceuser, booknow, appointmentService, appointment, appointCancel, canid, notification_user_id, notifi, singleBook, sbook, starReview, rate}}>
      {children}
    </AuthContext.Provider>
  );
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
