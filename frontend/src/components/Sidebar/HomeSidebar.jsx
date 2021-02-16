import React from 'react'
import CardProfile from "./CardProfile";
import CardUtility from "./CardUtility"
import styled from "styled-components"
const HomeSidebar = ({user}) => {
  const SidebarWithUserAuth = (
    <div>
      <CardProfile user={user}/>
    </div>
  )

  const SidebarWithoutUserAuth = (
    <div>
      <CardUtility/>
    </div>
  )
  return (
    <div>
      {user ? SidebarWithUserAuth : SidebarWithoutUserAuth}
    </div>
  )
}

export default HomeSidebar
