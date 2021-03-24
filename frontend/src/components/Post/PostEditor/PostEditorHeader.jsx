import React, {useState, useEffect, useRef} from 'react'
import {Wrapper, Information, Controls, SelectStatus, DropdownStatus, StatusItem, ButtonZoom, Selected} from "./styles/PostEditorHeader.styles"
import {Link} from "react-router-dom"
import LazyLoad from "react-lazyload"
import useLanguage from "../../Global/useLanguage"
import {MdZoomOutMap} from "react-icons/md"
import {useThemeUI} from "theme-ui"
const PostEditorHeader = ({user, postStatus, setPostStatus}) => {
  const {i18n , lang} =useLanguage()
  const { listPostStatus} = i18n.store.data[lang].translation; 
  const {colorMode} = useThemeUI()
  const currentStatus = listPostStatus?.find(status => status.name.toLowerCase() === postStatus.toLowerCase()); 
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null)

  useEffect(()=>{
    function trackUserClickWithDropdown(e){      
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        return setOpenDropdown(false);
      }      
    }
    window.addEventListener("click", trackUserClickWithDropdown);
    return () => window.removeEventListener("click" , trackUserClickWithDropdown)
  },[dropdownRef])

  return (
    <Wrapper theme={colorMode}>
      <Information>
        <Link to={`/${user.slug}`}>
          <LazyLoad>
            <img src={user.avatar} alt={user.avatar}/>
          </LazyLoad>
        </Link>
        <div>
          <Link to={`${user.slug}`} style={{textTransform:"capitalize"}}>{user.name.toLowerCase()}</Link>
          <SelectStatus ref={dropdownRef}>
            <Selected theme={colorMode} style={{textTransform:"capitalize"}} status={currentStatus.name.toLowerCase()} onClick={() => setOpenDropdown(prevState => !prevState)}>
              <span>{currentStatus.icon()}</span>
              <span>{currentStatus.name}</span>
            </Selected>
            <DropdownStatus theme={colorMode}  open={openDropdown} >
              {listPostStatus && listPostStatus.filter(status => status.name.toLowerCase() !== postStatus.toLowerCase()).map(({name, icon}) => (
                <StatusItem theme={colorMode} key={name} status={name.toLowerCase()} onClick={() => setPostStatus(name.toUpperCase())}>
                  <span>{icon()}</span>
                  <span>{name}</span>
                </StatusItem>
              ))}
            </DropdownStatus>
          </SelectStatus>
        </div>
      </Information>
      <Controls>
        <ButtonZoom><MdZoomOutMap/></ButtonZoom>         
      </Controls>
    </Wrapper>
  )
}

export default PostEditorHeader