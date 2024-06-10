import React, { useState,useEffect } from 'react';
import "./App.css"
import NavBar from './components/NavBar';
import Home from './RoutingPages/Home';
import { Route, Routes } from 'react-router-dom';
import HotelItems from './RoutingPages/HotelItems';
import { createContext } from 'react';
import Signup from './components/Pages/Signup';
import LoginPage from './components/Pages/LoginPage';
import Nopage from './components/Pages/Nopage';
import Cart from './components/Pages/Cart';


export const popupContext=createContext()

const App = () => {
  const [isPopUpOPen,setIsPopUpOpen]=useState(false)
  const [popupType, setPopupType] = useState('signup');
  const [currentUser, setCurrentUser] = useState(null);
  const [userCart,setUserCart]=useState([])
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
      setUserCart(user.cart || []);
    }
  }, []);
 
  return (
    <div>
    <popupContext.Provider value={{isPopUpOPen,setIsPopUpOpen,popupType,setPopupType,currentUser,setCurrentUser,userCart,setUserCart}}>
     {isPopUpOPen && popupType==="signup" && <Signup/>}
     {isPopUpOPen && popupType==="Login" && <LoginPage/>}
    <NavBar/>
  
      <Routes>
        <Route path='/' element={   <Home/>}/>
        <Route path="/product/:hotelId" element={<HotelItems/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<Nopage/>}/>

      </Routes>
    </popupContext.Provider>
 

   
    </div>
  );
}

export default App;
