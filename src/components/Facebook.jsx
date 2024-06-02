import React, { Component } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../css/style.css';
import Logo from '../css/fb.png';
import LogoBody from '../css/fbbdy.png';

import AccountService from '../services/AccountService';
import { encryption } from '../util/EncryptionHandler';

class Facebook extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            password: ''
        }

        this.getUser = this.getUser.bind(this);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    getUser = (event) => {
        event.preventDefault();
        let user = { userId: this.state.userId, password: encryption(this.state.password) }
        console.log('user =>' + JSON.stringify(user))

        AccountService.getUserIdtByUserIdAndPassword(user).then(res => {
            console.log(res.data);
            if (res.data.userId == null) {
                this.props.navigate('/');
            } else {
                //this.props.navigate('/profile');
                this.props.navigate('/profile', {
                    state: {
                        userId: res.data.userId
                    }
                });
            }
            console.log(res.status);
        });
    }

    changeUserIdHandler = (event) => {
        this.setState({ userId: event.target.value })
    }

    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <div>
                
                <nav className='navbar'>
                    <img className='logo' src={Logo}></img>
                    <form className='login_form'>
                        <div className='email'>
                            <div className='font'>Email or Phone</div>
                            <input type='text' name=''></input>
                        </div>
                        <div className='password'>
                            <div className='font'>Password</div>
                            <input type='text' name=''></input>
                        </div>
                        <button className='login_btn'>Login</button>
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

                        <form className='signup_form'>
                            <div>
                                <input className='firstname' type='text' name='' placeholder='First name'></input>
                                <input className='lastname' type='text' name='' placeholder='Last name'></input>
                                <input className='email' type='text' name='' placeholder='Mobile number or Email'></input>
                                <input className='password' type='password' name='' placeholder='Password'></input>
                                <input className='password2' type='password' name='' placeholder='Confirm password'></input>
                            </div>
                            <p className='birthday'>Birthday</p>
                            <div className='birth_date'>
                                <select className='month'>
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
                                <select className='day'>
                                    <option>Day</option><option>1</option><option>2</option><option>3</option><option>4</option>
                                    <option>5</option><option>6</option><option>7</option><option>8</option><option>9</option>
                                    <option>10</option><option>11</option><option>12</option><option>13</option><option>14</option>

                                </select>
                                <select className='year'>
                                    <option>Year</option><option>1971</option><option>1972</option><option>1973</option><option>1974</option>
                                    <option>1995</option><option>1996</option><option>1997</option><option>1998</option><option>1999</option>
                                    <option>2001</option><option>2002</option><option>2003</option><option>2004</option><option>2005</option>

                                </select>
                                <p className='brth_hint'><a href='#'>Why do i need to provide my date of birth?</a></p>
                            </div>
                            
                            <input type='radio' name="gender" value="male"></input>
                            <input type='radio' name="gender" value="female"></input>

                            <p className='font'>Male</p>
                            <p className='font font2'>Female</p>
                            <p className='agreement'>By clicking Sign Up, you agree to our <a href='#'>Terms, Data Policy and Cookies Policy.</a>You may receive SMS Notifications from us and can opt out any time.</p>
                            <button className='signup'>Sign Up</button>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

export const myParams = (WrappedComponent) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <WrappedComponent {...props} params={params} navigate={navigate} />;
}

export default myParams(Facebook);




