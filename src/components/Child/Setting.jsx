import { React, useState } from "react";
import { useNavigate, useLocation}  from "react-router-dom";

import AccountService from '../../services/AccountService';
import { encryption } from '../../util/EncryptionHandler';
import PasswordValidator from "../UtilComponents/PasswordValidator";

function Setting() {
    let location = useLocation();
    let navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [userId] = useState(location.state.userId);
    const [errors, setErrors] = useState({});
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            oldPassword,
            newPassword,
            userId
        );

        let password = { userId ,oldPassword: oldPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword}
        
        console.log(password);

        if(isValidationPass(password, confirmNewPassword)){
            password.oldPassword = encryption(oldPassword);
            password.newPassword = encryption(newPassword);
            AccountService.updateFacebookPasswordByUserId(password).then(res => {
                password.passwordUpdateResponse = 200;
                setErrors(PasswordValidator(password,  password.newPassword));
                console.log(res.data)
            }).catch(err => {
                if(err.response){
                    if(err.response.status === 404){
                        password.passwordResponse = 404;
                        setErrors(PasswordValidator(password, password.newPassword));
                    }
                    if(err.response.status ===500){
                        navigate('*');
                    }
                }
                else{
                    navigate('*');
                }
            });
        };
    }

    const isValidationPass = (values, confirmNewPassword) => {
        console.log(values);
        const newErrors = PasswordValidator(values, confirmNewPassword)
        let isValid = true;
        console.log(PasswordValidator(values, confirmNewPassword));

        if (newErrors.totalError > 0) {
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    }

    const handleReset = () => {
        // Reset all state variables here
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

    };

    const deleteAccount = () => {

        console.log(
            userId
        );
        AccountService.deleteFacebookAccountByUserId(userId).then(res => {
            console.log(res.data);
            navigate('/');
        }).catch(err => {
            if(err.response){
                if(err.response.status ===500){
                    navigate('*');
                }
            }
            else{
                navigate('*');
            }
        }
            
        );
    };

    return (
        <div className="App">
            <h1>{userId}</h1>
            <h1>Reset Password</h1>
            <fieldset>
                <form action="#" method="get">
                    <label for="oldpassword">
                        Old Password*
                    </label>
                    <input
                        type="password"
                        name="oldpassword"
                        id="oldpassword"
                        value={oldPassword}
                        onChange={(e) =>
                            setOldPassword(e.target.value)
                        }
                        placeholder="Enter Old Password"
                    />
                    <label for="newpassword">New Password*</label>
                    <input
                        type="password"
                        name="newpassword"
                        id="newpassword"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                        placeholder="Enter New PAssword"
                    />
                    <label for="confirmnewpassword">Confirm New Password* </label>
                    <input
                        type="password"
                        name="confirmnewpassword"
                        id="confirmnewpassword"
                        value={confirmNewPassword}
                        onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                        }
                        placeholder="Enter password again"
                    />
                    <button
                        type="reset"
                        value="reset"
                        onClick={() => handleReset()}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        value="Submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit
                    </button>
                    <button
                        type="submit"
                        value="Cancel"
                        onClick={()=> navigate('/facebook/profile', { state: {
                            userId: userId
                        }})}
                    >
                        Cancel
                    </button>
                    {errors.oldPassword && <p style={{ color: 'red', fontSize: '11px' }}>{errors.oldPassword}</p>}
                    {errors.newPassword && <p style={{ color: 'red', fontSize: '11px' }}>{errors.newPassword}</p>}
                    {errors.confirmNewPassword && <p style={{ color: 'red', fontSize: '11px' }}>{errors.confirmNewPassword}</p>}
                    {errors.passwordUpdateResponse && <p style={{ color: 'red', fontSize: '11px' }}>{errors.passwordUpdateResponse}</p>}

                </form>
            </fieldset>
            <div>
            <button
                        type="delete"
                        value="delete"
                        onClick={()=> deleteAccount()
                        }
                    >
                        Delete Account
                    </button>
            </div>
        </div>
    );
}

export default Setting;
