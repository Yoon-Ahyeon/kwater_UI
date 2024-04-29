import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DataGraph = ({dataGraph}) => {
    // console.log("**GraphData: ", dataGraph)

    const variables = {
        Turbidity: 1,
        pH: 2,
        Water_Temperature: 3,
        Electrical_Conductivity: 4,
        Alkalinity: 5,
        PACS_Rate: 6, 
        Raw_Water_Inflow: 7
    };
    
    const [selectedVariable, setSelectedVariable] = useState("PACS_Rate"); 
    const [graphData, setGraphData] = useState({ labels: [], datasets: [] });

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
            title: { display: true, text: `${selectedVariable}'s Graph`, position: 'top' }
        },
        scales: {
            x: { display: true, title: { display: true, text: 'Time' } },
            y: { display: true, title: { display: true, text: selectedVariable } }
        },
    };
    
    useEffect(() => {
        if (dataGraph && dataGraph.length > 0) {
            const labels = dataGraph.map(entry => entry[0].slice(-5));
            const values = dataGraph.map(entry => entry[variables[selectedVariable]]);
            const newGraphData = {
                labels,
                datasets: [
                    { label: 'Data Series', data: values, borderColor: '#568A35', backgroundColor: 'rgba(75,192,192,0.2)' }
                ],
            };
            setGraphData(newGraphData);
        }
    }, [dataGraph, selectedVariable]);

    const handleSelectChange = (event) => {
        setSelectedVariable(event.target.value);
    };

    return (
        <GraphContainer>
            <GraphBox>
                <GraphSelect onChange={handleSelectChange} value={selectedVariable}>
                    <GraphOption value="Turbidity">Turbidity</GraphOption>
                    <GraphOption value="pH">pH</GraphOption>
                    <GraphOption value="Water_Temperature">Temperature</GraphOption>
                    <GraphOption value="Electrical_Conductivity">Conductivity</GraphOption>
                    <GraphOption value="Alkalinity">Alkalinity</GraphOption>
                    <GraphOption value="PACS_Rate">PACS Rate</GraphOption>  // 이 부분을 "PACS_Rate"로 변경했습니다.
                    <GraphOption value="Raw_Water_Inflow">Influent Flow</GraphOption>
                </GraphSelect>
                <Line data={graphData} options={options} />
            </GraphBox>
        </GraphContainer>
    );
};

export default DataGraph;

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
