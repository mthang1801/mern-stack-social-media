import React from 'react'
import {HeadingCharacter, Wrapper} from "./styles/ListContacts.styles"
import ContactItem from "./ContactItem"
import {usePopupContactActions} from "./hook/usePopupActions"
const ListContacts = ({data}) => {
  const {setShowPopup} = usePopupContactActions()
  console.log(data)
  if(!data.length) return null;
  return (
   <Wrapper onScroll={() => setShowPopup(false)}>
     {data.map(friend => (
       <ContactItem key={`contact-${friend._id}`} friend={friend}/>
     ))}   
   </Wrapper>
  )
}

export default ListContacts
