import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './App'

const EditContact = ({updateContactHandler}) => {

  const users = useContext(UserContext)
  const { id } = useParams();
  const contactDetail = users.find((user) => user.id === id)

  const [user, setUser] = useState({id: contactDetail.id, name:contactDetail.name, email:contactDetail.email});
  const navigate = useNavigate();

  const update = (e) => {
    e.preventDefault();
    if(user.name==="" || user.email===""){
      alert("All the Fields are Mandatory!");
      return;
    }
    updateContactHandler(user);
    setUser({name:"", email:""})
    navigate('/');
  }

  return (
    <div className='ui container main'>
        <h2>Edit Contact</h2>
        <form className='ui form' onSubmit={update}>
            <div className='field'>
                <label>Name</label>
                <input type="text" 
                name="name" 
                placeholder="Name" 
                value={user.name} 
                onChange={(e) => {setUser({...user,name: e.target.value})}} />
            </div>
            <div className='field'>
                <label>Email</label>
                <input type="text" 
                name="email" 
                placeholder="Email" 
                value={user.email} 
                onChange={(e) => {setUser({...user,email: e.target.value})}}/>
            </div>
            <button className='ui button blue'>Update</button>
        </form>
    </div>
  )
}

export default EditContact