import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
import { useEffect } from 'react';
import { fetchContact, deleteContact } from 'redux/contacts/operations';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  console.log('!!!!!CONTACTS', contacts);
  const filter = useSelector(state => state.filter);
  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  //useEffect(() => dispatch(fetchContact()), [dispatch]);

  const filteredContacts = (contacts, filter) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

  const finishFilterContacts = filteredContacts(contacts, filter);
  //console.log('ОТФИЛЬТРОВАННЫЕ КОНТАКТЫ', finishFilterContacts);
  return (
    <ul>
      {finishFilterContacts.map(({ id, name, number }) => (
        <li key={id}>
          <p>{name}</p>
          <p>{number}</p>
          <button type="button" onClick={() => onDeleteContact(id)}>
            delete contact
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.prototype = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
export default ContactList;
// const mapDispatchToProps = dispatch => ({
//   fetchContactsBD: () => dispatch(fetchContact),
// });

// export default connect(null, mapDispatchToProps)(ContactList);
