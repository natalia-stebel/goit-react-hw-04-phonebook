import { Component } from 'react';
import ContactForm from './ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from "./FormContainer.module.css"

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    console.log(data);
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    const findContact = this.state.contacts.find(
      contact => contact.name === data.name
    );
    const alertMessage = `${contact.name} is already in contacts`;

    if (findContact) {
      alert(alertMessage);
    } else {
      this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
      <div className={css.formContainer}>
        <h1 className={css.titleCard}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={css.titleCard}>Contacts</h2>
        <Filter
          onChange={this.changeFilter}
          value={filter}
          contacts={contacts}
        />

        <ContactList
          contacts={filteredContacts}
          onButtonDelete={this.deleteContact}
        />
        </div>
      </>
    );
  }
}
