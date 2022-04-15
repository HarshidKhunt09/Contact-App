import React, { useRef } from 'react'
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom'

const ContactList = (props) => {

    const inputEl = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id)
    }

    const renderContactList = props.contacts.map((contact) => {
        return(
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>
        );
    })

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }

    return (
        <div className='ui container'>
            <h2>Contact List</h2>
            <Link to='/add'>
            <button className='ui button blue'>Add Contact</button>
            </Link>
            <div className='ui search'>
                <div className='ui icon input'>
                    <input 
                        ref={inputEl}
                        type="text" 
                        placeholder='Search Contacts' 
                        className='prompt' 
                        style={{marginTop:"15px"}} 
                        value={props.term} 
                        onChange={getSearchTerm}
                    />
                </div>
            </div>
        <div className='ui celled list'>{renderContactList}</div>
        </div>
    )
}

export default ContactList