// 아 일단 json 파일로 저장해
// 그리고 수치 같은 것들 넣어
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import data from '../db.json';

const SensorData = () => {
    const [lastEntryData, setLastEntryData] = useState({});

    useEffect(() => {
        if (data.length > 0) {
            const lastEntry = data[data.length - 1];
            setLastEntryData(lastEntry);
        }
    }, []);

    return (
        <SensorContainer>
            <SensorBox>
                {lastEntryData && lastEntryData.turbidity ? (
                    <SensorInfo>
                        <InfoText><strong>Turbidity: </strong> {lastEntryData.turbidity.toFixed(2)}&nbsp;NTU</InfoText>
                        <InfoText><strong>pH: </strong>{lastEntryData.pH.toFixed(2)}</InfoText>
                        <InfoText><strong>Temperature: </strong>{lastEntryData.water_temp.toFixed(2)}&nbsp;℃</InfoText>
                        <InfoText><strong>Conductivity: </strong>{lastEntryData.electric.toFixed(2)}&nbsp;mS/cm</InfoText>
                        <InfoText><strong>Alkalinity: </strong>{lastEntryData.alkali.toFixed(2)}&nbsp;mg/L</InfoText>
                    </SensorInfo>
                ) : (
                    console.log("No data available.")
                )}
            </SensorBox>
        </SensorContainer>
    );
};

export default SensorData;

const SensorContainer = styled.div` 
    text-align: left;
`;

const SensorBox  = styled.div`
    width: 400px; 
    height: 350px; 
    margin-top: 50px;
    background: white; 
    border-radius: 20px; 
    border: 3px #F9B20A solid; 
    display: flex;
    align-items: center; 
`;

const SensorInfo  = styled.div`
    padding-left: 30px;
`;

const InfoText = styled.p`
    font-size : 27px;
`;