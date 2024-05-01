import React from 'react';
import styled from 'styled-components';

const SensorData = ({ dataSensor }) => {
    return (
        <SensorBox>
            <SensorTitle>Sensor And RainFall Data Values:</SensorTitle>
            <ContentContainer>
                <SensorContainer>
                    <SensorTable>
                        <thead>
                            <tr>
                                <SensorHeader>Turbidity</SensorHeader>
                                <SensorHeader>pH</SensorHeader>
                                <SensorHeader>Temperature</SensorHeader>
                                <SensorHeader>Conductivity</SensorHeader>
                                <SensorHeader>Alkalinity</SensorHeader>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <SensorValue>{dataSensor[1]} NTU</SensorValue>
                                <SensorValue>{dataSensor[2]}</SensorValue>
                                <SensorValue>{dataSensor[3]} ℃</SensorValue>
                                <SensorValue>{dataSensor[4]} mS/cm</SensorValue>
                                <SensorValue>{dataSensor[5]} mg/L</SensorValue>
                            </tr>
                        </tbody>
                    </SensorTable>
                </SensorContainer>
                <RainfallContainer>
                    <SensorTable>
                        <thead>
                            <tr>
                                <SensorHeader2>RainFall</SensorHeader2>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <SensorValue>{dataSensor[12]} mm/L</SensorValue>
                            </tr>
                        </tbody>
                    </SensorTable>
                </RainfallContainer>
            </ContentContainer>
        </SensorBox>
    );
};

export default SensorData;

const SensorBox = styled.div`
    width: 100%;
    max-width: 900px;
    margin-top: 30px;
    background: white;
    border-radius: 10px;
    border: 1px solid #FD9F28;
    padding: 0 20px;
`;

const ContentContainer = styled.div`
    display: flex;
    width: 100%;
    padding-bottom: 20px;
`;

const SensorContainer = styled.div`
    flex-grow: 1;
    width: 700px;
`;

const SensorTitle = styled.h1`
    font-size: 25px;
    color: #333;
    margin-bottom: 20px;
    text-align: left;
    padding-left: 10px;
`;

const RainfallContainer = styled.div`
    flex-grow: 0;
    width: 150px; 
    margin-left: 30px;  
`;

const SensorTable = styled.table`
    font-size: 17px;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
`;

const SensorHeader = styled.th`
    font-size: 16px;
    text-align: left;
    padding: 12px 15px;
    color: black;
    background-color: #FFF6DE;
    border: 1px solid #ddd;
    text-align: center;
`;

const SensorHeader2 = styled.th`
    text-align: left;
    font-size: 16px;
    padding: 12px 15px;
    color: black;
    background-color: #DEF5FF;
    border: 1px solid #ddd;
    text-align: center;
`;

const SensorValue = styled.td`
    text-align: left;
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
`;
