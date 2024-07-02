import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import AccountService from '../services/AccountService';
import { encryption } from '../util/EncryptionHandler';
import '../css/style.css';
import LogoBody from '../css/fbbdy.png';


function FacebookSignUpComponent() {
    let navigate = useNavigate();

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
    const [dob, setDob] = useState("");


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
            phone: phone, password: encryption(password),gender: gender,dob: month+"-"+day+"-"+year}
            console.log(userDetails)
        AccountService.createFacebookAccount(userDetails).then(res => {
            console.log(res.data)
            navigate('/facebook/profile' ,  { state: {
                userId: res.data.userId
            }});
        });
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July","Aug", "Sep", "Oct", "Nov", "Dec"];

    const mothsList = [];
    months.forEach((months) => {
        mothsList.push(<option>{months}</option>)
    })

    const days = [];
    for(let i = 1; i<32; i++){
        days.push(i);
    }

    const daysList = [];
    days.forEach((days) => {
        daysList.push(<option>{days}</option>)
    })

    const years = [];
    for(let i = 1950; i<2005; i++){
        years.push(i);
    }

    const yearList = [];
    years.forEach((years) => {
        yearList.push(<option>{years}</option>)
    })

    return (
        <div>        
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
                                {mothsList}
                            </select>
                            <select className='day' value={day} onChange={(e) => setDay(e.target.value)}>
                                <option>Day</option>
                                {daysList}
                            </select>
                            <select className='year' value={year} onChange={(e) => setYear(e.target.value)}>
                                <option>Year</option>
                                {yearList}
                            </select>
                            <p className='brth_hint'><a href='#'>Why do i need to provide my date of birth?</a></p>
                        </div>
                        
                        <div>
                            <input type='radio' name="gender" value="m"  id="male" 
                              style= {{height: '14px', margin: '41px 1px 12px 32px', width:'24px'}} onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="male">Male</label>
                            <input type='radio' name="gender" value="f" id="female"
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

export default FacebookSignUpComponent;
