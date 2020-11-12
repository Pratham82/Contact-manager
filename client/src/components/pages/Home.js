import React, { useContext, useEffect } from 'react'
import ContactFilter from '../contacts/ContactFilter'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import ContactContext from '../../contexts/contact/contactContext'
import AuthContext from '../../contexts/auth/authContext'

export default function Home() {
  const authContext = useContext(AuthContext)

  const { loadUser } = authContext

  useEffect(() => {
    loadUser()
    //eslint-disable-next-line
  }, [])

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
