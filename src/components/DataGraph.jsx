import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import data from '../db.json';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DataGraph = () => {
    const [lastTenEntries, setLastTenEntries] = useState([]);
    const [selectedVariable, setSelectedVariable] = useState('PACS투입률'); 
    const [graphData, setGraphData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        if (data.length > 10) {
            setLastTenEntries(data.slice(-10));
        } else {
            setLastTenEntries(data);
        }
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            title: { 
                display: true,
                text: `${selectedVariable}'s Graph`,  // 백틱 사용 예시
                position: 'top',
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'LogTime',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: `${selectedVariable}`,  // 백틱 사용하여 변수를 문자열로 변환
                },
            },
        },
    };
    

    useEffect(() => {
        const labels = lastTenEntries.map(entry => entry.logTime.slice(-5));
        const newGraphData = {
            labels,
            datasets: [
                {
                    data: lastTenEntries.map(entry => entry[selectedVariable] !== undefined ? entry[selectedVariable] : null),
                    borderColor: 'black', // 선의 색상을 검은색으로 변경
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 포인트의 배경색을 검은색으로 변경
                },
            ],
        };
        setGraphData(newGraphData);
    }, [lastTenEntries, selectedVariable]);

    const handleSelectChange = (event) => {
        setSelectedVariable(event.target.value);
    };

    return (
        <GraphContainer>
            <GraphBox>
                <GraphSelect onChange={handleSelectChange} value={selectedVariable}>
                    <GraphOption value="탁도">Turbidity</GraphOption>
                    <GraphOption value="pH">pH</GraphOption>
                    <GraphOption value="수온">Temperature</GraphOption>
                    <GraphOption value="전기전도도">Conductivity</GraphOption>
                    <GraphOption value="알칼리도">Alkalinity</GraphOption>
                    <GraphOption value="PACS투입률">PACS Rate</GraphOption>
                    <GraphOption value="원수유입유량">Water Amount</GraphOption>
                </GraphSelect>
                <Line data={graphData} options={options} />
            </GraphBox>
        </GraphContainer>
    );
};

const GraphContainer = styled.div`
    text-align: left;
    margin-left: 30px;
`;

const GraphBox = styled.div`
    width: 810px;
    height: 320px;
    margin-top: 50px;
    background: white;
    border-radius: 20px;
    border: 3px #6AC0FF solid;
    padding: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

const GraphSelect = styled.select`
    position: relative;
    width: 150px;
    height: 35px;
    border-radius: 4px;
    border: 2px solid;
    font-size: 13px;
`;

const GraphOption = styled.option`
    padding: 3px 0;
    font-size: 17px;
`;

export default DataGraph;
