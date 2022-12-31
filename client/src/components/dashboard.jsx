import { Link } from "react-router-dom";

function Dashboard(){
    return(
        <>
            <h1>Hello Dash</h1>
            <div className='logout'><Link to='/'><button id='b-logout' type="">LOGOUT</button></Link></div>
        </>
    )
}
export default Dashboard;