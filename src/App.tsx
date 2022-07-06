import { useEffect, useState } from 'react';
// import { allToken } from './web3';
import { BasicTable } from "src/components/table"
import { Container } from '@mui/material';
import { getGraphData } from './web3/subgraph';

function App() {
  const [reserves, setReserves] = useState<object[]>([])

  useEffect(() => {
    // ==================================== FROM CONTRACT
    // allToken
    //   .then(val => setReserves(val.reservesData))
    //   .catch(err => console.log('contract:', err))
    // ===================================== FROM GRAPHQL
    getGraphData
      .then(val => setReserves(val.reserves))
      .catch(err => console.log('getGraph:', err))
  }, [])

  return (
    <section className="App">
      <Container maxWidth="lg">
        <BasicTable data={reserves} />
      </Container>
    </section>
  );
}

export default App;
