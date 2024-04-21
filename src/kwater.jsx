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
            <Info />
            <SensorData />
            {/* <PacsType />  */}
            {/* <PacsAmount />  */}
            {/* <FutureTurbidity />  */}
            {/* <DataGraph />  */}
        </div>
    );
};

export default Kwater;

