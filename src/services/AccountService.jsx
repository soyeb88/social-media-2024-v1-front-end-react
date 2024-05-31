import axios from 'axios'

const ACCOUNT_API_BASE_URL="http://localhost:8080/user";

class AccountService{

    createAccount(user){
        return axios.post(ACCOUNT_API_BASE_URL, user);
    }

    getUserIdtByUserIdAndPassword(login){
        return axios.post(ACCOUNT_API_BASE_URL + '/login', login);
    }

    getUserDetailstByUserId(userId){
        return axios.get(ACCOUNT_API_BASE_URL + '/' + userId);
    }
}

export default new AccountService();