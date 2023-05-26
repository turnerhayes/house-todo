
import * as React from 'react';
import Button from '@mui/material/Button';

interface Props {
}

class App extends React.Component<Props> {
  render() {
    return (
      <>
        <h1>
          Hello {Math.floor(Math.random() * 1000)}
        </h1>
        <Button variant="contained">this is a material UI button</Button>
      </>
    );
  }
}

export default App;
