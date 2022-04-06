const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateBusInput(data) {

    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.seats = !isEmpty(data.seats) ? data.seats : '';
    if (!Validator.isLength(data.name, { min: 5, max: 200 })) {
        errors.text = 'Text must be between 10 and 200 characters';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description field required';
    }
    if (Validator.isEmpty(data.seats)) {
        errors.seats = 'Number of seats field required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}