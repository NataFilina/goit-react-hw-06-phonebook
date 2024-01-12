import React from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactAction } from '../../redux/contactsSlice';

const ContactList = () => {
  const { contacts } = useSelector(state => state.contacts);
  const { filter } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const onDelete = id => {
    dispatch(deleteContactAction(id));
  };
  const filterContact = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
  const newContact = filterContact.map(({ id, name, number }) => {
    return (
      <li key={id} className={css.item}>
        <span className={css.itemName}>{name}:</span> {number}
        <button type="button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </li>
    );
  });
  return filterContact && <ul className={css.list}>{newContact}</ul>;
};

export default ContactList;
