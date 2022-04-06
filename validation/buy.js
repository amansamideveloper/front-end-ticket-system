const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateBuyInput(data) {

    let errors = {};

    data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
    if (Validator.isEmpty(data.fullname)) {
        errors.fullname = 'Fullname field required';
    }
    if (Validator.isEmpty(data.email)) {
        errors.description = 'Email field required';
    }
    if (Validator.isEmpty(data.phonenumber)) {
        errors.phonenumber = 'Phone number of seats field required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}