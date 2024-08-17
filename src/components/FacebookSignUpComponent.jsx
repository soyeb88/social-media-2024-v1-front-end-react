import { React, useState } from "react";
import { useNavigate} from "react-router-dom";


import AccountService from '../services/AccountService';
import { encryption } from '../util/EncryptionHandler';
import LogoBody from '../css/fbbdy.png';
import Validation from "./UtilComponents/Validation";
import DateUtil from "./UtilComponents/DateUtil";
import DateFormatter from "./UtilComponents/DateFormatter";
import { PatternUtil } from "./UtilComponents/PatternUtil";

function FacebookSignUpComponent() {
    let navigate = useNavigate();


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [errors, setErrors] = useState({});
    const [dateUtil] = useState(DateUtil);


    const handleSignUpButton = (e) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            emailOrPhone,
            password,
            confirmPassword,
            gender,
            month,
            day,
            year
        );

        let userDetails = {
            firstName: null, lastName: null, email: "",
            phone: "", password: null, gender: null, dob: null
        };

       

        if (PatternUtil.phone_pattern.test(emailOrPhone.trim())) {
            userDetails.phone = emailOrPhone.trim();
            userDetails.email = null;
        } else if (PatternUtil.email_pattern.test(emailOrPhone.trim())) {
            userDetails.email = emailOrPhone.trim();
            userDetails.phone = null;
        }
        else {
            userDetails.email = emailOrPhone.trim();
        }

        console.log(userDetails);
        
        userDetails.firstName = firstName.trim();
        userDetails.lastName = lastName.trim();
        userDetails.password = password;
        userDetails.gender = gender;
        userDetails.dob = DateFormatter(month, day, year, dateUtil.months);

        console.log(userDetails);


        if (isValidationPass(userDetails, confirmPassword)) {

            userDetails.password = encryption(password);

            console.log(userDetails);


            AccountService.createFacebookAccount(userDetails).then(res => {
                console.log(res.data);
                navigate('/facebook/profile', {
                    state: {
                        userId: res.data.userId
                    }
                });

            }).catch(err => {
                if (err.response) {
                    console.log(err.response);
                    if(err.response.status ===409){
                        userDetails.status = 409;
                        setErrors(Validation(userDetails, encryption(confirmPassword)));
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


    const isValidationPass = (values, confirmPassword) => {
        const newErrors = Validation(values, confirmPassword)
        let isValid = true;
        console.log(Validation(values, confirmPassword));

        if (newErrors.totalError > 0) {
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    }


    return (
        <div>
            <section>
                <div className='logo_body'>
                    <img src={LogoBody} alt="No Image available"></img>
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

                            {errors.firstName && <p className='sign_up_error_first_name'>{errors.firstName}</p>}
                            {errors.lastName && <p className='sign_up_error_last_name'>{errors.lastName}</p>}

                            <input className='email' type='text' name='' placeholder='Mobile number or Email'
                                value={emailOrPhone} onChange={(e) =>
                                    setEmailOrPhone(e.target.value)
                                }></input>
                            {errors.emailOrPhone && <p className='sign_up_error'>{errors.emailOrPhone}</p>}
                            <input className='password' type='password' name='' placeholder='Password'
                                value={password} onChange={(e) =>
                                    setPassword(e.target.value)
                                }></input>
                            {errors.password && <p className='sign_up_error'>{errors.password}</p>}
                            <input className='password2' type='password' name='' placeholder='Confirm password'
                                value={confirmPassword} onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }></input>
                            {errors.confirmPassword && <p className='sign_up_error'>{errors.confirmPassword}</p>}
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
                            {errors.dob && <p className='sign_up_error'>{errors.dob}</p>}
                        </div>


                        <div>
                            <input type='radio' name="gender" value="m" id="male"
                                onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="male">Male</label>
                            <input type='radio' name="gender" value="f" id="female"
                                 onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="female">Female</label>
                        </div>
                        {errors.gender && <p className='sign_up_error'>{errors.gender}</p>}


                        <p className='agreement'>By clicking Sign Up, you agree to our <a href='#'>Terms, Data Policy and Cookies Policy.</a>You may receive SMS Notifications from us and can opt out any time.</p>
                        <button className='signup' onClick={(e) => handleSignUpButton(e)}>Sign Up</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default FacebookSignUpComponent;
