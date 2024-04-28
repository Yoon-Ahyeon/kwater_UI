import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../src/components/Header';
import Info from '../src/components/Info';
import SensorData from '../src/components/SensorData';
import PacsType from '../src/components/PacsType';
import PacsAmount from '../src/components/PacsAmount';
import FutureTurbidity from '../src/components/FutureTurbidity';
import DataGraph from '../src/components/DataGraph';

import LogoImg from '../src/assets/character.png';

const Kwater = () => {
    useEffect(() => {
        // Function to update data
        const updateData = () => {
            console.log("Updating data..."); 
        };

        // Set interval to update data every minute
        const intervalId = setInterval(updateData, 60000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <Header />
            <ContentWrapper>
                <Info />
                <FirstBox style={{ display: 'flex' }}>
                    <SensorData />
                    <PacsType />
                    <PacsAmount />
                </FirstBox>
                <SecondBox style={{ display: 'flex' }}>
                    <FutureTurbidity />
                    <DataGraph />
                </SecondBox>
            </ContentWrapper>
            {/* <KwaterImg src={LogoImg} alt="Kwater Img" /> */}
        </div>
    );
};

export default Kwater;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const FirstBox = styled.div`
    display: flex;
`;

const SecondBox = styled.div`
    display: flex;
`;

// const KwaterImg = styled.img`
//     margin-left: auto; 
//     margin-bottom: 100px;
//     display: block; 
//     width: 100px;
//     height: 100px;
//     margin-top: 30px;
// `;
