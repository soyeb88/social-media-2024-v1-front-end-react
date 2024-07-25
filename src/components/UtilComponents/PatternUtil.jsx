const PatternUtil = {
    first_last_name : /^[a-zA-Z]+$/,
    email_pattern : /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/,
    phone_pattern : /^(?=.*\d{5})[\d-]{1,20}$/,
    password_pattern : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
    date_pattern: /^\d{1,2}\-\d{1,2}\-\d{4}$/
}

export {PatternUtil};