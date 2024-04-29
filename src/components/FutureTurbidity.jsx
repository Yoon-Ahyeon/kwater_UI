import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import data from '../db.json';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const FutureTurbidity = () => {
    const [lastEntryData, setLastEntryData] = useState({});
    const [futureOne, setFutureOne] = useState(null);
    const [futureTwo, setFutureTwo] = useState(null);
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [isThresholdModalOpen, setIsThresholdModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [turbidityThreshold, setTurbidityThreshold] = useState(50);
    const [pendingThreshold, setPendingThreshold] = useState(50); // Temporary threshold before confirmation

    useEffect(() => {
        if (data.length > 0) {
            const lastEntry = data[data.length - 1];
            setLastEntryData(lastEntry);
            setFutureOne(lastEntry.future_turb_one);
            setFutureTwo(lastEntry.future_turb_two);
        }
    }, []);

    useEffect(() => {
        let content = [];
        if (futureOne !== null && futureOne > turbidityThreshold) {
            content.push({ time: '1 hour', value: futureOne });
        }
        if (futureTwo !== null && futureTwo > turbidityThreshold) {
            content.push({ time: '2 hours', value: futureTwo });
        }
        if (content.length > 0) {
            setModalContent(content);
            setIsAlertModalOpen(true);
        }
    }, [futureOne, futureTwo, turbidityThreshold]);

    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
    };

    const openThresholdModal = () => {
        setIsThresholdModalOpen(true);
    };

    const closeThresholdModal = () => {
        setIsThresholdModalOpen(false);
    };

    const applyThreshold = () => {
        setTurbidityThreshold(pendingThreshold);
        closeThresholdModal();
    };

    return (
        <FutureContainer>
            <Modal
                isOpen={isAlertModalOpen}
                onRequestClose={closeAlertModal}
                contentLabel="High Turbidity Alert"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        bottom: 'auto',
                        right: 'auto',
                        width: '600px',
                        height: '400px',
                        marginRight: '-50%',
                        textAlign: 'center',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <ModalText>⛔ High Turbidity Alert</ModalText>
                <Modaldiv>
                    {modalContent.map((item, index) => (
                        <ModalInfo key={index}>Turbidity After {item.time}: {item.value.toFixed(2)}, which exceeds the standard.</ModalInfo>
                    ))}
                </Modaldiv>
                <ModalButton onClick={closeAlertModal}>Close</ModalButton>
            </Modal>

            <Modal
                isOpen={isThresholdModalOpen}
                onRequestClose={closeThresholdModal}
                contentLabel="Set High Turbidity Threshold"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        bottom: 'auto',
                        right: 'auto',
                        width: '600px',
                        height: '400px',
                        marginRight: '-50%',
                        textAlign: 'center',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <ModalText>Set High Turbidity Threshold</ModalText>
                <p>You can set a High Turbidity Threshold.</p>
                <p>We'll provide turbidity alerts based on the threshold you set.</p>
                <div style={{ display: 'block', margin: '20px 0' }}>
                    <ThresholdInput
                        type="number"
                        value={pendingThreshold}
                        onChange={e => setPendingThreshold(Number(e.target.value))}
                        placeholder="Set Threshold"
                    />
                </div>
                <div style={{ display: 'block', margin: '20px 0' }}>
                    <ThresholdButton onClick={applyThreshold}>Apply</ThresholdButton>
                </div>
            </Modal>

            <FutureBox>
                <FutureText>Turbidity After 1 hour:</FutureText>
                <FutureAmountOne highTurbidity1={futureOne !== null && futureOne > turbidityThreshold}>
                    <AmountText>{futureOne !== null ? futureOne.toFixed(2) : 'N/A'}</AmountText>
                </FutureAmountOne>
                <FutureText>Turbidity After 2 hours:</FutureText>
                <FutureAmountTwo highTurbidity2={futureTwo !== null && futureTwo > turbidityThreshold}>
                    <AmountText>{futureTwo !== null ? futureTwo.toFixed(2) : 'N/A'}</AmountText>
                </FutureAmountTwo>
            </FutureBox>
            <ThresholdDiv>
                <ThresholdText onClick={openThresholdModal}>
                    Set Threshold
                </ThresholdText>
            </ThresholdDiv>

        </FutureContainer>
    );
};

export default FutureTurbidity;

const FutureContainer = styled.div`
    text-align: left;
`;

const ModalText = styled.h2`
    font-size: 40px;
    margin: 30px;
`;

const Modaldiv = styled.div`
    padding: 15px;
`;

const ModalInfo = styled.p`
    font-size: 30px;
`;

const ModalButton = styled.button`
    margin-top: 20px;
    background-color: #4CAF50;
    border: 2px green solid;
    color: white;
    padding: 15px 32px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    border-radius: 8px;
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

const FutureAmountOne = styled.div`
    width: 90%;
    height: 70px;
    background: ${({ highTurbidity1 }) => (highTurbidity1 ? '#FF9999' : '#E6F5FF')};
    border-radius: 20px;
    border: 2px ${({ highTurbidity1 }) => (highTurbidity1 ? '#FF3333' : '#2A7FCD')} solid;
    margin: 20px;
    animation: ${({ highTurbidity1 }) => (highTurbidity1 ? blink : 'none')} 1s linear infinite;
`;

const FutureAmountTwo = styled.div`
    width: 90%;
    height: 70px;
    background: ${({ highTurbidity2 }) => (highTurbidity2 ? '#FF9999' : '#E6F5FF')};
    border-radius: 20px;
    border: 2px ${({ highTurbidity2 }) => (highTurbidity2 ? '#FF3333' : '#2A7FCD')} solid;
    margin: 20px;
    animation: ${({ highTurbidity2 }) => (highTurbidity2 ? blink : 'none')} 1s linear infinite;
`;

const AmountText = styled.p`
    text-align: center;
    font-size: 30px;
    margin-top: 20px;
`;

const ThresholdButton = styled.button`
    width: 150px;
    height: 40px;
    margin-top: 20px;
    font-size: 18px;
    background: #B8E6E1;
    border: 2px #2FA599 solid;
    border-radius: 10px;
`;

const ThresholdInput = styled.input`
    width: 200px;
    height: 60px;
    font-size: 30px;
    margin-top: 30px;
    text-align: center;
    border-radius: 10px;
    border: 3px solid;
`;

const ThresholdDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
`;


const ThresholdText = styled.p`
    text-align: center;
    font-size: 15px;
    background: white;
    border-radius: 10px;
    width: 80%;
    padding: 10px;

    &:hover {
        background: #F3F5FF;
        cursor: pointer;
    }
`;