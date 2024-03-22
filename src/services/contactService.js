import axios from 'axios'

const SERVER_URL = "http://localhost:9000";

// @desc getAll contacts for show all contacts
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

// @desc get contact for Search contact
export const getContact = (id) => {
    const url = `${SERVER_URL}/contacts/${id}`;
    return axios.get(url);
}

// @desc get Allgroups for show option
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}
// @desc get group for show filter and search
export const getGroup = (id) => {
    const url = `${SERVER_URL}/groups/${id}`;
    return axios.get(url);
}

// @desc create contact and add contact
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url, contact);
}

// @desc update contact
export const updateContact = (contact, id) => {
    const url = `${SERVER_URL}/contacts/${id}`;
    return axios.patch(url, contact, { headers: { "Content-Type": "application/json" } });
}

// @desc delete contact
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url,);
}


