import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import AccountService from '../services/AccountService';
import { encryption } from '../util/EncryptionHandler';
import Logo from '../css/fb.png';
import { PatternUtil } from "./UtilComponents/PatternUtil";
import Validation from "./UtilComponents/Validation";

function FacebookLogInComponent() {
    let navigate = useNavigate();

    const [logInEmailOrPhone, setLogInEmailOrPhone] = useState("");
    const [logInPassword, setLogInPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleLogInButton = (e) => {
        e.preventDefault();
        console.log(
            logInEmailOrPhone,
            logInPassword
        );

        let logIn = { email: "",phone: "", password: null};

        if(PatternUtil.phone_pattern.test(logInEmailOrPhone.trim())){
            logIn.phone = logInEmailOrPhone.trim();
            logIn.email = null;
        }
        else if(PatternUtil.email_pattern.test(logInEmailOrPhone.trim())){
            logIn.email = logInEmailOrPhone.trim();
            logIn.phone = null;
        }
        else{
            logIn.email = logInEmailOrPhone.trim();
        }

        console.log(logIn);

        logIn.password = logInPassword;

        if (isValidationPass(logIn, logInPassword)) {

            logIn.password = encryption(logInPassword);

            console.log(logIn);

            AccountService.logInFacebookAccount(logIn).then(res => {
                console.log(res.data.userId);
                if(res.data.userId!=null){
                    navigate('/facebook/profile' ,  { state: {
                        userId: res.data.userId
                    }})
                }

            }).catch(err => {    
                logIn.password = logInPassword;         
                if (err.response) {
                    console.log(err.response);
                    if(err.response.status ===404){
                        logIn.status = 404;
                        setErrors(Validation(logIn, logInPassword));
                        navigate('/');
                    }
                    if(err.response.status ===401){
                        logIn.status = 401;
                        setErrors(Validation(logIn, logInPassword));
                        navigate('/');
                    }
                    if(err.response.status ===500){
                        navigate('*');
                    }
                }
                else{          
                    navigate('*');
                }
                
            });
        }

    };

    const isValidationPass = (values, logInPassword) => {
        const newErrors = Validation(values, logInPassword)
        let isValid = true;
        console.log(Validation(values, logInPassword));

        if (newErrors.totalError > 0) {
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    }

    return (
        <div>
            
            <nav className='navbar'>
                <img className='logo' src={Logo}></img>
                <form className='login_form'>
                    <div className='email'>
                        <div className='font'>Email or Phone</div>
                        <input type='text' name='' value={logInEmailOrPhone} 
                            onChange={(e) => setLogInEmailOrPhone(e.target.value)}></input>
                            {errors.emailOrPhone && <p className='login_error'>{errors.emailOrPhone}</p>}
                    </div>
                    <div className='password'>
                        <div className='font'>Password</div>
                        <input type='password' name='' value={logInPassword} 
                            onChange={(e) => setLogInPassword(e.target.value)}></input>
                             {errors.password && <p className='login_error'>{errors.password}</p>}
                    </div>
                    <button className='login_btn' onClick={(e) => handleLogInButton(e)}>Login</button>
                </form>
            </nav>
        </div>
    );
}

export default FacebookLogInComponent;
