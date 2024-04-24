import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import data from '../db.json';

const FutureTurbidity = () => {
    const [lastEntryData, setLastEntryData] = useState({});
    const [futureOne, setFutureOne] = useState(null);
    const [futureTwo, setFutureTwo] = useState(null);

    useEffect(() => {
        if (data.length > 0) {
            const lastEntry = data[data.length - 1];
            setLastEntryData(lastEntry);
            if (lastEntry.예측탁도one !== undefined) {
                setFutureOne(lastEntry.예측탁도one);
            }
            if (lastEntry.예측탁도two !== undefined) {
                setFutureTwo(lastEntry.예측탁도two);
            }
        }
    }, []);

    return (
        <FutureContainer>
            <FutureBox>
                <FutureText>Turbidity After 1 hour:</FutureText>
                <FutureAmount>
                    {/* 숫자 유효성 검사 후 toFixed 적용 */}
                    <AmountText>{futureOne !== null ? futureOne.toFixed(2) : 'N/A'}</AmountText>
                </FutureAmount>
                <FutureText>Turbidity After 2 hours:</FutureText>
                <FutureAmount>
                    {/* 숫자 유효성 검사 후 toFixed 적용 */}
                    <AmountText>{futureTwo !== null ? futureTwo.toFixed(2) : 'N/A'}</AmountText>
                </FutureAmount>
            </FutureBox>
        </FutureContainer>
    );
};

export default FutureTurbidity;

const FutureContainer = styled.div`
    text-align: left;
`;

const FutureBox = styled.div`
    width: 400px;
    height: 350px;
    margin-top: 50px;
    background: white;
    border-radius: 20px;
    border: 3px #6AC0FF solid;
    flex-direction: column;
    display: flex;
    align-items: flex-start; 
    justify-content: center;
`;

const FutureText = styled.div`
    color: black;
    font-size: 27px;
    font-weight: 600;
    word-wrap: break-word;
    margin-top: 15px;
    text-align: left;
    padding-left: 25px;
`;

const FutureAmount = styled.div`
    width: 90%;
    height: 70px;
    background: #E6F5FF;
    border-radius: 20px;
    border: 2px #2A7FCD solid;
    margin: 20px;
`;

const AmountText = styled.p`
    text-align: center;
    font-size: 30px;
    margin-top: 20px;
`;
