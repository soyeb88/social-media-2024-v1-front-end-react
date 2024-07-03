function Validation(values) {
    
    const errors = {}
    
    errors.totalError = 0;

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.firstName === ""){
        errors.firstName = "First Name is Required";
        errors.totalError++;
    }

    if(values.lastName === ""){
        errors.lastName = "Last Name is Required";
        errors.totalError++;
    }

    if(values.email === ""){
        errors.email = "Email is Required";
        errors.totalError++;
    }
    else if(!email_pattern.test(values.email)){
        errors.email = "Email is not correct";
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
    return errors;
}

export default Validation;
