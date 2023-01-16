import { useNavigate } from "react-router-dom";
import Header from "./header";
import Products from "./products/products";

function Dashboard(){

    let Navigate = useNavigate();
    const LogOutHandler = (e) => {
        localStorage.setItem('authorization', '');
        Navigate('/');
    }
    return(
        <>
            <Header />
            <h1>Hello Dash</h1>
            <Products/>
            <div className='logout'><button id='b-logout' type="submit" onClick={(e)=> LogOutHandler(e)} >LOGOUT</button></div>
        </>
    )
}
export default Dashboard;