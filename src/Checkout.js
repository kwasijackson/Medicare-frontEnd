import { MedicineContext } from './Context/myContext';
import { useState, useEffect, useContext } from 'react';
import HeaderComponent from './Component/HeaderComponent';
import FooterComponent from './Component/FooterComponent';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Checkout = () => {
    const [user, setUser]=useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const tokenFromStorage = sessionStorage.getItem('userToken');
        if (tokenFromStorage) {
          setUser(tokenFromStorage);
        }
      }, []); 
    const { cartItems, quantity } = useContext(MedicineContext);
    let totalAmount = 0.0;
    const [checkoutInput, setCheckoutInput] = useState({

        firstname: '',
        secondname: '',
        phone: '',
        address: '',
        email: '',
    });

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
        //checkoutInput = {...checkoutInput,"login":JSON.parse(user)}
    }

    const submitOrder = async(e) => {
        e.preventDefault();

        const checkoutData = {
            firstname: checkoutInput.firstname,
            secondname: checkoutInput.secondname,
            phone: checkoutInput.phonenumber,
            address: checkoutInput.address,
            email: checkoutInput.email,
            "login":JSON.parse(user)
        }

        axios.post("http://localhost:8080/Orders/placeOrder",checkoutData).then(res => {
            if(res.data==="order placed Successfully"){
             Swal.fire("Order placed Successfully", res.data.message,"success");
             navigate('/customer/viewcart');

            }
        })

    }
    return (
        <div>
            <HeaderComponent />
            <div className='py-4'>
                <div className='container'>
                    <h4>My Check out page</h4>
                    <div className='row'>
                        <div className='col-md-7'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>Basic Information</h4>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group md-3'>
                                                <label>First Name</label>
                                                <input type="text" name="firstname" value={checkoutInput.firstname} onChange={handleInput} className='form-control' />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group md-3'>
                                                <label>Second Name</label>
                                                <input type="text" name="secondname" value={checkoutInput.secondname} onChange={handleInput} className='form-control' />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group md-3'>
                                                <label>Email Address</label>
                                                <input type="text" name="email" value={checkoutInput.email} onChange={handleInput} className='form-control' />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group md-3'>
                                                <label>Phone Number</label>
                                                <input type="text" name="phonenumber" value={checkoutInput.phonenumber} onChange={handleInput} className='form-control' />
                                            </div>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='form-group md-3'>
                                                <label>Full Address</label>
                                                <input type="text" name="address" value={checkoutInput.address} onChange={handleInput} className='form-control' />
                                            </div>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='form-group text-end'>
                                                <button className='btn btn-primary' onClick={submitOrder}>PlaceOrder</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className='col-md-5'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th width="50%">Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((cartitem, index) => {
                                        totalAmount += cartitem.product.price * quantity[(cartitem.product.pid)];
                                        return (<tr>
                                            <td>{cartitem.product.pname}</td>
                                            <td>Price {cartitem.product.price} GHS</td>
                                            <td>{quantity[cartitem.product.pid]}</td>
                                            <td>{cartitem.product.price * quantity[(cartitem.product.pid)]} GHS</td>
                                        </tr>)
                                    })}
                                    <tr>
                                        <td colSpan="2" className='text-end'>Grand Total</td>
                                        <td colSpan="2" className='text-end'>{totalAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <FooterComponent />
        </div>
    )
}

export default Checkout

