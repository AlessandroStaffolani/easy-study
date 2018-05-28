
const moment = require('moment');

exports.isValidDate = (value) => {
    return moment(value).isValid();
};