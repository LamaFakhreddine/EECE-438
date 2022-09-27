const setEditModal = (mobile_number) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/contact/${mobile_number}`, false);
    xhttp.send();
    const contact = JSON.parse(xhttp.responseText);
    document.getElementById('name').value = contact["name"];
    document.getElementById('profession').value = contact["profession"];
    document.getElementById('telephone_number').value = contact["telephone_number"];
    document.getElementById('mobile_number').value = contact["mobile_number"];
    document.getElementById('editForm').action = `http://localhost:3000/contact/${contact["mobile_number"]}`;
}

const deleteContact = (mobile_number) => {
    console.log("calling deleteContact")
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost:3000/contact/${mobile_number}`, false);
    console.log("opened api")
    xhttp.send();
    alert("Contact deleted");
    location.reload();
}

const loadContacts = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/contact", false);
    xhttp.send();

    const contacts = JSON.parse(xhttp.responseText);

    for (let contact of contacts) {
        const x = `
            <div class="col-4 mt-2 mb-2" >
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${contact.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${contact.profession}</h6>

                        <div>Telephone Number: ${contact.telephone_number}</div>
                        <div>Mobile Number: ${contact.mobile_number}</div>

                        <hr>
                        <button type="button" class="btn btn-primary btn-block" onclick="setEditModal(${contact.mobile_number})" data-toggle="modal" data-target="#editContactModal">Edit</button>
                        <button type="button" class="btn btn-primary btn-block" onclick="deleteContact(${contact.mobile_number})" data-toggle="modal">Delete</button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('contacts').innerHTML = document.getElementById('contacts').innerHTML + x;
    }
}

loadContacts();