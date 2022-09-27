const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

//in the following, I treat the mobile number
//as a unique identifier for each record
//since each user must have a unique mobile number 
let contacts = [{
    "name": "Lama Fakhreddine",
    "profession": "Software Engineer",
    "telephone_number": "05431882",
    "mobile_number": "76690081"
},
{
    "name": "Rayan Fakhreddine",
    "profession": "Software Engineer",
    "telephone_number": "01131882",
    "mobile_number": "76690000"
},
{
    "name": "Mahmoud Fakhreddine",
    "profession": "Electric Technician",
    "telephone_number": "05431888",
    "mobile_number": "71690991"
}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const contact = req.body;

    console.log(contact);
    contacts.push(contact);

    res.send('Contact is added to the database');
});

app.get('/contact', (req, res) => {
    res.json(contacts);
});

app.get('/contact/:mobile_number', (req, res) => {
    const mobile_number = req.params.mobile_number;

    for (let contact of contacts) {
        if (contact.mobile_number === mobile_number) {
            res.json(contact);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Contact not found');
});

app.delete('/contact/:mobile_number', (req, res) => {
    console.log("calling delete api")
    const mobile_number = req.params.mobile_number;
    contacts = contacts.filter(i => {
        if (i.mobile_number !== mobile_number) {
            return true;
        }
        return false;
    });    console.log("after delete: " +  contacts)
    // sending 404 when not found something is a good practice
    res.send('Contact is deleted');
});

app.post('/contact/:mobile_number', (req, res) => {
    const mobile_number = req.params.mobile_number;
    const newContact = req.body;

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].mobile_number === mobile_number) {
            contacts[i] = newContact;
        }
    }

    // sending 404 when not found something is a good practice
    // res.send('Contact is edited');

});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));