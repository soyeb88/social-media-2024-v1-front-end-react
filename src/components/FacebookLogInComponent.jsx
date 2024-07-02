import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import AccountService from '../services/AccountService';
import { encryption } from '../util/EncryptionHandler';
import '../css/style.css';
import Logo from '../css/fb.png';

function FacebookLogInComponent() {
    //let location = useLocation();
    let navigate = useNavigate();

    const [logInEmail, setLogInEmail] = useState("");
    const [logInPhone, setLogInPhone] = useState("");
    const [logInPassword, setLogInPassword] = useState("");

    const handleLogInButton = (e) => {
        e.preventDefault();
        console.log(
            logInEmail,
            logInPassword
        );

        let logIn = { email: logInEmail,password: encryption(logInPassword)}
        console.log(logIn)
        AccountService.logInFacebookAccount(logIn).then(res => {
            console.log(res.data)
            navigate('/facebook/profile' ,  { state: {
                userId: res.data.userId
            }});
        });
    };

    return (
        <div>
            
            <nav className='navbar'>
                <img className='logo' src={Logo}></img>
                <form className='login_form'>
                    <div className='email'>
                        <div className='font'>Email or Phone</div>
                        <input type='text' name='' value={logInEmail} 
                            onChange={(e) => setLogInEmail(e.target.value)} required='true'></input>
                    </div>
                    <div className='password'>
                        <div className='font'>Password</div>
                        <input type='password' name='' value={logInPassword} 
                            onChange={(e) => setLogInPassword(e.target.value)} required='true'></input>
                    </div>
                    <button className='login_btn' onClick={(e) => handleLogInButton(e)}>Login</button>
                </form>
            </nav>
        </div>
    );
}

export default FacebookLogInComponent;
