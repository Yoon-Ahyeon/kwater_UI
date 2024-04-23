import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import data from '../db.json';

const PacsAmount = () => {
    const [lastEntryData, setLastEntryData] = useState({});
    const [pacs, setPacs] = useState(null);

    useEffect(() => {
        if (data.length > 0) {
            const lastEntry = data[data.length - 1];
            setLastEntryData(lastEntry);
            if (lastEntry.PACS투입률 !== undefined) {
                setPacs(lastEntry.PACS투입률);
            }
        }
    }, [data]);

    return (
        <PacsContainer>
            <PacsBox>
                <Title>Coagulation Amount</Title>
                <Amount>
                    <AmountText>{pacs}</AmountText>
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
    border: 5px #FF6969 solid;
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
`;

const AmountText= styled.div`
    font-size: 50px;
`;
