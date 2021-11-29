import React from 'react';
import ContactItem from './ContactItem';
const ContactList = ({ data }) => {
  return (
    <ul>
      {data.map((friend) => (
        <ContactItem key={friend._id} friend={friend} />
      ))}
    </ul>
  );
};

export default ContactList;
