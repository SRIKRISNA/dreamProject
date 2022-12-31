import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './form.css';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

function Register() {
    const [userData, setUserData] = useState({
        userName: "",
        password: "",
        cpassword: ""
    })
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.password !== userData.cpassword) {
            alert("Passwords are not matching..!")
        } else {
            axios({
                url: 'http://localhost:5000/user/signup',
                method: 'POST',
                headers: {},
                data: userData
            }).then((res) => {
                console.log(res);
                navigate('/');
                // <Link to='/' />
            }).catch((err) => {
                console.log(err);
            })
        }
        // setUserData({ userName: "", password: "", cpassword: "" })
    }
    // const handleLogin = () => {
    //     <Navigate to='/' />
    // }
    const inputHandle = (e, id) => {
        if (id === "username") {
            setUserData({ ...userData, userName: e.target.value })
        } else if (id === "password") {
            setUserData({ ...userData, password: e.target.value })
        } else {
            setUserData({ ...userData, cpassword: e.target.value })
        }
        // setUserData({ userName: "", password: "", cpassword: "" })
    }

    // password visibility on/off
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    }

    return (
        <div className="reg-container">
            <div className="reg-form">
                <div className="form-title">
                    <h1>Registration Form</h1>
                </div>
                <div className="form-container">
                    <form>
                        <div className="inputs"><input type="text" placeholder="User Name" onChange={(e) => inputHandle(e, 'username')} value={userData.userName}></input></div>
                        <div className="inputs"><input type="password" placeholder="Password" onChange={(e) => inputHandle(e, 'password')} value={userData.password}></input>
                            <span onClick={handleToggle} style={{ display: "none" }}><Icon icon={icon} size={20} /></span>
                        </div>
                        <div className="inputs"><input type="password" placeholder="Confirm Password" onChange={(e) => inputHandle(e, 'cpassword')} value={userData.cpassword}></input>
                            <span onClick={handleToggle} style={{ display: "none" }}><Icon icon={icon} size={20} /></span>
                        </div>
                        <div className="btns">
                            <button onClick={handleSubmit} id='regBtn'>Register</button>
                            <p>Already registered? click login</p>
                            <Link to="/"> <button id='logBtn'>Login</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;