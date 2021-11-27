import React from 'react';
import styled from 'styled-components/macro';
import useMenuList from '../Menu/useMenuList';
import MenuList from '../Menu/MenuList';
import { Scrollbars } from 'react-custom-scrollbars';
const Aside = () => {
  const { menu, explores, namePage } = useMenuList();
  return (
    <Wrapper>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeightMin={0}
        autoHeightMax={200}
      >
        <h4>{namePage}</h4>
        <MenuList aside={true} title="Menu" list={menu} />
        <MenuList aside={true} title="Explores" list={explores} />
      </Scrollbars>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

export default Aside;
