import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #333;
  color: white;
  padding: 1rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy; 2023 Movie App</p>
    </FooterContainer>
  );
};

export default Footer;
