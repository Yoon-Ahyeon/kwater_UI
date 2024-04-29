import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://127.0.0.1:5000/get_data')
                .then(response => {
                    console.log("데이터 받기 성공:", response.data);
                    setData(response.data);
                    console.log("업데이트 성공"); 
                })
                .catch(error => {
                    console.error("데이터 받기 실패:", error);
                });
        };

        fetchData();

        const intervalId = setInterval(fetchData, 120000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <Header />
            <ContentWrapper>
                <Info />
                <FirstBox style={{ display: 'flex' }}>
                    {data.length > 0 && <SensorData dataSensor={data[data.length - 1]} />}
                    {data.length > 0 && <PacsType dataCluster={data[data.length - 1][7]} />}
                    {data.length > 0 && <PacsAmount dataPacs={data[data.length - 1][6]} />}
                </FirstBox>
                <SecondBox style={{ display: 'flex' }}>
                    {data.length > 0 && <FutureTurbidity dataTurbidity={data[data.length - 1]} />}
                    {data.length > 0 && <DataGraph dataGraph={data} />}
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
