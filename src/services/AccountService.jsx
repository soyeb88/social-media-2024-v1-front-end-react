import axios from 'axios'

const ACCOUNT_API_BASE_URL="http://localhost:8083";

class AccountService{

    /*
    createAccount(user){
        return axios.post(ACCOUNT_API_BASE_URL, user);
    }
    */

    createFacebookAccount(user){
        return axios.post(ACCOUNT_API_BASE_URL + '/facebook/signup', user);
    }

    getUserIdtByUserIdAndPassword(login){
        return axios.post(ACCOUNT_API_BASE_URL + '/login', login);
    }

    logInFacebookAccount(login){
        return axios.post(ACCOUNT_API_BASE_URL + '/facebook/login', login);
    }

    getUserDetailstByUserId(userId){
        return axios.get(ACCOUNT_API_BASE_URL + '/' + userId);
    }

    facebookProfile(userId){
        return axios.get(ACCOUNT_API_BASE_URL + '/facebook/profile/' + userId);
    }

    updatePasswordByUserId(password){
        return axios.put(ACCOUNT_API_BASE_URL + '/update', password);
    }

    deleteAccountByUserId(userId){
        return axios.delete(ACCOUNT_API_BASE_URL + '/' + userId);
    }
}

export default new AccountService();