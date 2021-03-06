import React from 'react'
import {HeadingCharacter, Wrapper} from "./styles/ListContacts.styles"
import ContactItem from "./ContactItem"
import {usePopupContactActions} from "./hook/usePopupActions"
const ListContacts = ({data}) => {
  const {setShowPopup} = usePopupContactActions()
  
  if(!Object.entries(data).length) return null;
  return (
   <Wrapper onScroll={() => setShowPopup(false)}>
     {Object.keys(data).map(headingCharacter => (
       <div key={headingCharacter}>
         <HeadingCharacter>{headingCharacter}</HeadingCharacter>
         {data[headingCharacter].map(friend => (
           <ContactItem key={`contact-${friend._id}`} friend={friend}/>
         ))}
       </div>
     ))}
   </Wrapper>
  )
}

export default ListContacts
