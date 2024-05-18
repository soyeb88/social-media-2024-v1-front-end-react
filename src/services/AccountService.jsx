import axios from 'axios'

const ACCOUNT_API_BASE_URL="http://localhost:8080/createUserAccount";

class AccountService{
    createAccount(user){
        return axios.post(ACCOUNT_API_BASE_URL, user);
    }
}

export default new AccountService();