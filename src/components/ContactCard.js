import React from 'react'
import { Link } from 'react-router-dom'
import profilePic from '../images/blank-profile-picture.png'

const ContactCard = (props) => {

    const { id, name, email} = props.contact;

    return (
        <div className='item'>
            <img className='ui avatar image' src={profilePic} alt='profile-pic' />
            <div className='content'>
            <Link to={{pathname:`/user/${id}`}} >
                <div className='header'>{name}</div>
                <div>{email}</div>
            </Link>
            <i className='trash alternate outline icon' style={{color:'red'}} onClick={() => { props.clickHandler(id) }}></i>
            <Link to={`/edit/${id}`}>
            <i className='edit alternate outline icon' style={{color:'blue'}}></i>
            </Link>
            </div>
        </div>
    )
}

export default ContactCard