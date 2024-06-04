import axios from 'axios'

const ACCOUNT_API_BASE_URL="http://localhost:8080/user";

class AccountService{

    createAccount(user){
        return axios.post(ACCOUNT_API_BASE_URL, user);
    }

    createFacebookAccount(user){
        return axios.post(ACCOUNT_API_BASE_URL + '/facebook', user);
    }

    getUserIdtByUserIdAndPassword(login){
        return axios.post(ACCOUNT_API_BASE_URL + '/login', login);
    }

    getUserIdtByUserIdAndPassword(login){
        return axios.post(ACCOUNT_API_BASE_URL + '/login', login);
    }

    getUserDetailstByUserId(userId){
        return axios.get(ACCOUNT_API_BASE_URL + '/' + userId);
    }

    updatePasswordByUserId(password){
        return axios.put(ACCOUNT_API_BASE_URL + '/update', password);
    }

    deleteAccountByUserId(userId){
        return axios.delete(ACCOUNT_API_BASE_URL + '/' + userId);
    }
}

export default new AccountService();