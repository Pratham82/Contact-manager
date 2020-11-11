import React, { useContext, useState, useEffect } from 'react'
import ContactContext from '../../contexts/contact/contactContext'

const ContactForm = () => {
  const contactContext = useContext(ContactContext)

  //Setting initial state
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  })

  // Destructuring values from the state
  const { name, email, phone, type } = contact

  // Making  a universal onchange function so it will change with respect to the element with that name and the changed values
  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value })

  const { addContact, current, clearCurrent, updateContact } = contactContext

  const clearAll = () => {
    clearCurrent()
  }

  useEffect(() => {
    if (current !== null) {
      setContact(current)
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      })
    }
  }, [contactContext, current])

  const onSubmit = e => {
    e.preventDefault()
    if (current === null) {
      addContact(contact)
    } else {
      updateContact(contact)
    }

    //Passing the current state to the addContact method from contact
    clearAll()
  }

  return (
    <form action="" onSubmit={onSubmit}>
      {' '}
      <h2 className="text-primary">
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>{' '}
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
      />{' '}
      <input
        type="email"
        placeholder="email"
        name="email"
        value={email}
        onChange={onChange}
      />{' '}
      <input
        type="text"
        placeholder="phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear Contact
          </button>
        </div>
      )}
    </form>
  )
}
export default ContactForm
