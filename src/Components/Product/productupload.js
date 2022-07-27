import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControlLabel, Paper, Box, Button, Typography, TextField ,Checkbox,Container} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import { useSelector } from 'react-redux';






// const getAllCategory = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ] 


const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',

    display: 'flex',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    justifyContent: 'center',
    zIndex: -99,
    '& .MuiPaper-root': {
      width: '35%',
      height: 'max-content',
      padding: `${theme.spacing(4)} 0`,
      [theme.breakpoints.down('lg')]: {
        width: '70%',
        padding: `${theme.spacing(2)} 0`,
      },
    },

  },

  inputs: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 99,
    marginTop:'30px',
    '& .MuiInputLabel-root': {
      fontSize: 15,
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      color: theme.palette.secondary.light,
    },
    '& .css-1nrlq1o-MuiFormControl-root': {
      width: '90%',
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: theme.spacing(2),
      fontSize: 15,
      fontWeight: 500,
    },
    '& .css-b62m3t-container':{
      width:'90%',
      marginBottom:15,
      border: theme.palette.secondary.light,
      '& .css-1s2u09g-control':{
        padding: `${theme.spacing(1)} 5px`,
    
      },
      '& .css-14el2xx-placeholder':{
        fontSize: 16,
        fontWeight: 500,
        },
        '& .css-1pahdxg-control':{
            outline:'none',
            padding: `${theme.spacing(1)} 5px`,
            // borderColor: 'hsl(0, 0%, 80%)',
            border: `2px solid ${theme.palette.secondary.main}`,
            boxShadow:'none'
        },
     

  
    },
    
    '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked':{
      color:theme.palette.primary.green,
      },
      '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track':{
        background:theme.palette.primary.green,
      },
      '& .makeStyles-inputs-20':{
        background:'red'
      },
    '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase':{
      color:'red'
    },
    '& .css-1yjjitx-MuiSwitch-track':{
      background:'red'
    }
 
 
  },
  statusDiv:{
    display:'flex',
    alignItems:'center',
  },
  active:{
    fontSize: '17px!important',
      fontWeight: '500!important',
      color:theme.palette.primary.green,
      marginBottom:2
  },
  inactive:{
    fontSize: '17px!important',
    fontWeight: '500!important',
      color:theme.palette.primary.red,
      marginBottom:2
  }
 


}))

const Uploadcsv = (props) => {

  const classes = useStyle(props);
  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll)
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("headers", {"Content-type": "multipart/form-data"});
     console.log('formData', formData)
    try {
      const res = await axios.post(
        "https://e934-2401-4900-1c2a-35f2-11e0-c126-456-b651.in.ngrok.io/uploadcsv",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Layout>
      <div className={classes.root} style={{  transform: toggleState ? 'translate(10%)' : 'translate(0%)', marginRight:toggleState && 100  ,transition: '.3s all', }}>
        <Container>
       
          <Box className={classes.inputs} >
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
              Upload Product
            </Typography>
            <Paper className='paper' elevation={0} sx={{border: '1px solid #262125!important',}}>
              <Box className='product_input_file'>
             <input type="file" onChange={saveFile} /> 

            <Button
              variant="contained"
              className={classes.stundentBtn}
               onClick={uploadFile}
            >
              Upload
            </Button>
            </Box>
            </Paper>
          </Box>
       
        </Container>
      </div>
    </Layout>
  );
};

export default Uploadcsv;
