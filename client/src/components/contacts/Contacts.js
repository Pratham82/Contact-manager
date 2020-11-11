import React, { Fragment, useContext } from 'react'
import ContactContext from '../../contexts/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const { contacts, filtered } = contactContext

  return (
    <Fragment>
      {filtered ? (
        filtered.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))
      ) : contacts ? (
        contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))
      ) : (
        <h3>Please Add contacts</h3>
      )}
    </Fragment>
  )
}
export default Contacts
