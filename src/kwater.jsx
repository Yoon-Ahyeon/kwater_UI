import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from '../src/components/Header';
import SensorData from '../src/components/SensorData';
import PacsType from '../src/components/PacsType';
import FutureTurbidity from '../src/components/FutureTurbidity';
import DataGraph from '../src/components/DataGraph';
import Footer from '../src/components/Footer';

import axios from 'axios';

const Kwater = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            const url = `http://127.0.0.1:5000/get_data?t=${new Date().getTime()}`;
            axios.get(url)
                .then(response => {
                    if (JSON.stringify(data) !== JSON.stringify(response.data)) {
                        setData(response.data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
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
                    <BoxContainer>
                        <FirstBox>
                            {data.length > 0 && <SensorData dataSensor={data[data.length - 1]} />}
                        </FirstBox>
                        <ThirdBox>
                            {data.length > 0 && <DataGraph dataGraph={data} />}
                        </ThirdBox>
                    </BoxContainer>
                    <BoxContainer>
                        <SecondBox>
                            {data.length > 0 && <PacsType dataCluster={data[data.length - 1][7]} dataPacs={data[data.length - 1][6]}/>
                            }
                        </SecondBox>
                        <FourthBox>
                            {data.length > 0 && <FutureTurbidity dataTurbOne={data[data.length - 1][9]} dataTurbTwo={data[data.length - 1][10]} />}
                        </FourthBox>
                    </BoxContainer>
                </ContentWrapper>
            <Footer />
        </div>
    );
}

export default Kwater;

const ContentWrapper = styled.div`
    display: flex;
`;

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const FirstBox = styled.div`
    width: 900px;
    margin-right: 30px;
`;

const SecondBox = styled.div`
    width: 300px;
`;

const ThirdBox = styled.div`
    max-width: 930px; 
    margin-top: 10px;
    margin-left: 5px;
`;

const FourthBox = styled.div`
    width: 300px;
`;
    
// const KwaterImg = styled.img`
//     margin-left: auto; 
//     margin-bottom: 100px;
//     display: block; 
//     width: 100px;
//     height: 100px;
//     margin-top: 30px;
// `;
