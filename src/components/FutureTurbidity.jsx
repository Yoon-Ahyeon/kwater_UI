import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const FutureTurbidity = ({dataTurbOne, dataTurbTwo}) => {
    console.log("**Future Turbidity First Data: ", dataTurbOne)
    console.log("**Future Turbidity Two Data: ", dataTurbTwo)

    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [isThresholdModalOpen, setIsThresholdModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    
    const [turbidityThreshold, setTurbidityThreshold] = useState(() => {
        return Number(localStorage.getItem('turbidityThreshold')) || 50;
    });

    const [pendingThreshold, setPendingThreshold] = useState(turbidityThreshold); 

    useEffect(() => {
        let content = [];
        if (dataTurbOne !== null && dataTurbOne > turbidityThreshold) {
            content.push({ time: '1 hour', value: dataTurbOne });
        }
        if (dataTurbTwo !== null && dataTurbTwo > turbidityThreshold) {
            content.push({ time: '2 hours', value: dataTurbTwo });
        }
        if (content.length > 0) {
            setModalContent(content);
            setIsAlertModalOpen(true);
        }
    }, [dataTurbOne, dataTurbTwo, turbidityThreshold]);

    useEffect(() => {
        localStorage.setItem('turbidityThreshold', turbidityThreshold);
        console.log("turbidityThreshold Update Success ! \nturbidityThreshold : ", turbidityThreshold)
    }, [turbidityThreshold]);

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
                        <ModalInfo key={index}>Turbidity After {item.time}: {item.value}, <br />which exceeds the standard.</ModalInfo>
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
                <FutureText>Turbidity After 1 hours:</FutureText>
                <FutureAmountOne $highturbidity1={(dataTurbOne !== null && dataTurbOne > turbidityThreshold).toString()}>
                    <AmountText>{dataTurbOne !== null ? dataTurbOne : 'N/A'}</AmountText>
                </FutureAmountOne>
                <FutureText2>Turbidity After 2 hours:</FutureText2>
                <FutureAmountTwo $highturbidity2={(dataTurbTwo !== null && dataTurbTwo > turbidityThreshold).toString()}>
                    <AmountText>{dataTurbTwo !== null ? dataTurbTwo : 'N/A'}</AmountText>
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
    padding: 10px;
`;

const ModalInfo = styled.p`
    font-size: 25px;
`;

const ModalButton = styled.button`
    margin-top: 20px;
    background-color: #4CAF50;
    border: 2px #AFD485 solid;
    color: white;
    padding: 15px 32px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    border-radius: 8px;
`;

const FutureBox = styled.div`
    width: 100%;
    max-width: 280px; 
    height: 250px;

    margin-top: 10px;
    margin-left: 30px;
    background: white;
    border-radius: 10px;
    border: 2px solid #6AC0FF;

    flex-direction: column; 
    padding: 0 20px;
`;

const FutureText = styled.h1`
    font-size: 23px;
    margin-bottom: 10px; 
    padding-left: 10px;
    text-align: left;
    padding-top: 5px;
`;

const FutureText2 = styled.h1`
    font-size: 23px;
    margin-bottom: 10px; 
    padding-left: 10px;
    text-align: left;
    margin-top: 20px;
    padding-top: 5px;
`;

const FutureAmountOne = styled.div`
    width: 90%;
    height: 50px;
    margin: 0 15px;

    border-radius: 10px;
    border: 3px #18A8F1 dotted; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    border: 3px ${({ $highturbidity1 }) => ($highturbidity1 === 'true' ? '#FF3333' : '#2A7FCD')} dotted;
    background: ${({ $highturbidity1 }) => ($highturbidity1 === 'true' ? '#FF9999' : '#E6F5FF')};
    animation: ${({ $highturbidity1 }) => ($highturbidity1 === 'true' ? blink : 'none')} 1s linear infinite;
`;

const FutureAmountTwo = styled.div`
    width: 90%;
    height: 50px;
    margin: 0 15px;

    border-radius: 10px;
    border: 3px #18A8F1 dotted; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    border: 3px ${({ $highturbidity2 }) => ($highturbidity2 === 'true' ? '#FF3333' : '#2A7FCD')} dotted;
    background: ${({ $highturbidity2 }) => ($highturbidity2 === 'true' ? '#FF9999' : '#E6F5FF')};
    animation: ${({ $highturbidity2 }) => ($highturbidity2 === 'true' ? blink : 'none')} 1s linear infinite;
`;

const AmountText = styled.p`
    font-size: 25px;
    font-weight: bold;
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
    margin-left: 40px;
    width: 300px;
    margin-top: -8px;
`;

const ThresholdText = styled.p`
    text-align: center;
    font-size: 15px;
    background: white;
    border-radius: 10px;
    width: 80%;
    padding: 10px;
    border: 1px solid #C2C2C2;

    &:hover {
        background: #F3F5FF;
        cursor: pointer;
    }
`;
