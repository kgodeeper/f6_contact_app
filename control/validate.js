const PHONE_REGEX   = /^[0|+84]\d{9,10}$/;

const phoneChecked = (phone) => {
    if(phone.match(PHONE_REGEX)) {
        return true;
    } else {
        return false;
    }
}

module.exports = { phoneChecked }