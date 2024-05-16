import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, useParams } from "react-router-dom";

class LogInPageComponent extends Component{
    render(){
        return (
        <div>
            <h1>LogInPageComponent</h1>
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
