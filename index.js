const readline = require('readline-sync');
const validate = require('./control/validate');
const dataHelper = require('./control/data-helper');
const control  = require('./control/control');
const path     = require('path');

const DATABASE_PATH = path.join(__dirname, "db.json");

// read user choose
const userChoose = () => {
    console.log('Contact app menu: '.toUpperCase());
    console.log(`
    1. Show list contact
    2. Add contact
    3. Update contact
    4. Remove contact
    5. Search
    other -> Exit
    `);
    return +(readline.question(">> Your choose: "));
};

// Nhập thông tin contact
const inputContact = () => {
    let name = readline.question("Contact's name: ");
    let phone;
    do {
        phone = readline.question("Phone number: ");
        if(validate.phoneChecked(phone)) {
            return {
                name,
                phone
            }
        } else {
            console.log("Phone is invalid");
        }
    } while(1);
}

// main
(() => {
    let contacts = dataHelper.getData(DATABASE_PATH).data;
    let choose;
    do {
        choose = userChoose();
        loop: switch(choose) {
            case 1: {
                console.table(contacts.list);
                break;
            }
            case 2: {
                let contact = inputContact();
                let add = control.addContact(DATABASE_PATH, contacts, contact);
                if(add.isDone) {
                    console.info("ADD SUCCESS !!!");
                } else {
                    console.error()(`Opps: ${add.error}`);
                }
                break;
            }
            case 3: {
                let contactId = readline.question("ContactID: ");
                let contact = inputContact();
                let update = control.updateContact(DATABASE_PATH, contacts, contact, contactId);
                if(update.isDone) {
                    console.info("UPDATE SUCCESS !!!");
                } else {
                    console.error(`Opps: ${update.error}`);
                }
                break;
            }
            case 4: {
                let contactId = readline.question("ContactID: ");
                let remove = control.removeContact(DATABASE_PATH, contacts, contactId);
                if(remove.isDone) {
                    console.info(`REMOVE SUCCESS !!!`);
                } else {
                    console.error(`Opps: ${remove.error}`);
                }
                break;
            }
            case 5: {
                let keyword = readline.question("Phone or Name: ");
                let searchResult = control.searchContact(contacts, keyword);
                console.table(searchResult);
                break;
            }
            default: break loop;
        }
        if( !choose ) 
            console.info("Bye !!!");
    } while(choose);
})();