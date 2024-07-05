import React, { Component } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";

import AccountService from '../../services/AccountService';
class FacebookProfilePageComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            userId: this.props.location.state.userId
        }
        
    }

    componentDidMount(){
        
        AccountService.facebookProfile(this.state.userId).then((res)=>{
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName
            })
        });    
    }

    render() {
        
        return (
            <div>
                <h1>ProfilePageComponent</h1>
                <button className="btn btn-danger" onClick={() => {
                    this.props.navigate('/')
                }}>LogOut
                </button>
                <button className="btn btn-danger" onClick={() => {
                    this.props.navigate('/facebook/setting')
                    this.props.navigate('/facebook/setting', { state: {
                        userId: this.state.userId
                    }});
                }}>Setting
                </button>

                <div>{this.state.userId}</div>
                <h1>Wellcome to {this.state.firstName} {this.state.lastName} my page</h1>
            </div>
        );
    }
}

export const myParams = (WrappedComponent) => (props) => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    return <WrappedComponent {...props} location={location} params={params} navigate={navigate} />;
}

export default myParams(FacebookProfilePageComponent);
