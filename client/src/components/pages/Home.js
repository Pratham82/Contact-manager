import React, { useContext, useEffect } from 'react'
import ContactFilter from '../contacts/ContactFilter'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import AuthContext from '../../contexts/auth/authContext'
import ContactContext from '../../contexts/contact/contactContext'

export default function Home() {
  const authContext = useContext(AuthContext)
  const contactContext = useContext(ContactContext)

  const { loadUser } = authContext
  const { contacts } = contactContext

  useEffect(() => {
    loadUser()
    //eslint-disable-next-line
  }, [])

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        {/*{contacts.length > 0 && <ContactFilter />}*/}
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}
