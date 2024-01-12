import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { addContactAction, deleteContactAction } from '../redux/contactsSlice';
import { filterAction } from '../redux/filterSlice';

export const App = () => {
  const { contacts } = useSelector(state => state.contacts);
  const { filter } = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handlerFormSubmits = ({ name, number }) => {
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(name + ' is already in contacts')
      : dispatch(addContactAction({ name, number }));
  };

  const changeFilter = event => {
    dispatch(filterAction(event.target.value));
  };
  const handlerDelete = idDelete => {
    dispatch(deleteContactAction(idDelete));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    JSON.parse(localStorage.getItem('contacts'));
  }, [contacts]);

  return (
    <>
      <h1 className="title">Phone book</h1>
      <ContactForm onSubmit={handlerFormSubmits} />
      {contacts.length ? <h2 className="title">Contacts</h2> : <></>}
      {contacts.length ? (
        <Filter value={filter} onChange={changeFilter} />
      ) : (
        <></>
      )}
      <ContactList onDelete={handlerDelete} />
    </>
  );
};
