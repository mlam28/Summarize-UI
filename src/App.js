import logo from './logo.svg';
import './App.css';
import { Container } from '@mui/material';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className="App">
      {/* headers */}

      <Grid container spacing={2} style={{ height: "8rem"}}>
        <Grid item xs={5}>
          <Container  className='container header'>Input</Container>
          <Divider orientation="horizontal" style={{paddingTop: "25px"}}></Divider>
        </Grid>
        <Grid item xs={1}>
          <Divider orientation='vertical'></Divider>
        </Grid>
        <Grid item xs={5}>
            <Container className='container header'>Output</Container>
            <Divider orientation="horizontal" style={{paddingTop: "25px"}}></Divider>
        </Grid>
      </Grid>

      {/* end headers */}
      <Grid container spacing={2} style={{ height: "50rem"}}>
        <Grid item xs={5}>
          <Container id='input-container' className='container'>
            <UploadForm/>
          </Container>
        </Grid>
        <Grid item xs={1}>
          <Divider orientation='vertical'></Divider>
        </Grid>
        
        <Grid item xs={5}>
            <Container id='output-container' className='container' style={{ height: "50%", width:"100%", backgroundColor:"#e5e5e5"}}>Hello</Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
