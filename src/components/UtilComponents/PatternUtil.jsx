const PatternUtil = {
    first_last_name : /^[a-zA-Z]+$/,
    email_pattern : /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/,
    phone_pattern : /^(?=.*\d{5})[\d-]{1,20}$/,
    password_pattern : /^(?:(?=[@$._-\w]*\d)(?=[@$._-\w]*[a-z])(?=[@$._-\w]*[A-Z])(?=[@$._-\w]*[@$._-])[@$._-\w]*)$/,
    date_pattern: /^\d{1,2}-\d{1,2}-\d{4}$/
}

export {PatternUtil};