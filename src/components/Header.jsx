import React from 'react';
import styled from 'styled-components';
import KwaterLogo from '../assets/kwater_logo.png';

const Header = () => (
    <>
      <HeaderContainer>
        <img style={{ width: "200px", height: "100%" }} src={KwaterLogo} alt="K-water Logo" />
        <Title>K-water Monitoring Platform</Title>
      </HeaderContainer>
      <Line />
    </>
);

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%; 
`;

const Title = styled.div`
    color: black;
    font-size: 65px;
    font-weight: bold;
    word-wrap: break-word;
    margin-left: 30px; 
`;

const Line = styled.div`
    border: 4px rgba(186.43, 200.52, 206.55, 0.70) solid;
    margin-top: 30px; 
    width : 100%;
`;



