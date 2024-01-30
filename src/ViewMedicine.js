import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from "./Component/HeaderComponent";
import FooterComponent from "./Component/FooterComponent";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ViewMedicine() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentpage, setCurrentpage] = useState(1);
  const [user, setUser]=useState();
  const pagesize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/Product/allProduct").then(result => {
      setProducts(result.data);
    }).catch(error => { console.log(error) });

  }, []);

   // Load the user token from session storage when the component mounts
   useEffect(() => {
    const tokenFromStorage = sessionStorage.getItem('userToken');
    if (tokenFromStorage) {
      setUser(tokenFromStorage);
    }
  }, []);
  
   console.log(user);

  function deleteRow(id, e) {
    axios.delete(`http://localhost:8080/Questions/delete/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);

        const product1 = products.filter(item => item.pid !== id);
        setProducts(product1);
      });
  }

  function handleChange(event) {
    setSearch(event.target.value)
  }

  const Meddata = products.filter((item) => {
    return search.toLocaleLowerCase === "" ? item : item.pname.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })

  const totalpages = Math.ceil(Meddata.length / pagesize);

  const Nextpage = () => {
    setCurrentpage(currentpage + 1)
  }

  const previouspage = () => {
    setCurrentpage(currentpage - 1)
  }


  const product = Meddata.slice(currentpage * pagesize - pagesize, currentpage * pagesize).map(q =>
    <tbody>
      <tr>
        <td>{q.pid}</td>
        <td>{q.pname}</td>
        <td>{q.price}</td>
        <td>{q.qty}</td>
        <td>< img src={q.productimage} width="50px" height="50px" /></td>
        <td>
          <Link to={"/edit/" + q.pid}> <button className="btn btn-primary nav-item active">Edit</button></Link>
          &nbsp;&nbsp;&nbsp;
          <button className="btn btn-danger" onClick={(e) => deleteRow(q.pid, e)}>Delete</button>
        </td>
      </tr>
    </tbody>

  )

  return (
    <div>
      <HeaderComponent />

      <h2 className='text-center mb-4'>All Medicine</h2>
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
      <table className="table table-hover table-responsive-xl">
        <thead className="thead-light">
          <tr>
            <th>PId</th>
            <th>PName</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image URL</th>
            <th>Action</th>
          </tr>
        </thead>
        {product}
      </table>
      <div id="pagination" p-4>
        <button id="previous" disabled={currentpage === 1 ? true : false} onClick={previouspage}>Prev</button>
        <span>{currentpage} of {totalpages}</span>
        <button id="next" disabled={currentpage === totalpages || totalpages === 0 ? true : false} onClick={Nextpage}> Next</button>
      </div>
      <FooterComponent />
    </div>
  )

}

export default ViewMedicine;