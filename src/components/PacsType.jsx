import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const PacsType = ({dataCluster, dataPacs}) => {
    // console.log("**ClusterData: ", dataCluster)

    const turbidityLevels = [
        { label: 'Low Turbidity'},
        { label: 'High Turbidity'},
        { label: 'Low Turbidity'},
        { label: 'Moderate Turbidity'}
    ];

    const activeTurbidity = turbidityLevels[dataCluster]; 

    return (
        <PacsBox>
            <Title>Turbidity Mode:</Title>
            <ClassContainer>
                <TurbBox>
                    <Text>{activeTurbidity.label}</Text>
                </TurbBox>
            </ClassContainer>
            <PacsContainer>
                <Title>PACS Rate:</Title>
                <Amount>
                    <Text>{dataPacs}</Text> 
                </Amount>
            </PacsContainer>
        </PacsBox>
    );
};

export default PacsType;


const PacsBox = styled.div`
    width: 100%;
    max-width: 280px; 
    height: 250px;
    margin-top: 30px;
    margin-left: 30px;
    background: white;
    border-radius: 10px;
    border: 2px solid #FD9F28;
    padding: 0 20px;
`;

const ClassContainer  = styled.div`
    width: 100%; 
`;

const Title = styled.h1`
    font-size: 23px;
    margin-bottom: 10px; 
    padding-left: 10px;
    text-align: left;
    padding-top: 5px;
`;

const TurbBox = styled.div`
    width: 90%;
    height: 50px;
    margin: 0 15px;
    background: #FEEBB6;
    border-radius: 10px;
    border: 3px #F1C962 dotted; 
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.p`
    font-size: 25px;
    font-weight: bold;
`;

const PacsContainer = styled.div`
    margin-top: 20px;
`;

const Amount = styled.div`
    width: 90%;
    height: 50px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 10px;
    border: 3px #FECCBE dotted; 
    background: #FFDBD1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

