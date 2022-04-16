import React from 'react'
import { Link } from 'react-router-dom'
import userP from '../images/avatar.png'
import {useLocation} from 'react-router-dom';


const ContactDetail = () => {

    const location = useLocation();
    console.log({location})
    console.log("MY STATE",location.state)

    const {name, email} = location.state;

    return (
        <div className='main'>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={userP} alt='user' />
                </div>
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div className='description'>{email}</div>
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