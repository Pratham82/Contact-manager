import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import axios from 'axios'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  }
  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Actions

  //Get Contacts from DB
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts')
      dispatch({ type: GET_CONTACTS, payload: res.data })
    } catch (e) {
      /* handle error */
      dispatch({
        type: CONTACT_ERROR,
        payload: e.response.message,
      })
    }
  }

  // Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post('/api/contacts', contact, config)
      dispatch({ type: ADD_CONTACT, payload: res.data })
    } catch (e) {
      /* handle error */
      dispatch({
        type: CONTACT_ERROR,
        payload: e.response.message,
      })
    }
  }

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`)
      dispatch({ type: DELETE_CONTACT, payload: id })
      console.log(id)
    } catch (e) {
      /* handle error */
      dispatch({
        type: CONTACT_ERROR,
        payload: e.response.message,
      })
    }
  }

  // Set Current Contact
  const setCurrent = contact =>
    dispatch({ type: SET_CURRENT, payload: contact })

  // Clear Current Contact
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT })

  //Clear Contacts from state
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS })

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      )
      dispatch({ type: UPDATE_CONTACT, payload: res.data })
    } catch (e) {
      /* handle error */
      dispatch({
        type: CONTACT_ERROR,
        payload: e.response.message,
      })
    }
  }

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
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
      }}
    >
      {props.children}{' '}
    </ContactContext.Provider>
  )
}

export default ContactState
