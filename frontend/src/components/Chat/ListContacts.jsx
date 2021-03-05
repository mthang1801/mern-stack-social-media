import React from 'react'
import {HeadingCharacter} from "./styles/ListContacts.styles"
import ContactItem from "./ContactItem"
const ListContacts = ({data}) => {
 
  if(!Object.entries(data).length) return null;
  return (
   <div>
     {Object.keys(data).map(headingCharacter => (
       <div key={headingCharacter}>
         <HeadingCharacter>{headingCharacter}</HeadingCharacter>
         {data[headingCharacter].map(friend => (
           <ContactItem key={`contact-${friend._id}`} friend={friend}/>
         ))}
       </div>
     ))}
   </div>
  )
}

export default ListContacts
