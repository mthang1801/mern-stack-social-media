import React, {lazy} from "react";
import Layout from "../containers/Layout";
import { GET_CURRENT_USER } from "../apollo/operations/queries/cache";
import { useQuery } from "@apollo/client";
import CardRequestAuth from "../components/Card/CardRequestAuth";
import { RequestAuthScreen, ChatsWrapper, SidebarNav, MainTab } from "./chats.styles";
import MenuChat from "../components/Chat/MenuChat";
import {Route, Switch} from "react-router-dom";
const ChatMessages = lazy(() => import("../components/Chat/Messages/Messages"))
const ChatContacts = lazy(() => import("../components/Chat/Contact/Contact"))

const ChatsPage = ({match}) => {
  
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });

  if (!user)
    return (
      <Layout>
        <RequestAuthScreen>
          <CardRequestAuth />
        </RequestAuthScreen>
      </Layout>
    );
  return <Layout>
    <ChatsWrapper>
      <SidebarNav>
        <MenuChat/>
      </SidebarNav>
      <MainTab>
        <Switch>
          <Route exact path={match.path} component={ChatMessages}/>
          <Route exact path={`${match.path}/contacts`} component={ChatContacts}/>
        </Switch>
      </MainTab>
    </ChatsWrapper>
  </Layout>;
};

export default ChatsPage;
