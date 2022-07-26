import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './FormContainer.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    const contactNew = {
      id: nanoid(),
      name,
      number,
    };

    const checkNewContact = contacts.some(
      ({ name }) => name === contactNew.name
    );

    !checkNewContact
      ? setContacts([contactNew, ...contacts])
      : toast.error(`${contactNew.name} is already in your list`);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <>
      <div className={css.formContainer}>
        <h1 className={css.titleCard}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2 className={css.titleCard}>Contacts</h2>
        <Filter onChange={changeFilter} value={filter} contacts={contacts} />

        <ContactList
          contacts={getFilteredContacts()}
          onButtonDelete={deleteContact}
        />
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
}
