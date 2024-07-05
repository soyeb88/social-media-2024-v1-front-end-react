import React, { Component } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import AccountService from '../../services/AccountService';
import { encryption } from '../../util/EncryptionHandler';


class SignUpPageComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            userId: '',
            password: '',
        }

        this.createUser = this.createUser.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    createUser = (event) => {
        event.preventDefault();
        let user = { name: this.state.name, userId: this.state.userId, password: encryption(this.state.password) }
        console.log('user =>' + JSON.stringify(user))

        AccountService.createAccount(user).then(res => {
            this.props.navigate('/profile', {
                state: {
                    userId: res.data.userId
                }
            });
        });
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value })
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
                            <input type="password" value={this.state.password} onChange={this.changePasswordHandler}></input>
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
        );
    }
}

export const myParams = (WrappedComponent) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <WrappedComponent {...props} params={params} navigate={navigate} />;
}

export default myParams(SignUpPageComponent);
