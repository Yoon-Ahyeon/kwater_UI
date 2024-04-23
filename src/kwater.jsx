import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../src/components/Header';
import Info from '../src/components/Info';
import SensorData from '../src/components/SensorData';
import PacsType from '../src/components/PacsType';
import PacsAmount from '../src/components/PacsAmount';
import FutureTurbidity from '../src/components/FutureTurbidity';
import DataGraph from '../src/components/DataGraph';

const Kwater = () => {
    useEffect(() => {
        // Any initial setup can go here if needed
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