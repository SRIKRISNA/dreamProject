import { useNavigate } from "react-router-dom";

function Dashboard(){

    let Navigate = useNavigate();
    const LogOutHandler = (e) => {
        localStorage.setItem('authorization', '');
        Navigate('/');
    }
    return(
        <>
            <h1>Hello Dash</h1>
            <div className='logout'><button id='b-logout' type="submit" onClick={(e)=> LogOutHandler(e)} >LOGOUT</button></div>
        </>
    )
}
export default Dashboard;