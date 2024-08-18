import React from 'react';
import axios from 'axios'

const ACCOUNT_API_BASE_URL="http://localhost:8083";

class AccountService extends React.Component{

    createFacebookAccount(user){
        return axios.post(ACCOUNT_API_BASE_URL + '/facebook/signup', user);
    }

    logInFacebookAccount(login){
        return axios.post(ACCOUNT_API_BASE_URL + '/facebook/login', login);
    }

    facebookProfile(userId){
        return axios.get(ACCOUNT_API_BASE_URL + '/facebook/profile/' + userId);
    }

    updateFacebookPasswordByUserId(password){
        return axios.put(ACCOUNT_API_BASE_URL + '/facebook/update', password);
    }

    deleteFacebookAccountByUserId(userId){
        return axios.delete(ACCOUNT_API_BASE_URL + '/facebook/' + userId);
    }
}

export default AccountService;