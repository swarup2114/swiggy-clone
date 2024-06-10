import React, {  useContext, useState } from 'react';
import { popupContext } from '../../App';
import "../../App.css"
import OrderPlaced from './OrderPlaced';


const API_BASE_URL = "https://backend-nodejs-suby.onrender.com";
const Cart = () => {
const { userCart } = useContext(popupContext);
const  [orderPlacedContainer,setOrderPlacedContainer]=useState(false)
const totalAmount=userCart.length?userCart.reduce((acc,val)=>acc+parseInt(val.price),0):0
console.log(totalAmount);

const handleOrderPlacedComponent=()=>{
  setOrderPlacedContainer(true)
}
  return (
   <div>
    {orderPlacedContainer? <OrderPlaced orderPlacedContainer={orderPlacedContainer}  setOrderPlacedContainer={setOrderPlacedContainer}/>: <div className='cart-container'>
     
     {userCart.length?userCart.map((item,id)=>{
      return(
     
           <div key={id} className="cart-lists">
              <div>
                              <strong><p>{item.productName}</p></strong>
                              <p>₹{item.price}</p>
                              <p>{item.description}</p>
                          </div>
                          <div>
                              <img src={`${API_BASE_URL}/uploads/${item.image}`} alt="Food item" />
                             
                          </div>
          </div>
   
      )
     }):<h5 style={{textAlign:"center"}}>No items in cart</h5>}
   {userCart.length>0 && <div className='cart-delivery'>
    <h3>Total Amount&nbsp;&nbsp;&nbsp;:₹ &nbsp;{totalAmount}</h3>
    <button onClick={handleOrderPlacedComponent}>place order</button>
    </div>}
  
      </div>}
    
   
   </div>

  );
}

export default Cart;
