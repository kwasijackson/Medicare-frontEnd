import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Login from './Login';
import SignUp from './SignUp';
import {Routes,Route, BrowserRouter as Router} from 'react-router-dom'
import Admin from './Admin';
import Customer from './Customer';
import AddMedicine from './AddMedicine';
import ViewMedicine from './ViewMedicine';
import EditMedicine from './EditMedicine';
import "bootstrap/dist/css/bootstrap.min.css";
import ViewMedicineCust from './ViewMedicineCust';
import Viewcart from './Viewcart';
import { MedicineContext } from './Context/myContext';
import Logout from './Logout';
import Checkout from './Checkout';
function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [emailid,setEmailiId]=useState("");
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  return (
    <div className="App">
     <MedicineContext.Provider value={{isLoggedin, setIsLoggedin ,emailid,setEmailiId ,cartItems, setCartItems,quantity, setQuantity}} >
     <Router>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/edit/:id" element={<EditMedicine/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/admin' element={<Admin/>}>
        
          <Route path="addMedicine" element={<AddMedicine/>}></Route>
          <Route path="viewMedicine" element={<ViewMedicine/>}></Route>
         

      </Route>
      <Route path='/customer' element={<Customer/>}>

          <Route path="viewMedicineCust" element={<ViewMedicineCust/>}></Route>
          <Route path="viewcart" element={<Viewcart/>}></Route>
         

      </Route>
     </Routes>
     </Router>
     </MedicineContext.Provider>
    </div>
  );
}

export default App;
