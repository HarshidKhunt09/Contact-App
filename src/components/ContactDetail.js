import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import userP from '../images/avatar.png'
import { UserContext } from './App'

const ContactDetail = () => {

    const users = useContext(UserContext)
    const { id } = useParams();
    const contactDetail = users.find((user) => user.id === id)

    return (
        <div className='main'>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={userP} alt='user' />
                </div>
                <div className='content'>
                    <div className='header'>{contactDetail.name}</div>
                    <div className='description'>{contactDetail.email}</div>
                </div>
            </div>
            <div className='center-div'>
                <Link to='/'>
                    <button className='ui button blue' style={{ marginLeft: 360 }}>
                        Back to Contact List</button>
                </Link>
            </div>
        </div>
    )
}

export default ContactDetail