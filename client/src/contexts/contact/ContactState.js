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
        type: 'Personal',
        name: 'Rob Stark',
        email: 'Rob@gmail.com',
        phone: '7841516554',
      },
      {
        type: 'professional',
        date: '2020-11-07T16:05:50.841Z',
        name: 'Joey Smith',
        email: 'joey@gmail.com',
        phone: '9892634021',
      },
      {
        type: 'personal',
        date: '2020-11-07T16:05:50.841Z',
        name: 'Drake Hector',
        email: 'drake@gmail.com',
        phone: '1234567890',
      },
      {
        type: 'personal',
        date: '2020-11-07T16:05:50.841Z',
        name: 'John Snow',
        email: 'john@gmail.com',
        phone: '1234567890',
      },
    ],
  }
  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Actions

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contact

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        conacts: state.conacts,
      }}
    >
      {props.children}{' '}
    </ContactContext.Provider>
  )
}

export default ContactState
