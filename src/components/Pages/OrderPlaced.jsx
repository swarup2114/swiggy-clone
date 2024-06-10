import React, { useState, useEffect,useContext } from 'react';
import './orderPlaced.css';
import { popupContext } from '../../App';
import { useNavigate } from 'react-router-dom';
const OrderPlaced = ({setOrderPlacedContainer}) => {
  const usenav=useNavigate()
  const { setUserCart } = useContext(popupContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: '',
    mobileNumber: '',
    landmark: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [orderProgress, setOrderProgress] = useState(0);
  const [showRibbon, setShowRibbon] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const interval = setInterval(() => {
      setOrderProgress(prevProgress => {
        const updatedProgress = prevProgress + 25;
        if (updatedProgress >= 100) {
          clearInterval(interval);
          setShowRibbon(true);
        setTimeout(()=>{
          const user = JSON.parse(localStorage.getItem('currentUser'));
          if (user) {
         
            setUserCart([]);
            user.cart = [];
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          setOrderPlacedContainer(false)
          usenav("/")
        },1000)
        }
        return updatedProgress;
      });
    }, 1000);
  };
  

  useEffect(() => {
    if (showRibbon) {
      const timer = setTimeout(() => setShowRibbon(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showRibbon]);

  return (
    <div>
      {showRibbon && (
        <div className="ribbon-blast">
         
        </div>
      )}
      {submitted ? (
        <div className="order-details">
           {orderProgress===100?<h2 style={{color:"tomato"}}>Order delivered sucessfully </h2>: <h2>Order Placed</h2>
          }
         
          <p>Thank you, {formData.name}! Your order has been placed successfully.</p>
          <p>Order Details:</p>
          <ul>
            <li><strong>Address:</strong> {formData.address}</li>
            <li><strong>Pincode:</strong> {formData.pincode}</li>
            <li><strong>Mobile Number:</strong> {formData.mobileNumber}</li>
            <li><strong>Landmark:</strong> {formData.landmark}</li>
          </ul>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${orderProgress}%` }}></div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Place Your Order</h2>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Pincode:
              <input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Mobile Number:
              <input
                type="number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Landmark:
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Deliver Here</button>
        </form>
      )}
    </div>
  );
}

export default OrderPlaced;
