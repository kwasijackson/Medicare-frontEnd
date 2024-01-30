import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { MedicineContext } from './Context/myContext';

function Viewcart() {
  //const [cartItems, setCartItems] = useState([]);
 // const [quantity, setQuantity] = useState({});
  const {emailid,cartItems, setCartItems,quantity, setQuantity} =useContext(MedicineContext);

  useEffect(() => {
    axios.get("http://localhost:8080/cart/myCart/" + emailid).then(result => {
      setCartItems(result.data);
    
      let cart = {};
      result.data.forEach((item) => {
        cart[item.product.pid] = item.quantity;
      });

    setQuantity(cart) 

    }).catch(error => { console.log(error) });

  }, [emailid,setCartItems,setQuantity]);

 
      console.log(emailid)

  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantity));
  }, [quantity]);

  //function to update quantity in cart
const  updateCartQuantity= async(id,cartqty) => {
  const existingProduct= cartItems.find(x => x.product.pid===id);
  let tocart={}
    if(existingProduct){
      tocart = {"cartId":existingProduct.cartId,"product":existingProduct.product, "login":existingProduct.login,"quantity":cartqty}
    }
    
    const result = await axios.post("http://localhost:8080/cart/addToCart",tocart)
}

  function increaseQuantity(id) {
    setQuantity(quantity => {
      const newquantity = { ...quantity }
      newquantity[id] += 1;
      updateCartQuantity(id,newquantity[id]);
      return newquantity;
    });
  }


  function decreaseQuantity(id) {
    setQuantity(quantity => {
      const newquantity = { ...quantity }

      if (newquantity[id] > 1) newquantity[id] -= 1;
      updateCartQuantity(id,newquantity[id])
      return newquantity;
    });
  }

  // delete Item from the cart

  function deleteRow(id, e) {
    axios.delete(`http://localhost:8080/cart/delete/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);

        const newcart1 = cartItems.filter(item => item.cartId !== id);
        setCartItems(newcart1);
      });
  }
//et the grand
  const estimatedTotal = cartItems.map((cartitem, index) => cartitem.product.price * quantity[(cartitem.product.pid)]).reduce((total, curr) => {
    total = total + curr;

    return total;

  }, 0.0);

  console.log(estimatedTotal)

  //populating my cart sss
  let cart_HTML = '';

  if (cartItems.length > 0) {
    cart_HTML = <div className='table-responsive'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Image</th>
            <th className='text-center'>Product Name</th>
            <th className='text-center'>Quantity</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>Subtotal</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartitem, index) =>

            <tr key={cartitem.cartId}>

              <td>{index + 1}.</td>



              <td><img src={cartitem.product.productimage} alt="" width="100px" height="50px" className="img-fluid mb-3" /></td>
              <td width="20%">
                <b>{cartitem.product.pname}</b>
              </td>
              <td width="15%">
                <div className='input-group'>
                  <span><button onClick={() => decreaseQuantity(cartitem.product.pid)}>-</button></span>
                  <b> <span className='p-4 '>{quantity[cartitem.product.pid]}</span></b>
                  <span><button onClick={() => increaseQuantity(cartitem.product.pid)}>+</button></span>
                </div>
              </td>


              <td width="15%"><strong>Price {cartitem.product.price} GHS</strong></td>
              <td width="15%"><strong>{cartitem.product.price * quantity[(cartitem.product.pid)]} GHS</strong></td>
              <td width="10%">
                <div><button className='btn btn-danger mb-2' onClick={(e) => deleteRow(cartitem.cartId, e)}>RemoveItem</button></div>
              </td>
            </tr>
          )}
          <tr >
            <td colspan="5" className='text-right'>
              Estimated Total:
            </td>
            <td>
              <strong>{estimatedTotal}GHS</strong>

            </td>
            <td>
              <Link to="/checkout" className="btn btn-danger p-3 mt-2">CheckOut</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  } else {
    cart_HTML = <div>
      <div className='card card-body py-5 text-center shadow-sm'>
        <h4>Shopping cart is Empty!</h4>

      </div>
    </div>
  }

  return (
    <div className='py-3'>
      <div className="container">
        <h3>My Cart Items</h3>
        <div className="row m-1" >
          <div className="col-md-12">
            {cart_HTML}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewcart;
