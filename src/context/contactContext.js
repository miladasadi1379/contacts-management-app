import { createContext } from 'react';

export const ContactContext = createContext({
    loading: false,
    contact: {},
    contacts: [],
    filteredContacts: [],
    mydatafilter: [],
    groups: [],
    errors: [],
    themes: {},
    setLoading: () => { },
    setContacts: () => { },
    setFilteredContacts: () => { },
    onContactChange: () => { },
    deleteContact: () => { },
    updateContact: () => { },
    createContact: () => { },
    contactSearch: () => { },
    handleThemes: () => { }
});