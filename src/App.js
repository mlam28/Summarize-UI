import React, { useState } from 'react';
import './App.css';
import {
    TextField,
    Button,
    Grid,
    Paper,
    Divider,
    Tabs,
    Tab,
    Box,
    CircularProgress,
    Backdrop, Checkbox, FormControlLabel, FormGroup
} from '@mui/material';
import UploadForm from './components/UploadForm';
import axios from "axios";
import logo from './assets/logo.png';
import {Image} from "@mui/icons-material";

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
    const [isFollowUpQuestion, setIsFollowUpQuestion] = useState(false);
    const [originalText, setOriginalText] = useState('');

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
            let file;
            if (isFollowUpQuestion) {
                file = new Blob([originalText], {type: 'text/plain'})
                formData.append("followUpQuestion", inputText);
            }
            else {
                file = new Blob([inputText], {type: 'text/plain'})
                setOriginalText(inputText);
            }
            formData.append("file", file, 'plaintext.txt');
            formData.append("isFollowUpQuestion", isFollowUpQuestion);
            const response = await axios.post('https://llamasummarizer.onrender.com/summarize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false,
                timeout: 100000000,
            });
            handleOutput(response.data);
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            handleOutput(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    const onCancel = () => {
        setInputText('');
    };


    return (
        <div className="App bg-[#f4f4f4] min-h-screen" >
            <Backdrop open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <header className="justify-center items-center flex my-8">
                <img style={{width: '50%'}} src={require('./assets/logo.png')}/>
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
                            <FormGroup>
                                <FormControlLabel label="Is this a follow up question?"
                                                  control={<Checkbox value={isFollowUpQuestion}
                                                  onChange={() => setIsFollowUpQuestion(!isFollowUpQuestion)}/>
                                }/>
                            </FormGroup>
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
