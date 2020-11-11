import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        type: 'personal',
        name: 'Rob Stark',
        email: 'Rob@gmail.com',
        phone: '7841516554',
      },
      {
        id: 2,
        type: 'professional',
        date: '2020-11-07T16:05:50.841Z',
        name: 'Joey Smith',
        email: 'joey@gmail.com',
        phone: '9892634021',
      },
      {
        id: 3,
        type: 'personal',
        date: '2020-11-07T16:05:50.841Z',
        name: 'Drake Hector',
        email: 'drake@gmail.com',
        phone: '1234567890',
      },
      {
        id: 4,
        type: 'professional',
        date: '2020-11-07T16:05:50.841Z',
        name: 'John Snow',
        email: 'john@gmail.com',
        phone: '1234567890',
      },
    ],
    current: null,
    filtered: null,
  }
  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Actions

  // Add Contact
  const addContact = contact => {
    contact.id = uuidv4()
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // Delete Contact
  const deleteContact = id => dispatch({ type: DELETE_CONTACT, payload: id })

  // Set Current Contact
  const setCurrent = contact =>
    dispatch({ type: SET_CURRENT, payload: contact })

  // Clear Current Contact
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT })

  // Update Contact
  const updateContact = contact =>
    dispatch({ type: UPDATE_CONTACT, payload: contact })

  // Filter Contact
  const filterContacts = text =>
    dispatch({ type: FILTER_CONTACT, payload: text })

  // Clear Filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER })

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}{' '}
    </ContactContext.Provider>
  )
}

export default ContactState
