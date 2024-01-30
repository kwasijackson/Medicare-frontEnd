import { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
function AddMedicine() {
    const [pid,setPid]=useState("");
    const [pname, setPname]=useState("");
    const [price, setPrice]=useState(0);
    const [qty , setQty]=useState(0);
    const [category, setCategory]=useState("");
    const [allcategorys, setAllcategorys]=useState([]);
    const [productimage, setProductimage]=useState("");
    const productUrl="http://localhost:8080/Product/add";
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get("http://localhost:8080/Category/allCategory").then(result=>{setAllcategorys(result.data);
    }).catch(error=>{console.log(error)});
    
       },[] );



       const Allcategory=allcategorys.map(q=> 
       <option value={q.cid}>
		{q.categoryname}
		</option>
                );



        const Changgehandler = (e) => { 
            const Id = e.target.value;
           
                axios.get("http://localhost:8080/Category/" + Id).then(result=>{setCategory(result.data);
            }).catch(error=>{console.log(error)});
            
             
          
        
        }
   
   const addMedicine = async (event)=> {
    event.preventDefault();
    let addMedicine= {"pname":pname,"price":price,"qty":qty,"category":category,"productimage":productimage};
   try { let result = await axios.post(productUrl,addMedicine);
    if(result.data==="successful"){
        
        setPname("");
        setPrice("");
        setQty("");
        setCategory("");
        setProductimage("");
        navigate('/Admin/viewMedicine');

    }else {
        alert(result.data);
    }
}catch(ex){
        console.log(ex);
    }

   } 

   
    return(
        <div>
            <div className="container">
            <h2>Add Medicine</h2>
            <form onSubmit={addMedicine}   method="post">
	
	<div className="p-3">
      <div className="form-group row">
	<label className="col-sm-3 col-form-label" htmlFor="Productname" >Product Name</label>
	<div className="col-sm-9">
	<input type="text" value={pname} required minLength="2" maxLength="128" className="form-control" onChange={e=>setPname(e.target.value)} /><br />
        </div>
     </div>
    <div className="form-group row">
	<label className="col-sm-3 col-form-label">Price</label>
	<div className="col-sm-9">
	<input type="number" value={price} name="price" className="form-control" onChange={e=>setPrice(e.target.value)} /> <br />
	  </div>
      </div>
    <div className="form-group row">
	<label className="col-sm-3 col-form-label">Quantity</label>
	<div className="col-sm-9">
	<input type="number"  step="1" value={qty} name="qty"  required min="1" className="form-control" onChange={e=>setQty(e.target.value)}/> <br />
 </div>
      </div>
 <div className="form-group row">
	<label className="col-sm-3 col-form-label">Category</label>
	<div className="col-sm-9">
	<select name="category" className="form-control" onChange={Changgehandler}>
		<option value="">--Select Category--</option>
		
		{Allcategory}
	</select>
	</div>
      </div>
    <div className="form-group row">
	<label className="col-sm-3 col-form-label">Product Image</label>
	<div className="col-sm-9">
	<input type="text" value={productimage} name="productimage" className="form-control" onChange={e=>setProductimage(e.target.value)} /> <br />
	</div>
      </div>
  
<div className="text-center">
   
   <input type="submit" value="Save Product" className="btn btn-primary btn-sm mr-2" />
        <input type="button" value="Cancel" id="btnCancel" className="btn btn-secondary btn-sm" />
      </div>
    </div>
</form>
            </div>
        </div>
    )

}

export default AddMedicine;