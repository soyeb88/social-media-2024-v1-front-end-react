import {PatternUtil} from './PatternUtil.jsx';

/*https://stackoverflow.com/questions/43127814/regex-for-at-least-1-number-1-lower-case-and-1-upper-case-letter*/

function Validation(values, confirmPassword) {
    
    const errors = {}
    
    errors.totalError = 0;
    
    if(values.firstName === ""){
        errors.firstName = "First Name is Required";
        errors.totalError++;
    }
    else if(!PatternUtil.first_last_name.test(values.firstName)){
        errors.firstName = "First Name is not correct format";
        errors.totalError++;
    }

    if(values.lastName === ""){
        errors.lastName = "Last Name is Required";
        errors.totalError++;
    }
    else if(!PatternUtil.first_last_name.test(values.lastName)){
        errors.lastName = "Last Name is not correct format";
        errors.totalError++;
    }

    if(values.email === "" && values.phone === ""){
        errors.emailOrPhone = "Email or Phone is Required";
        errors.totalError++;
    }
    else if(!PatternUtil.email_pattern.test(values.email) && !PatternUtil.phone_pattern.test(values.phone)){
        errors.emailOrPhone = "Email or Phone is not correct";
        errors.totalError++;
    }
    else if(values.status === 409){
        console.log("worked1");
        errors.emailOrPhone = "Email or Phone is already existed! Please Log In";
    }
    else if(values.status === 404){
        console.log("worked2");
        errors.emailOrPhone = "Email or Phone is not found! Please Sign Up!";
    }
    else if(values.status === 401){
        console.log("worked3");
        errors.emailOrPhone = "Email or Phone doesn't match with Password! Please give correct Password!";
    }
    
   
    if(values.password === ""){
        errors.password = "Password is Required";
        errors.totalError++;
    }
    else if(values.password.length < 6 || values.password.length > 21){
        errors.password = "Password must be between 6 to 20 character!";
        errors.totalError++;
    }
    else if(!PatternUtil.password_pattern.test(values.password)){
        console.log(values.password);
        errors.password = "Password is not correct";
        errors.totalError++;
    }
    

    if(confirmPassword === ""){
        errors.confirmPassword = "Confirm Password is Required";
        errors.totalError++;
    }
    else if(confirmPassword !== values.password){
        console.log("worked please")
        console.log(confirmPassword);
        console.log(values.password);
        errors.confirmPassword = "Password is not match";
        errors.totalError++;
    }

    if(values.dob === false){
        errors.dob = "Date of Birth is Required";
        errors.totalError++;
    }

    if(values.gender === ""){
        errors.gender = "Gender is Required";
        errors.totalError++;
    }

    return errors;
}

export default Validation;
