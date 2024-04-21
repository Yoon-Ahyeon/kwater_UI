import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import earth from '../assets/earth.png';
import time from '../assets/time.png';

const Info = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const targetDate = new Date("2029-12-31"); // 디데이 설정

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const tick = () => {
        setCurrentTime(new Date());
    };

    // 남은 시간 계산 함수
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
        <InfoBox>
            <TimeInfo>
                <EarthImg src={earth} alt="Earth Image" />
                <InfoText><strong>DATE:</strong>&nbsp;{currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}</InfoText>
            </TimeInfo>
            <ClimateInfo>
                <TimeImg src={time} alt="Time Image" />
                <InfoText><strong>Global Climate Crisis Time:</strong>&nbsp;{timeLeft.days} days {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</InfoText>
            </ClimateInfo>
        </InfoBox>
    );
};

export default Info;

const InfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 15px 0; // 위와 아래로만 20px의 패딩을 적용
    box-sizing: border-box;
    border: 3px black solid;
    border-radius: 10px;
    margin-top: 30px;
    background-color : white;
`;

const InfoText = styled.div`
    font-size: 25px;
    display: flex;
    align-items: center;
    margin-left: 20px;
`;

const EarthImg = styled.img`
    width: 70px; 
    height: auto; 
`;

const TimeImg = styled.img`
    width: 70px; 
    height: auto; 
`;

const TimeInfo = styled.div`
    display: flex;
    align-items: center;
`;

const ClimateInfo = styled.div`
    display: flex;
    align-items: center;
`;
