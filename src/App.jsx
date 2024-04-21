import { useState } from 'react';
import styled from 'styled-components';
import Kwater from "../src/kwater";  // 대문자로 시작해야 하며 경로도 확인 필요
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Kwater />  
    </Container>
  );
}

export default App;

const Container = styled.div`
`;


