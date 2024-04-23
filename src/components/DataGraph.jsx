import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import data from '../db.json';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DataGraph = () => {
    const [lastTenEntries, setLastTenEntries] = useState([]);
    const [selectedVariable, setSelectedVariable] = useState('탁도'); 
    const [graphData, setGraphData] = useState({ labels: [], datasets: [] }); 

    useEffect(() => {
        if (data.length > 10) {
            setLastTenEntries(data.slice(-10));
        } else {
            setLastTenEntries(data);
        }
    }, []);

    // options 객체를 여기에 정의합니다.
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
        },
        title: {
            display: true,
            text: `${selectedVariable}'s graph`
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
    };

    // 그래프 데이터 업데이트
    useEffect(() => {
        const labels = lastTenEntries.map(entry => entry.logTime.slice(-5));
        const newGraphData = {
            labels,
            datasets: [
                {
                    label: '', // 레이블을 빈 문자열로 설정
                    data: lastTenEntries.map(entry => {
                        return entry[selectedVariable] !== undefined ? entry[selectedVariable] : null;
                    }),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };        
        setGraphData(newGraphData);
    }, [lastTenEntries, selectedVariable]); // selectedVariable을 의존성 배열에 추가

    const handleSelectChange = (event) => {
        setSelectedVariable(event.target.value); // 선택된 변수 업데이트
    };

    return (
        <GraphContainer>
            <select onChange={handleSelectChange} value={selectedVariable}>
                <option value="탁도">Turbidity</option>
                <option value="pH">pH</option>
                <option value="수온">Temperature</option>
                <option value="전기전도도">Conductivity</option>
                <option value="알칼리도">Alkalinity</option>
                <option value="PACS투입률">Coagulation</option>
                <option value="원수유입유량">Water Amount</option>                </select>
            <GraphBox>
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
    width: 100%;
    height: 350px;
    margin-top: 50px;
    background: white;
    border-radius: 20px;
    border: 3px #6AC0FF solid;
    padding: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export default DataGraph;

