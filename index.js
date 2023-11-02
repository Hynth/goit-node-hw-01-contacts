const argv = require("yargs").argv;
const fn = require('./contacts.js');

// TODO: refactor
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
    case "list":
        fn.listContacts();
        break;

    case "get":
        fn.getContactById(id);
        break;

    case "add":
        fn.addContact(name, email, phone);
        break;

    case "remove":
        fn.removeContact(id)
        break;

    default:
        console.warn("\x1B[31m Unknown action type!");
    }
    }

invokeAction(argv);