const preProcessing = require('./pre-processing');
const validate = require('./validate');
const dataHelper = require('./data-helper');

const addContact = (dbPath, contacts, newContact) => {
    let status = {isDone: null, error: null};
    newContact.name = preProcessing.formatName(newContact.name);
    if(validate.phoneChecked(newContact.phone)){
        newContact.id = contacts.autoIncrement;
        contacts.list.push(newContact);
        let save = dataHelper.saveData(contacts.autoIncrement + 1, contacts.list, dbPath);
        if(save.isDone) {
            status.isDone = true;
            contacts.autoIncrement += 1;
        } else {
            status.error = save.error;
        }
    } else {
        status.isDone = false;
        status.error  = "Phone is invalid";
    }
    return status;
}

const updateContact = (dbPath, contacts, newContact, contactId) => {
    let status = {isDone: null, error: null};
    newContact.name = preProcessing.formatName(newContact.name);
    if(validate.phoneChecked(newContact.phone)){
        let index = contacts.list.findIndex((item) => {
            return item.id == contactId;
        });
        if(~index) {
            contacts.list[index].name = newContact.name;
            contacts.list[index].phone = newContact.phone;
            let save = dataHelper.saveData(contacts.autoIncrement, contacts.list, dbPath);
            if(save.isDone) {
                status.isDone = true;
            } else {
                status.error = save.error;
            }
        } else {
            status.isDone = false;
            status.error = "ID is not exist";
        }
    } else {
        status.isDone = false;
        status.error  = "Phone is invalid";
    }
    return status;
}

const removeContact = (dbPath, contacts, contactId) => {
    let status = {isDone: null, error: null};
    let index = contacts.list.findIndex((item) => {
        return item.id == contactId;
    });
    if(~index) {
        contacts.list.splice(index,1);
        let save = dataHelper.saveData(contacts.autoIncrement, contacts.list, dbPath);
        if(save.isDone) {
            status.isDone = true;
        } else {
            status.error = save.error;
        }
    } else {
        status.isDone = false;
        status.error = "ID is not exist";
    }
    return status;
}

const searchContact = (contacts, keyword) => {
    return contacts.list.filter((item) => {
        let name = item.name.toLowerCase();
        keyword  = keyword.toLowerCase();
        return name.includes(keyword) || item.phone.includes(keyword);
    })
}


module.exports = {
    addContact,
    updateContact,
    removeContact,
    searchContact
}