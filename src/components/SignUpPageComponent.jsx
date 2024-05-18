import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, useParams } from "react-router-dom";

import AccountService from '../services/AccountService';

class SignUpPageComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: '',
            userId: '',
            password: ''
        }

        this.createUser = this.createUser.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    createUser = (event) =>{
        event.preventDefault();
        let user = {name: this.state.name, userId: this.state.userId, password: this.state.password}
        console.log('user =>' + JSON.stringify(user))

        AccountService.createAccount(user).then(res =>{
            this.props.navigate('/profile');
        });
    }

    changeNameHandler = (event) =>{
        this.setState({name: event.target.value})
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
                            <h1>SignUpPageComponent</h1>
                            <div className="card-body">
                                <form onSubmit={this.createUser}>
                                    <div className="form-group">
                                        <label>Full Name: </label>
                                        <input value={this.state.name} onChange={this.changeNameHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>User Name: </label>
                                        <input value={this.state.userId} onChange={this.changeUserIdHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Password: </label>
                                        <input value={this.state.password} onChange={this.changePasswordHandler}></input>
                                    </div>
                                    <button className="btn btn-success" onClick={() => {
                                    }}>Create Your Account!!
                                    </button>
                                    <button className="btn btn-danger" onClick={() => {
                                        this.props.navigate('/')
                                    }}>Cancel 
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const myParams = (WrappedComponent) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <WrappedComponent {...props} params={params} navigate={navigate} />;
}

export default myParams(SignUpPageComponent);
