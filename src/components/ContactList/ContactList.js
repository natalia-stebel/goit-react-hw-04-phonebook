import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactList/ContactItem';
import css from "./ContactList.module.css"


 const ContactList = ({contacts, onButtonDelete}) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactItem
            key={id}
            name={name}
            number={number}
            onButtonDelete={() => onButtonDelete(id)}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;