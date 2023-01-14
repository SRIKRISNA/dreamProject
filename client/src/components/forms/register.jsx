import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './form.css';

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
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const inputHandle = (e, id) => {
        if (id === "username") {
            setUserData({ ...userData, userName: e.target.value })
        } else if (id === "password") {
            setUserData({ ...userData, password: e.target.value })
        } else {
            setUserData({ ...userData, cpassword: e.target.value })
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
                        </div>
                        <div className="inputs"><input type="password" placeholder="Confirm Password" onChange={(e) => inputHandle(e, 'cpassword')} value={userData.cpassword}></input>
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