import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './form.css';

function Login() {
    const [login, setLogin] = useState({
        userName: "",
        password: "",
    })
    const Navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login.userName === "" || login.password === "") {
            alert("username or passwrod is missing..!")
        } else {
            axios({
                url: 'http://localhost:5000/user/login',
                method: 'POST',
                headers: {},
                data: login
            }).then((res) => {
                localStorage.setItem('authorization', res.data.AuthToken);
                alert("login successful and connected to 'dashboard'");
                Navigate("/dashboard");
                // <Link to='/dashboard' />
            }).catch((err) => {
                setLogin({ userName: "", password: "" });
                alert("username or password wrong");
            })
        }
        setLogin({ userName: "", password: "" });
    }

    const inputHandle = (e, id) => {
        if (id === 'username') {
            setLogin({ ...login, userName: e.target.value });
        } else if (id === 'password') {
            setLogin({ ...login, password: e.target.value });
        }
    }
    
    return (
        <div className="reg-container">
            <div className="reg-form">
                <div className="form-title">
                    <h1>Login Form</h1>
                </div>
                <div className="form-container">
                    <form>
                        <div className="inputs"><input type="text" placeholder="User Name" onChange={(e) => inputHandle(e, 'username')} value={login.userName}></input></div>
                        <div className="inputs"><input type="password" placeholder="Password" onChange={(e) => inputHandle(e, 'password')} value={login.password}></input>
                            {/* <span onClick={handleToggle} style={{display:"none"}}><Icon icon={icon} size={20} /></span> */}
                        </div>
                        <div className="btns">
                            <button onClick={handleLogin} id='regBtn'>Login</button>
                            <p>New user? click register</p>
                           <Link to="/register"><button id='logBtn'>Register</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;