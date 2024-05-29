import React from 'react';
import { styled } from '@mui/material/styles'; 
import { Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

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
            selecteeFile: event.target.files[0],
        });
    }

    onFileUpload = () => {
        const formData = new FormData();

        formData.append(
            "fileName",
            this.state.selectedFile,
            this.state.selectedFile.name
        )
    }

    render() {
        return (
            <Button
                component="label"
                role={undefined}
                variant="contained"
                taxIndex={-1}
                startIcon={<CloudUpload />}
            >
                Upload File
                <VisuallyHiddenInput type="file" />
            </Button>
        )
    }
}

export default Uploadform;