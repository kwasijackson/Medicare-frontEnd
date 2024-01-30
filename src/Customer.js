import {Link,Outlet} from 'react-router-dom';
function Customer() {

    return(
        <div className="container">
            <h2>Welcome to Customer Home Page</h2>
            <Link to="viewMedicineCust">View Medicine |</Link>
            <Link to="viewcart">My Cart|</Link>
            <Link to="/logout">Logout</Link>
            <hr/>
            <Outlet></Outlet>
        </div>
    )

}

export default Customer;