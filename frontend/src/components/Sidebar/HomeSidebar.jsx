import React from 'react';
import CardProfile from '../Card/CardProfile';
import CardUtility from '../Card/CardUtility';
const HomeSidebar = ({ user }) => {
  const SidebarWithUserAuth = (
    <div>
      <CardProfile user={user} />
    </div>
  );

  const SidebarWithoutUserAuth = (
    <div>
      <CardUtility />
    </div>
  );
  return <div>{user ? SidebarWithUserAuth : SidebarWithoutUserAuth}</div>;
};

export default React.memo(HomeSidebar);
