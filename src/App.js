import React from 'react';
import { useEffect, useCallback } from 'react';

import { ContactContext } from './context/contactContext.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import imageDark from './assets/bg-dark.jpg';
import imageLight from './assets/bg-light.jpg';

import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import _ from 'lodash';
import { useImmer } from 'use-immer'

import { AddContact, EditContact, Navbar, Contacts, ShowInfo } from "./components";
import { getAllContacts, getAllGroups, createContact, deleteContact } from './services/contactService.js';
import ContactMessage from './components/contact/message/ContactMessage.jsx'
import ContactCall from './components/contact/call/ContactCall.jsx'

import NotFoundPage from './components/NotFoundPage.jsx';
import {
  BACKGROUND, PINK,
  PURPLE1, PURPLE5,
  PLUM, GRAY,
  HEADER_TEXT,
  LIGHT_BACKGROUND, LIGHT_TEXT, LIGHT_PURPLE1,
  LIGHT_PURPLE5, LIGHT_PINK, LIGHT_PLUM, LIGHT_GRAY,
} from "./helpers/colors.js";


const App = () => {
  const navigate = useNavigate();

  // states
  const backgroundImageDark = `url(${process.env.PUBLIC_URL + `${imageDark}`})`;
  const backgroundImageLight = `url(${process.env.PUBLIC_URL + `${imageLight}`})`;

  const [themes, setThemes] = useImmer({
    Name: "DARK",
    Background: BACKGROUND,
    backgroundImage: backgroundImageDark,
    Text: LIGHT_TEXT,
    Navbar: '#442265e3',
    Purple1: PURPLE1,
    Purple5: PURPLE5,
    Pink: PINK,
    Plum: PLUM,
    Gray: GRAY,
    HeaderText: ""
  })

  const [contacts, setContacts] = useImmer([]);
  const [contact, setContact] = useImmer({});
  const [filteredContacts, setFilteredContacts] = useImmer([]);

  const [groups, setGroups] = useImmer([]);
  const [loading, setLoading] = useImmer(true);


  // get data from json-server
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contactsData = await getAllContacts();
        const groupsData = await getAllGroups();
        setLoading(false);

        setContacts(contactsData.data);
        setFilteredContacts(contactsData.data);
        setGroups(groupsData);


      } catch (err) {
        setLoading(false);
        console.log(err.message);
        toast.error(`${err.message}`, {
          style: {
            color: themes.Background
          },
        })
      };

    };
    fetchData();
  }, [])

  // Change Themes
  const handleThemes = useCallback(() => {
    if (themes.Name === "DARK") {
      setThemes({
        Name: "LIGHT",
        Background: LIGHT_BACKGROUND,
        backgroundImage: backgroundImageLight,
        Navbar: 'white',
        Text_light: LIGHT_TEXT,
        Purple1: LIGHT_PURPLE1,
        Purple5: LIGHT_PURPLE5,
        Pink: LIGHT_PINK,
        Plum: LIGHT_PLUM,
        Gray: LIGHT_GRAY,
        HeaderText: HEADER_TEXT

      })
    } else {
      setThemes({
        Name: "DARK",
        Background: BACKGROUND,
        backgroundImage: backgroundImageDark,
        Navbar: '#442265e3',
        Purple1: PURPLE1,
        Purple5: PURPLE5,
        Pink: PINK,
        Plum: PLUM,
        Gray: GRAY
      })
    }
  }, [themes])


  // search contacts
  const contactSearch = _.debounce((query) => {
    if (query) {
      setContacts(contacts.filter((item) =>
        item.name.toLowerCase().startsWith(query.toLowerCase())
      ));
    } else {
      setContacts(filteredContacts)
    }

  }, 1000);

  // create contact
  const createContactForm = async (values) => {
    try {
      setLoading((draft) => !draft);

      // send req to server for create contact
      const { status, data } = await createContact(values);
      if (status === 201) {

        setContacts((draft) => {
          draft.push(data);
        });

        setContact({});
        setLoading(false);
        navigate("/contacts");

        toast('Successfully Created!', {
          duration: 3000,
          position: 'top-left',

          // Styling
          style: {
            color: BACKGROUND,
            backgroundColor: PINK
          },

          // Custom Icon
          icon: '👍',

          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });

      }
    } catch (err) {
      console.log(err.message);
      toast.error(`${err.message}`, {
        style: {
          color: BACKGROUND
        },
      })

    }
  }

  // set value in form
  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    })
  }

  // confirm delete contact
  const confirmDelete = (contactId) => {
    // get contact name for toastify
    const deletedContact = filteredContacts.filter((c) => c.id === contactId)
    const getDeletedContactName = deletedContact.map((a) => {
      return a.name;
    })
    confirmAlert({
      message: `Are you sure delete ${getDeletedContactName}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => contactDelete(contactId)
        },
        {
          label: 'No',
          onClick: () => navigate("/contacts")
        }
      ],
    });
  };

  // delete contact
  const contactDelete = async (contactId) => {
    // get contact name for toastify
    const deletedContact = filteredContacts.filter((c) => c.id === contactId)
    const getDeletedContactName = deletedContact.map((a) => {
      return a.name;
    })

    try {
      // sending req to json-server
      const { status } = await deleteContact(contactId);

      if (status === 200) {
        // update for contacts
        setContacts((draft) => draft.filter((c) => c.id !== contactId));
        setFilteredContacts((draft) => draft.filter((c) => c.id !== contactId));


        toast.success(`${getDeletedContactName} Deleted!`, {
          duration: 1000,
          // Styling
          style: {
            color: BACKGROUND,
            backgroundColor: PINK
          },
          // Custom Icon
          icon: '👌',
          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        })

      }
    } catch (err) {
      console.log(err.message)
      toast.error(`${err.message}`)
      setContacts(...contacts);
      setFilteredContacts(...contacts);
    }


  }

  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contact,
      filteredContacts,
      setContacts,
      contacts: contacts,
      groups: groups.data,
      themes,
      setFilteredContacts,
      onContactChange,
      deleteContact: confirmDelete,
      createContact: createContactForm,
      contactSearch: contactSearch,
      handleThemes,
    }}>
      <div className="App" style={{ backgroundImage: themes.backgroundImage, overflow: 'hidden' }}>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/contacts' />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/contacts/:id' element={<ShowInfo />} />
          <Route path='/contacts/EditContact/:id' element={<EditContact />} />
          <Route path='/contacts/addContact' element={<AddContact />} />
          <Route path='/contacts/contact/message/:id' element={<ContactMessage />} />
          <Route path='/contacts/contact/call/:id' element={<ContactCall />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </ContactContext.Provider>

  );
}

export default App;
