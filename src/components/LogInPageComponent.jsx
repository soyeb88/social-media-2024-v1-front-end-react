import React, { Component } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import AccountService from '../services/AccountService';
import {encryption} from '../util/EncryptionHandler';

class LogInPageComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            userId: '',
            password: ''
        }

        this.getUser = this.getUser.bind(this);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    getUser = (event) =>{
        event.preventDefault();
        let user = {userId: this.state.userId, password: encryption(this.state.password)}
        console.log('user =>' + JSON.stringify(user))

        AccountService.getUserIdtByUserIdAndPassword(user).then(res =>{
            console.log(res.data);
            if(res.data.userId==null){
                this.props.navigate('/');
            }else{
                //this.props.navigate('/profile');
                this.props.navigate('/profile', { state: {
                    userId: res.data.userId
                }});
            }
            console.log(res.status);
        });
    }

    changeUserIdHandler = (event) =>{
        this.setState({userId: event.target.value})
    }

    changePasswordHandler = (event) =>{
        this.setState({password: event.target.value})
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h1>LogInPageComponent</h1>
                            <div className="card-body">
                                <form onSubmit={this.getUser}>
                                    <div className="form-group">
                                        <label>User Name: </label>
                                        <input value={this.state.userId} 
                                        onChange={this.changeUserIdHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Password: </label>
                                        <input type="password" value={this.state.password} 
                                        onChange={this.changePasswordHandler}></input>
                                    </div>
                                    <button className="btn btn-success" onClick={() => {
                                    }}>Sign In
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-danger" onClick={() => {
                    this.props.navigate('/signup')
                }}>SignUp
                </button>
            </div>
        );
    }
}

export const myParams = (WrappedComponent) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <WrappedComponent {...props} params={params} navigate={navigate} />;
}

export default myParams(LogInPageComponent);