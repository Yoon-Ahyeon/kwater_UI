import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SensorData = ({dataSensor}) => {
    // console.log("**SensorData: ", dataSensor)

    return (
        <SensorContainer>
            <SensorBox>
                <SensorInfo>
                    <InfoText><strong>Turbidity: </strong> {dataSensor[1].toFixed(2)}&nbsp;NTU</InfoText>
                    <InfoText><strong>pH: </strong>{dataSensor[2].toFixed(2)}</InfoText>
                    <InfoText><strong>Temperature: </strong>{dataSensor[3].toFixed(2)}&nbsp;℃</InfoText>
                    <InfoText><strong>Conductivity: </strong>{dataSensor[4].toFixed(2)}&nbsp;mS/cm</InfoText>
                    <InfoText><strong>Alkalinity: </strong>{dataSensor[5].toFixed(2)}&nbsp;mg/L</InfoText>
                </SensorInfo>
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