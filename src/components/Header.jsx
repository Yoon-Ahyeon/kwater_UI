import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import kwaterLogo from '../assets/kwater_logo.png';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  return (
    <HeaderContainer>
      <HeaderTable>
        <TitleData> <LogoImg src={kwaterLogo} alt="Earth Image" /> <TitleText>K-water Monitoring Platform</TitleText></TitleData>
        <DateData>Date: {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}</DateData>
      </HeaderTable>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: -20px;
    margin-left: 5px;
    
`;

const HeaderTable = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr; 
    width: 100%;
    text-align: center;
    border: 2px solid black;
    background: white;
`;

const LogoImg = styled.img`
    width: 130px;
`;

const TitleText =  styled.p`
    margin-left: 40px;
    font-size: 35px;
    font-weight: bold;
`;

const TitleData = styled.div`
    border-right: 2px solid black; 
    display: flex;
    align-items: center; 
    justify-content: center;
    height: 100%;
    font-size: 25px;
`;

const DateData = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    font-size: 20px;
    font-weight: bold;
`;

