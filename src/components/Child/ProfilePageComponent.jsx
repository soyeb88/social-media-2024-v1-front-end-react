import React, { Component } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";

import AccountService from '../../services/AccountService';
class ProfilePageComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            userId: this.props.location.state.userId
        }
        
    }

    componentDidMount(){
        
        AccountService.getUserDetailstByUserId(this.state.userId).then((res)=>{
            this.setState({name: res.data.name})
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
                    this.props.navigate('/facebook/setting', { state: {
                        userId: this.state.userId
                    }});
                }}>Setting
                </button>

                <p>{this.state.userId}</p>
                <h1>Wellcome to {this.state.name} my page</h1>
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

export default myParams(ProfilePageComponent);
