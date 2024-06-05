import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AccountService from '../services/AccountService';
import { encryption } from '../util/EncryptionHandler';
import '../css/style.css';
import Logo from '../css/fb.png';
import LogoBody from '../css/fbbdy.png';

function Facebook() {
    //let location = useLocation();
    //let navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [logInEmail, setLogInEmail] = useState("");
    const [logInPhone, setLogInPhone] = useState("");
    const [logInPassword, setLogInPassword] = useState("");

    //const [userId] = useState(location.state.userId);

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
        });
    };


    const handleSignUpButton = (e) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPassword,
            gender,
            month,
            day,
            year
        );

        let userDetails = { firstName: firstName , lastName: lastName, email: email, 
            phone: phone,password: encryption(password),gender: gender,month: month,day: day,year: year}
        AccountService.createFacebookAccount(userDetails).then(res => {
            console.log(res.data)
        });
    };


    return (
        <div>
            <nav className='navbar'>
                <img className='logo' src={Logo}></img>
                <form className='login_form'>
                    <div className='email'>
                        <div className='font'>Email or Phone</div>
                        <input type='text' name='' value={logInEmail} onChange={(e) => setLogInEmail(e.target.value)}></input>
                    </div>
                    <div className='password'>
                        <div className='font'>Password</div>
                        <input type='password' name='' value={logInPassword} onChange={(e) => setLogInPassword(e.target.value)}></input>
                    </div>
                    <button className='login_btn' value={password} onClick={(e) => handleLogInButton(e)}>Login</button>
                </form>
            </nav>

            <section>
                <div className='logo_body'>
                    <img src={LogoBody}></img>
                    <p className='like_font font1'>Thanks for stopping by!</p>
                    <p className='like_font'>We hope to see you again soon.</p>
                </div>

                <div className='signup_body'>
                    <p className='acc_crt'>Create an account</p>
                    <p className='free_hint'>It's free and always will be.</p>

                    <form className='signup_form' action="#">
                        <div>
                            <input className='firstname' type='text' name='' placeholder='First name'
                                value={firstName} onChange={(e) =>
                                    setFirstName(e.target.value)
                                }></input>
                            <input className='lastname' type='text' name='' placeholder='Last name'
                                value={lastName} onChange={(e) =>
                                    setLastName(e.target.value)
                                }></input>
                            <input className='email' type='text' name='' placeholder='Mobile number or Email'
                                value={email} onChange={(e) =>
                                    setEmail(e.target.value)
                                }></input>
                            <input className='password' type='password' name='' placeholder='Password'
                                value={password} onChange={(e) =>
                                    setPassword(e.target.value)
                                }></input>
                            <input className='password2' type='password' name='' placeholder='Confirm password'
                                value={confirmPassword} onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }></input>
                        </div>
                        <p className='birthday'>Birthday</p>
                        <div className='birth_date'>
                            <select className='month' value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option>Month</option>
                                <option>Jan</option>
                                <option>Feb</option>
                                <option>Mar</option>
                                <option>Apr</option>
                                <option>May</option>
                                <option>Jun</option>
                                <option>Jul</option>
                                <option>Aug</option>
                                <option>Sep</option>
                                <option>Oct</option>
                                <option>Nov</option>
                                <option>Dec</option>
                            </select>
                            <select className='day' value={day} onChange={(e) => setDay(e.target.value)}>
                                <option>Day</option><option>1</option><option>2</option><option>3</option><option>4</option>
                                <option>5</option><option>6</option><option>7</option><option>8</option><option>9</option>
                                <option>10</option><option>11</option><option>12</option><option>13</option><option>14</option>

                            </select>
                            <select className='year' value={year} onChange={(e) => setYear(e.target.value)}>
                                <option>Year</option><option>1971</option><option>1972</option><option>1973</option><option>1974</option>
                                <option>1995</option><option>1996</option><option>1997</option><option>1998</option><option>1999</option>
                                <option>2001</option><option>2002</option><option>2003</option><option>2004</option><option>2005</option>

                            </select>
                            <p className='brth_hint'><a href='#'>Why do i need to provide my date of birth?</a></p>
                        </div>
                        
                        <div>
                            <input type='radio' name="gender" value="male"  id="male" 
                              style= {{height: '14px', margin: '41px 1px 12px 32px', width:'24px'}} onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="male">Male</label>
                            <input type='radio' name="gender" value="female" id="female"
                             style= {{height: '14px', margin: '1px 1px 1px 20px', width:'24px'}} onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="female">Female</label>
                        </div>


                        <p className='agreement'>By clicking Sign Up, you agree to our <a href='#'>Terms, Data Policy and Cookies Policy.</a>You may receive SMS Notifications from us and can opt out any time.</p>
                        <button className='signup' onClick={(e) => handleSignUpButton(e)}>Sign Up</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Facebook;
