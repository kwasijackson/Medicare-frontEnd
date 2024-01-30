import { useState ,useEffect , useContext} from "react";
import {Link,useNavigate} from 'react-router-dom';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MedicineContext } from './Context/myContext';
import Login from "./Login";
import axios from 'axios';
import Swal from "sweetalert2";

function ViewMedicineCust() {
  const {isLoggedin} =useContext(MedicineContext);
  const [products, setProducts]=useState([]);
  const [cartproducts, setCartproducts]=useState("");
  const [search, setSearch]=useState("");
  const [currentpage, setCurrentpage]=useState(1);
  const [cart, setCart]=useState(); 
  const [user, setUser]=useState();
  const pagesize=10;
  const navigate = useNavigate();
  const {cartItems} =useContext(MedicineContext);


   useEffect(()=> {
    axios.get("http://localhost:8080/Product/allProduct").then(result=>{setProducts(result.data);
}).catch(error=>{console.log(error)});

   },[] );


   // Load the user token from session storage when the component mounts
  useEffect(() => {
    const tokenFromStorage = sessionStorage.getItem('userToken');
    if (tokenFromStorage) {
      setUser(tokenFromStorage);
    }
  }, []);
  
   

   const addtocart = async (id, e)=>{  
    //console.log(products);
    let tocart ={};
    const productToCart= products.find(prod => prod.pid===id);
    const existingProduct= cartItems.find(x => x.product.pid===id);
    if(existingProduct){
      tocart = {"cartId":existingProduct.cartId,"product":existingProduct.product, "login":existingProduct.login,"quantity":existingProduct.quantity +1}
    }else{
    const cartproduct ={"pid":productToCart.pid,"pname":productToCart.pname,"price":productToCart.price,"productimage":productToCart.productimage,"qty":productToCart.qty,"category":productToCart.category}
     tocart = {"product":cartproduct, "login":JSON.parse(user),"quantity":1}
    }
    try { const result = await axios.post("http://localhost:8080/cart/addToCart",tocart);
      if(result.data==="Added to Cart Successfully"){
         // alert("product added to cart");
          Swal.fire("Success", "","success");
          navigate('');
      }else {
          alert(result.data);
      }
  }catch(ex){
          console.log(ex);
      }
  
     } 
       
  


   function handleChange(event) {
    setSearch(event.target.value)
  }

  const Meddata= products.filter((item) => {
    return search.toLocaleLowerCase === "" ? item : item.pname.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })

  const totalpages = Math.ceil(Meddata.length/pagesize);

  const Nextpage = () => {
    setCurrentpage(currentpage + 1)
  }

  const previouspage = () => {
    setCurrentpage(currentpage -1)
  }

  
   const product =Meddata.slice(currentpage*pagesize -pagesize,currentpage*pagesize).map(q =>
<div class="col-12 col-md-6 col-lg-4">
    <div class="card" style={{"width": "18rem"}}>
      <img src={q.productimage} class="card-img-top img-fit" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{q.pname}</h5>
          <p class="card-text">{q.price} GHS</p>
          <Link to={"/BuyNow/" + q.pid}> <button className="btn btn-primary nav-item mb-2 active">Buy Now</button></Link>
          <Link to={"/AddtoCart/" + q.pid}> <button className="btn btn-primary nav-item active" onClick={(e) => addtocart(q.pid,e)}>Add to Cart</button></Link>
        </div>
    </div>
</div>	

    )

    return(
        <>
        {isLoggedin ? (
          <div>
            <h1>All Medicine</h1>
            <div class="row">
        <div class="col-md-5 mx-auto">
          <div className="input-group">
            <input type="search" placeholder='search for Medicine by Name' className="form-control border-end-0 border rounded-pill" name='search' id="example-search-input" onChange={handleChange} />
            <span className="input-group-append">
              <button className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5" type="button">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </span>
          </div>
        </div>
      </div>
            <div className="row g-3 mt-2">
              {product}
            </div>
      <div id="pagination">
      <button  id="previous" disabled={ currentpage===1 ? true: false} onClick={previouspage}>Prev</button>
      <span>{currentpage} of {totalpages}</span>
      <button id="next" disabled={ currentpage=== totalpages ? true: false} onClick={Nextpage}> Next</button>
      </div>
      </div>
        ):(
          <>
          <Login />
          </>

        )}
 </>
    )

}

export default ViewMedicineCust;