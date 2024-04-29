import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const PacsType = ({dataCluster}) => {
    // console.log("**ClusterData: ", dataCluster)

    const getColor = (index) => {
        if (index === dataCluster) {
            return '#F1C962'; 
        }
        return '#FFFDF1'; 
    };

    return (
        <ClassContainer>
            <ClassBox>
                <TurbBox color={getColor(0)}>
                    <TurbText>Low Turbidity</TurbText>
                </TurbBox>
                <TurbBox color={getColor(1)}>
                    <TurbText>Moderate Turbidity</TurbText>
                </TurbBox>
                <TurbBox color={getColor(2)}>
                    <TurbText>High Turbidity</TurbText>
                </TurbBox>
            </ClassBox>
        </ClassContainer>
    );
};

export default PacsType;

const ClassContainer = styled.div`
    text-align: center;
    margin-left: 30px;
`;

const ClassBox = styled.div`
    width: 400px;
    height: 350px;
    margin-top: 50px;
    background: white;
    border-radius: 20px;
    border: 3px #F9B20A solid;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TurbBox = styled.div`
    width: 90%;
    height: 70px;
    margin: 15px;
    background: ${({ color }) => color};
    border-radius: 10px;
    border: 3px #F1C962 dotted; 
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TurbText = styled.p`
    font-size: 30px;
    font-weight: bold;
`;

