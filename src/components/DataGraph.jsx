import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import Modal from 'react-modal';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

Modal.setAppElement('#root');

const DataGraph = ({ dataGraph }) => {
    const [graphsData, setGraphsData] = useState([]);
    const variables = [
        'Turbidity', 'pH', 'Water_Temperature', 'Electrical_Conductivity', 'Alkalinity', 'Raw_Water_Inflow', 'PACS_Rate'
    ];
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'];

    useEffect(() => {
        const newDataGraphs = variables.map((variable, index) => {
            const labels = dataGraph.map(entry => entry[0].slice(-5));
            const values = dataGraph.map(entry => entry[index + 1]);
            return {
                variable,
                data: {
                    labels,
                    datasets: [
                        {
                            label: variable,
                            data: values,
                            borderColor: colors[index % colors.length],
                            backgroundColor: 'rgba(0,0,0,0)',
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { mode: 'index', intersect: false },
                    },
                    scales: {
                        x: { display: true, title: { display: true, text: 'Time' } },
                        y: { display: true, title: { display: true, text: variable } },
                    },
                },
            };
        });
        setGraphsData(newDataGraphs);
    }, [dataGraph]);

    return (
        <GraphContainer>
            <GraphRow>
                {graphsData.map(graph => (
                    <GraphBox key={graph.variable}>
                        <GraphText>{graph.variable}'s Flow Graph</GraphText>
                        <Line data={graph.data} options={graph.options} />
                    </GraphBox>
                ))}
            </GraphRow>
        </GraphContainer>
    );
};

export default DataGraph;

const GraphContainer = styled.div`
    width: 100%;
    margin-top: 15px;
    height: 350px;  
    overflow-y: auto;  
    background: white;
    border-radius: 10px;
    border: 2px solid #6AC0FF;
`;

const GraphRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    height: auto;
`;

const GraphBox = styled.div`
    flex: 0 0 calc(200px; - 20px); 
    height: 260px; 
    margin-left: 20px;
    width: 400px;
    margin-bottom: 50px; 
`;

const GraphText = styled.p`
    font-size: 20px;
    font-weight: bold;
    background: #FBF4F4;
    padding: 5px;
    border-radius: 10px;
`;
