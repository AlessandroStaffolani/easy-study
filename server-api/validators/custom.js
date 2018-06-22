
const moment = require('moment');

exports.isValidDate = (value) => {
    return moment(value).isValid();
};

exports.isOneOfArray = (value, checkers) => {
    if (Array.isArray(checkers)) {
        checkers.forEach(check => {
            console.log(value, check);
            if (value === check) {
                return true;
            }
        })
    }
    return false;
};

exports.isArray = (value) => {
    return Array.isArray(value);
};