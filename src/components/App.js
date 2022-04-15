// npm i uuidv4
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route } from "react-router-dom";
import api from '../api/contacts';
import './App.css';
import Header from '../components/Header'
import AddContact from '../components/AddContact'
import ContactList from '../components/ContactList'
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

export const UserContext = React.createContext()

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (user) => {
    console.log(user);
    const request = {
      id: uuidv4(),
      ...user
    }

    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data])
  }

  const updateContactHandler = async (user) => {
    const response = await api.put(`/contacts/${user.id}`,user);
    const { id } = response.data;
    setContacts(contacts.map(user => {
      return user.id === id ? {...response.data } : user;
    }))
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList)
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
      })
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts) setContacts(retrieveContacts)
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }
    getAllContacts();
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])

  return (
    <div>
      <Header />
      <UserContext.Provider value={contacts}>
        <Routes>
        <Route path='/add' 
        element={<AddContact addContactHandler={addContactHandler} />} />
        <Route path='/edit/:id' 
        element={<EditContact updateContactHandler={updateContactHandler} />} />
        <Route path='/' exact 
        element={<ContactList contacts={searchTerm <1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler}/>} />
        <Route path='/user/:id' element={<ContactDetail />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
