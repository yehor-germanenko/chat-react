export const required = value => {
    if (value) return undefined;
    return "Field is required";
}

export const minMaxLengthCreator = (minLength, maxLength) => (value) => {
    if (value.length < minLength || value.length > maxLength) {
        return `length should be ${minLength} to ${maxLength}`;
    }
}

export const emailValid = (email) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        return 'Invalid email address';
    }
}