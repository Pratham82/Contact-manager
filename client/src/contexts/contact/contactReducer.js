import React, { useReducer } from 'react'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from '../types'

const contactReducer = (state, action) => {
  switch (action.type) {
    // This will add the new object in the contact state
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      }

    // This method will filter the contacts array where the contact id is not same to the conatct where we clicked the delete button
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      }

    // When we click the edit button of the contact it  will change the current value in the object
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }

    // Here we will map over the state and if the id of the passed contact mathces with the ccontact in the state then we will return the newly passed ccontact object
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      }

    default:
      return state
  }
}

export default contactReducer
