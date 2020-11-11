import React, { Fragment, useContext } from 'react'
import ContactContext from '../../contexts/contact/contactContext'
import ContactItem from './ContactItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const { contacts, filtered } = contactContext

  return (
    <Fragment>
      <TransitionGroup>
        {filtered ? (
          filtered.map(contact => (
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))
        ) : contacts ? (
          contacts.map(contact => (
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))
        ) : (
          <h3>Please Add contacts</h3>
        )}
      </TransitionGroup>
    </Fragment>
  )
}
export default Contacts
