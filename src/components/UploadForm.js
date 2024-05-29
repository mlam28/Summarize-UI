import React from 'react';
import { styled } from '@mui/material/styles'; 
import { Button } from '@mui/material';
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

class Uploadform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        }
    }

    onFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
        });
    }

    onFileUpload = () => {
        const formData = new FormData();
        debugger;

        formData.append(
            "fileName",
            this.state.selectedFile,
            this.state.selectedFile.name,
            this.state.selectedFile.type,
        )

        axios.post 
    }

    render() {
        return (
            <div>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                taxIndex={-1}
                startIcon={<CloudUpload />}
            >
                Upload File
                <VisuallyHiddenInput onChange={this.onFileChange} type="file" />
            </Button>
                {this.state.selectedFile &&
                <div>
                    <div>
                        <p>File Name: {this.state.selectedFile.name} </p>
                        <p>File Type: {this.state.selectedFile.type}</p>
                    </div>
                    <div>
                        <Button onClick={this.onFileUpload}>
                            Summarize
                        </Button>
                    </div>
                </div>
                 }
            </div>
        )
    }
}

export default Uploadform;