import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Box, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const DropArea = styled(Box)(({ theme }) => ({
    border: `2px dashed ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    cursor: 'pointer',
}));

const UploadForm = ({ handleOutput, toggleLoading }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const onFileChange = (event) => {
        console.log('on file change');
        setSelectedFile(event.target.files[0]);
    };

    const onDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setSelectedFile(event.dataTransfer.files[0]);
        }
    };

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const onFileCancel = (event) => {
        setSelectedFile(undefined);
    }

    const onFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        try {
            toggleLoading(true);
            const response = await axios.post('https://llamasummarizer.onrender.com/summarize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false,
                timeout: 1000000,
            });
            handleOutput(response.data);
            toggleLoading(false);
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            handleOutput(error.message);
        } finally {
            toggleLoading(false);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <DropArea
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={handleClick}
                className={`p-4 ${isDragging ? 'bg-blue-50' : ''}`}
            >
                <CloudUpload fontSize="large" />
                <Typography variant="h6">
                    {selectedFile ? selectedFile.name : "Drag and drop a file here, or click to select a file"}
                </Typography>
                <VisuallyHiddenInput
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileChange}
                />
            </DropArea>
            <div className="mt-4 flex justify-between">
                <Button variant="contained" color="primary" onClick={onFileUpload} >Run</Button>
                <Button variant="outlined" color="secondary" onClick={onFileCancel}>Reset</Button>
            </div>
        </div>
    );
};

export default UploadForm;
