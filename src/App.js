import React, { useState } from 'react';
import './App.css';
import {
    Container,
    TextField,
    Button,
    Grid,
    Paper,
    Divider,
    Tabs,
    Tab,
    Box,
    CircularProgress,
    Backdrop
} from '@mui/material';
import UploadForm from './components/UploadForm';
import axios from "axios";

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
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const handleOutput = (value) => {
        setOutput(value);
    };

    const toggleLoading = (value) => {
        setIsLoading(value);
    };

    const onRun = async (value) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            const file = new Blob([inputText], {type: 'text/plain'})
            formData.append("file", file, 'plaintext.txt');
            const response = await axios.post('https://llamasummarizer.onrender.com/summarize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false,
                timeout: 1000000,
            });
            handleOutput(response.data);
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            alert("File upload failed!");
        }
        finally {
            setIsLoading(false);
        }
    };
    const onCancel = () => {
        setInputText('');
    };


    return (
        <div className="App">
            <Backdrop open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
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
                                value={inputText}
                                onChange={(event) => setInputText(event.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={onRun} >Run</Button>
                            <Button variant="outlined" color="secondary" onClick={onCancel}>Reset</Button>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1}>
                            <UploadForm
                                handleOutput={handleOutput}
                                toggleLoading={toggleLoading}
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
