import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction } from '../../redux/contactsSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { contacts } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handlerFormSubmits = e => {
    e.preventDefault();
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(name + ' is already in contacts')
      : dispatch(addContactAction({ name, number }));
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.currentTarget.value);
        break;
      case 'number':
        setNumber(event.currentTarget.value);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <form className={css.form} onSubmit={handlerFormSubmits}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            required
            value={number}
            onChange={handleChange}
          ></input>
        </label>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};
