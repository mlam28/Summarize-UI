import React, { useState } from 'react';
import './App.css';
import { Container, TextField, Button, Grid, Paper, Divider, Tabs, Tab, Box } from '@mui/material';
import UploadForm from './components/UploadForm';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function App() {
    const [output, setOutput] = useState("Here will be your output...");
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const handleOutput = (value) => {
        setOutput(value);
    };


    return (
        <div className="App">
            <header className="text-center my-8">
                <h1 className="text-4xl font-bold">One Summary</h1>
            </header>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className="p-4">
                        <h2 className="text-xl font-bold mb-4">Input</h2>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="input tabs">
                            <Tab label="Text Input" />
                            <Tab label="File Upload" />
                        </Tabs>
                        <TabPanel value={tabIndex} index={0}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Prompt"
                                multiline
                                rows={10}
                                fullWidth
                                variant="outlined"
                            />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1}>
                            <UploadForm
                                handleOutput={handleOutput}
                            />
                        </TabPanel>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className="p-4">
                        <h2 className="text-xl font-bold mb-4">Output</h2>
                        <Divider className="my-4"/>
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
