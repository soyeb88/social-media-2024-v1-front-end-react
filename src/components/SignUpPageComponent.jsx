import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, useParams } from "react-router-dom";

class SignUpPageComponent extends Component {
    render() {
        return (
            <div>
                <h1>SignUpPageComponent</h1>
                <div className="container">
                    <form>
                        <div>
                            <label>Full Name: </label>
                            <input></input>
                        </div>
                        <div>
                            <label>User Name: </label>
                            <input></input>
                        </div>
                        <div>
                            <label>Password: </label>
                            <input></input>
                        </div>
                        <button className="btn btn-success" onClick={() => {
                            this.props.navigate('/profile')
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
