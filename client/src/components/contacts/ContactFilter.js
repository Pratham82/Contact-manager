import React, { useContext, useEffect, useRef } from 'react'
import ContactContext from '../../contexts/contact/contactContext'

const ContactFilter = () => {
  const contactContext = useContext(ContactContext)
  const { filterContacts, clearFilter, filtered } = contactContext

  const text = useRef('')

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = e =>
    text.current.value !== '' ? filterContacts(e.target.value) : clearFilter()

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  )
}
export default ContactFilter
