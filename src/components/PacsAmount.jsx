import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PacsAmount = ({dataPacs}) => {
    // console.log("**PACSData: ", dataPacs)
    return (
        <PacsContainer>
            <PacsBox>
                <Title>PACS RATE</Title>
                <Amount>
                    <AmountText>{dataPacs.toFixed(2)}</AmountText> 
                </Amount>
            </PacsBox>
        </PacsContainer>
    );
};

export default PacsAmount;

const PacsContainer = styled.div`
    text-align: center;
    margin-left: 30px;
`;

const PacsBox = styled.div`
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

const Title = styled.div`
    font-size: 35px;
    font-weight: bold;
`;

const Amount = styled.div`
    border: 2px #FF6969 dotted;
    width: 90%; /* 내용의 가로 너비 조정 */
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-top: 30px;
    border-radius: 50px;
    padding-top: 25px;
    padding-bottom: 25px;
    background: #FFE3DB;
`;

const AmountText= styled.div`
    font-size: 50px;
`;
