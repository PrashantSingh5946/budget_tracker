import { Button, Container, Stack } from 'react-bootstrap';
import { BudgetContext } from './context/BudgetContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BudgetContext.Provider>
      <div className="App">
        <Container className='my-3'>
          <Stack direction="horizontal" gap={2}>
            <h1 className='me-auto'>Budget Tracker</h1>

            <Button variant='primary'>Add Budget</Button>
            <Button variant='outline-primary'>Add Budget</Button>

          </Stack>
        </Container>
      </div>
    </BudgetContext.Provider>
  );
}

export default App;
