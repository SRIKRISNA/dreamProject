import axios from "axios";
import { useState } from "react";
import { Navigate } from 'react-router-dom';
import './form.css';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';


function Login() {
    const [login, setLogin] = useState({
        userName: "",
        password: "",
    })
    // const navigat = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login.userName === "" || login.password === "") {
            alert("username or passwrod is missing..!")
        } else {
            axios({
                url: 'http://localhost:5000/login',
                method: 'POST',
                headers: {},
                data: login
            }).then((res) => {
                localStorage.setItem('authorization', login.data.AuthToken);
                <Navigate to='/dashboard' />
            }).catch((err) => {
                setLogin({ userName: "", password: "" });
                alert("username or password wrong");
            })
        }
        setLogin({ userName: "", password: "" });
    }

    const handleSubmit = () => {
        <Navigate to='/register' />
    }
    const inputHandle = (e, id) => {
        if (id === 'username') {
            setLogin({ ...login, userName: e.target.value });
        } else if (id === 'password') {
            setLogin({ ...login, password: e.target.value });
        }
    }
    
    // password visibility on/off
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if(type === 'password'){
            setIcon(eye);
            setType('text');
        }else{
            setIcon(eyeOff);
            setType('password');
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
                            <span onClick={handleToggle} style={{display:"none"}}><Icon icon={icon} size={20} /></span>
                        </div>
                        <div className="btns">
                            <button onClick={handleLogin} id='regBtn'>Login</button>
                            <p>New user? click register</p>
                            <button onClick={handleSubmit} id='logBtn'>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;