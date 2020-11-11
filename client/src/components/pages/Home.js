import React, { useContext } from 'react'
import ContactFilter from '../contacts/ContactFilter'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import ContactContext from '../../contexts/contact/contactContext'

export default function Home() {
  const { contacts } = useContext(ContactContext)
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        {contacts && <ContactFilter />}
        <Contacts />
      </div>
    </div>
  )
}
