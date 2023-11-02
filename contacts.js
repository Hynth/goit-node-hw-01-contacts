
const fs = require("node:fs");
const path = require("node:path");
const shortid = require('shortid');
const { stringify } = require("node:querystring");

const contactsPath = path.join(__dirname, "db", "contacts.json");


// TODO: document each function
function listContacts() {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
            console.log("No file found!");
            return;
        }
        console.log("File content: ");
        console.log(data);
    });
}

function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
            console.log("No file found!");
            return;
        }

        const listContacts = JSON.parse(data);
        const contactById = listContacts.filter(c => c["id"] == contactId);
        console.log(contactById);
    }); 
}

function removeContact(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
            console.log("No file found!");
            return;
        }

        const listContacts = JSON.parse(data);
        const removedContact = listContacts.filter(c => c["id"] != contactId);
        const newListContact = JSON.stringify(removedContact);

        fs.writeFile(contactsPath, newListContact, (err) => {
            if (!!err) {
                console.log("Error! It was not modified the file.");
                return;
            }
            console.log("The file was modified!");
        });

    });
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
            console.log("No file found!");
            return;
        }

        const newListContact = [
            ...JSON.parse(data),
            {
                "id": shortid.generate(),
                "name": name,
                "email": email,
                "phone": phone
            }
        ];

        fs.writeFile(contactsPath, JSON.stringify(newListContact), (err) => {
            if (!!err) {
                console.log("Error! It was not modified the file.");
                return;
            }
            console.log("The file was modified!");
        });
        
    });
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};