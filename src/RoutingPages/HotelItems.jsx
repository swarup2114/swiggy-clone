import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { popupContext } from '../App';
import { useParams } from 'react-router-dom';
import Loading from '../components/Pages/Loading';
import "../StyleComponents/hotelItems.css"

const API_BASE_URL = "https://backend-nodejs-suby.onrender.com";

const HotelItems = () => {
    const {isPopUpOpen, setIsPopUpOpen,  setUserCart } = useContext(popupContext); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { hotelId } = useParams();

    const addCartItem = (item) => {
        let userData = JSON.parse(localStorage.getItem("currentUser"));

        if (!userData) {
            setIsPopUpOpen(!isPopUpOpen);
            return;
        }

        let updatedCart = [...userData.cart];
        updatedCart.push(item);
        userData.cart = updatedCart;
        localStorage.setItem("currentUser", JSON.stringify(userData));
        setUserCart(updatedCart);
    }

    const getProductList = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/product/${hotelId}/products`);
            setProducts(response.data);
        } catch (error) {
            setError("Error fetching products");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductList();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h3 className='hotel-name'>{products.restaurantName}</h3>
            <div className="product-container">
                {products.products && products.products.map((item) => (
                    <article key={item._id} className='product-lists'>
                        <div>
                            <strong><p>{item.productName}</p></strong>
                            <p>₹{item.price}</p>
                            <p>{item.description}</p>
                        </div>
                        <div>
                            <img src={`${API_BASE_URL}/uploads/${item.image}`} alt="Food item" />
                            <button className='add-btn' onClick={() => addCartItem(item)}>ADD</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default HotelItems;
