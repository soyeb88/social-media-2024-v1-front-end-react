function Validation(values, confirmPassword) {
    
    const errors = {}
    
    errors.totalError = 0;

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const phone_pattern = /^(?=.*\d{5})[\d-]{1,20}$/;
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.firstName === ""){
        errors.firstName = "First Name is Required";
        errors.totalError++;
    }

    if(values.lastName === ""){
        errors.lastName = "Last Name is Required";
        errors.totalError++;
    }

    if(values.email === "" && values.phone === ""){
        errors.emailOrPhone = "Email or Phone is Required";
        errors.totalError++;
    }
    else if(!email_pattern.test(values.email) && !phone_pattern.test(values.phone)){
        errors.emailOrPhone = "Email or Phone is not correct";
        errors.totalError++;
    }

    if(values.password === ""){
        errors.password = "Password is Required";
        errors.totalError++;
    }
    /*else if(!password_pattern.test(values.password)){
        errors.password = "Password is not correct";
        errors.totalError++;
    }
    */

    if(confirmPassword === ""){
        errors.confirmPassword = "Confirm Password is Required";
        errors.totalError++;
    }
    else if(confirmPassword !== values.password){
        errors.confirmPassword = "Confirm Password is not match with password";
        errors.totalError++;
    }

    return errors;
}

export default Validation;
