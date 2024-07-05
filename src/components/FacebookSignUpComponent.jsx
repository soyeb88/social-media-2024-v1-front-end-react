import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import AccountService from '../services/AccountService';
import { encryption } from '../util/EncryptionHandler';
import '../css/style.css';
import LogoBody from '../css/fbbdy.png';
import Validation from "./UtilComponents/Validation";
import DateUtil from "./UtilComponents/DateUtil";
import DateFormatter from "./UtilComponents/DateFormatter";

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
    const [dob, setDob] = useState(null);
    const [errors, setErrors] = useState({});
    const [dateUtil, seDateUtil] = useState(DateUtil);


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
            phone: phone, password: password,gender: gender,dob: DateFormatter(month, day, year, dateUtil.months)}
        
         console.log(userDetails);   
            
         
         if(isValidationPass(userDetails)){

            userDetails.password = encryption(password);

            console.log(userDetails);

            AccountService.createFacebookAccount(userDetails).then(res => {
                console.log(res.data)
                navigate('/facebook/profile' ,  { state: {
                    userId: res.data.userId
                }});
            }).catch(err =>{
                console.log(err.message);
                navigate('*')
            });
         }  
            
    };

    const isValidationPass = (values) => { 
        const newErrors = Validation(values)      
        let isValid = true;    
        console.log(Validation(values));
        
        if(newErrors.totalError>0){
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    }

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
                                
                            {errors.firstName && <p style={{color:'red', margin: '3px 5px 5px 4px', width:'182px', float: 'left'}}>{errors.firstName}</p>}
                            {errors.lastName && <p style={{color:'red', margin: '4px 176px 7px 12px', width:'182px', float: 'right'}}>{errors.lastName}</p>}
                            
                            <input className='email' type='text' name='' placeholder='Mobile number or Email'
                                value={email} onChange={(e) =>
                                    setEmail(e.target.value)
                                }></input>
                                {errors.email && <p style={{color:'red', margin: '3px 5px 5px 4px', width:'182px'}}>{errors.email}</p>}
                            <input className='password' type='password' name='' placeholder='Password'
                                value={password} onChange={(e) =>
                                    setPassword(e.target.value)
                                }></input>
                                {errors.password && <p style={{color:'red', margin: '3px 5px 5px 4px', width:'182px'}}>{errors.password}</p>}
                            <input className='password2' type='password' name='' placeholder='Confirm password'
                                value={confirmPassword} onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }></input>
                        </div>
                        <p className='birthday'>Birthday</p>
                        <div className='birth_date'>
                            <select className='month' value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option>Month</option>
                                {dateUtil.monthList}
                            </select>
                            <select className='day' value={day} onChange={(e) => setDay(e.target.value)}>
                                <option>Day</option>
                                {dateUtil.daysList}
                            </select>
                            <select className='year' value={year} onChange={(e) => setYear(e.target.value)}>
                                <option>Year</option>
                                {dateUtil.yearList}
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
