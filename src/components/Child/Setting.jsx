import "../../css/style1.css";

import { React, useState } from "react";
import { useNavigate, useLocation}  from "react-router-dom";

import AccountService from '../../services/AccountService';
import { encryption } from '../../util/EncryptionHandler';

function Setting() {
    let location = useLocation();
    let navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [userId] = useState(location.state.userId);
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            oldPassword,
            newPassword,
            confirmNewPassword,
            userId
        );

        let password = { userId ,oldPassword: encryption(oldPassword), newPassword: encryption(newPassword)}
        AccountService.updatePasswordByUserId(password).then(res => {
            console.log(res.data)
        });
    };


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
        AccountService.deleteAccountByUserId(userId).then(res => {
            console.log(res.data)
        });
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
                        required
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
                        required
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
                        required
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
                        onClick={()=> navigate('/profile', { state: {
                            userId: userId
                        }})}
                    >
                        Cancel
                    </button>
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
