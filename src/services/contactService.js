import axios from "axios";
const SERVER_URL = "http://localhost:9000"

//-------------------------- GET CONTACTS ------------------------------


// @ description: Get All Contacts 
// @ route : Get "http://localhost:9000/contacts"
export const GetAllContacts = ()=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

// @ description: Get Contact with ID
// @ route : Get "http://localhost:9000/contacts/:contactId"
export const GetContact = (contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url)
}

//-------------------------- GET GROUPS ------------------------------

// @ description: Get All Groups 
// @ route : Get "http://localhost:9000/groups"
export const GetAllGroups = ()=>{
    const url = `${SERVER_URL}/groups`;
    return axios.get(url)
}

// @ description: Get Group Name with Group ID 
// @ route : Get "http://localhost:9000/groups/;groupId"
export const GetGroup = (groupId)=>{
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url)
}

//---------------------------- CREAT CONTACT ----------------------------

// @ description: Create New Contact
// @ route : POST "http://localhost:9000/contacts"
export const CreatContact = (contact)=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url, contact)
}

//---------------------------- UPDATE CONTACT ----------------------------

// @ description: Update Contact
// @ route : PUT "http://localhost:9000/contacts/:contactId"

export const UpdateContact = (contact,contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact)
}
//---------------------------- DELETE CONTACT ----------------------------

// @ description: Delete Contact
// @ route : DELETE "http://localhost:9000/contacts/:contactId"

export const deleteContact = (contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url)
}


