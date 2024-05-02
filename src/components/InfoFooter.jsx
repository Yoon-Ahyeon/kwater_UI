import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import earth from '../assets/earth.png';

const InfoFooter = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const targetDate = new Date("2029-12-31"); 

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const tick = () => {
        setCurrentTime(new Date());
    };

    const calculateTimeLeft = () => {
        const difference = +targetDate - +currentTime;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const timeLeft = calculateTimeLeft();

    return (
        <BoxContainer>
            <ClimateContainer>
                <EarthImg src={earth} alt="Earth Image" />
                <InfoText><strong>GLOBAL CLIMATE CRISIS TIME : </strong></InfoText>
                <ClimateText>{timeLeft.days} days {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</ClimateText>
            </ClimateContainer>
            <FooterInfo>
                <FooterContent>
                    © 2024 Company Kwater And BigLeader. All rights reserved.
                    <br />Members: Jongsik Jeon, Hyejoon Jeon, Ahyeon Yoon, SeungCheol Lee, Shinjeong Hwang
                </FooterContent>
                <FooterContent>
                    Contact Us: <a href="mailto:info@company.com">ayun24296@gmail.com</a>
                </FooterContent>
            </FooterInfo>
        </BoxContainer>
    );
};

export default InfoFooter;

const BoxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding: 25px;
    margin-bottom: -45px;
    background: #B8E9FF;
    margin-left: 10px;
`;

const ClimateContainer = styled.div`
    display: flex;
    align-items: center;
`;

const FooterInfo = styled.div`
    text-align: right;
`;

const FooterContent = styled.h3`
    font-size: 13px;
`;

const EarthImg = styled.img`
    width: 70px;
    height: auto;
    margin-bottom: 10px; 
    margin-right: 20px;
    margin-top: 10px;
`;

const InfoText = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
`;

const ClimateText = styled.div`
    font-size: 20px;
    margin-left: 20px;
    font-weight: bold;
    color: #FD6F22;
`;