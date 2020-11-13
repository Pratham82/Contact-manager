import React, { useContext, useEffect } from 'react'
import ContactFilter from '../contacts/ContactFilter'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import AuthContext from '../../contexts/auth/authContext'

export default function Home() {
  const authContext = useContext(AuthContext)

  const { loadUser } = authContext

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
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}
