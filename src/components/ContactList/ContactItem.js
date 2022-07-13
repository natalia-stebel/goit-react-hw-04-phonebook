import PropTypes from 'prop-types';
import css from "./ContactList.module.css"


 const ContactItem = ({ name, number, onButtonDelete }) => {
  return (
    <li className={css.contactItem}>
     {name} : {number}
    
      <button
      className={css.deleteBtn}
        name="button"
        type="button"
        onClick={onButtonDelete}
      >
        Delete
      </button>
      
    </li>
  );
};
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onButtonDelete: PropTypes.func,
};

export { ContactItem };