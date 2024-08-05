import { PatternUtil } from "./PatternUtil";

function PasswordValidator(values, confirmNewPassword) {
    
    const errors = {}
    
    errors.totalError = 0;

    if(values.oldPassword === ""){
        errors.oldPassword = "Old Password is Required";
        errors.totalError++;
    }
    if(values.newPassword === ""){
        errors.newPassword = "New Password is Required";
        errors.totalError++;
    }
    else if(values.passwordResponse === 404){
        errors.oldPassword = "Your old password is not correct. Please try again!";
    }
    else if(values.passwordUpdateResponse === 200){
        errors.passwordUpdateResponse = "Your Password Update";
    }
    else if(values.newPassword.length < 6 || values.newPassword.length > 21){
        errors.newPassword = "Password must be between 6 to 20 character!";
        errors.totalError++;
    }
    else if(!PatternUtil.password_pattern.test(values.newPassword)){
        errors.newPassword = "Your New Password is not correct";
        errors.totalError++;
    }
    

    if(confirmNewPassword === ""){
        errors.confirmNewPassword = "Confirm Password is Required";
        errors.totalError++;
    }
    else if(confirmNewPassword !== values.newPassword){
        console.log("worked please")
        console.log(confirmNewPassword);
        console.log(values.newPassword);
        errors.confirmNewPassword = "Password is not match";
        errors.totalError++;
    }

    return errors;
}

export default PasswordValidator;
