import { useState } from 'react';
import logo from '../assests/logo.png';
import './main.scss';

const Header = () => {
    // const Authtoken=localStorage.getItem("authorization");
    const UserName = localStorage.getItem("userName");
    // console.log(UserName)
    return(
        <div className="header-container">
            <div className="logo">
                <img src={logo} alt="Beyond-Oil" height="60px"/>
            </div>
            <div className="menu">
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Products</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </div>
            <div className="username-display">{localStorage.getItem("Name")}</div>
        </div>
    )
}
export default Header;