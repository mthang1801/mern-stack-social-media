import styled from 'styled-components';

export const HashtagLink = styled.a`
  color: #575f67;
  cursor: pointer;
  display: inline-block;
  background: #e6f3ff;
  padding-left: 2px;
  padding-right: 2px;
  border-radius: 2px;
  text-decoration: none;
`;

export const LinkAnchor = styled.a`
  color: var(--blue-1);
  &:hover {
    color: var(--blue-3);
  }
`;
