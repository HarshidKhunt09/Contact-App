import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import profilePic from '../images/blank-profile-picture.png'

const ContactCard = (props) => {

    const { id, name, email} = props.contact;
    const navigate = useNavigate();

    const onClickHandler = ()=>{
        navigate(`/user/${id}`,{state:{id:id,name:name,email:email}});
    }
    return (
        <div className='item'>
            <img className='ui avatar image' src={profilePic} alt='profile-pic' />
            <div className='content'>
            <a onClick={onClickHandler} href>
                <div className='header'>{name}</div>
                <div>{email}</div>
            </a>
            <i className='trash alternate outline icon' style={{color:'red'}} onClick={() => { props.clickHandler(id) }}></i>
            <Link to={`/edit/${id}`}>
            <i className='edit alternate outline icon' style={{color:'blue'}}></i>
            </Link>
            </div>
        </div>
    )
}

export default ContactCard