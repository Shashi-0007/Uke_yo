import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Paper, TextField, Button } from '@mui/material';
// import { height, width } from '@mui/system';



const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    color: 'red',
    background: 'url(/assets/images/background.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiPaper-root': {
      width: '30%',
      height: 400,
      [theme.breakpoints.down('md')]:{
        width:'80%'
      }
    }
  },
  image: {
    width: 200,
    marginBottom: theme.spacing(5)
  },
  inputs: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiInputLabel-root': {
      fontSize: 15,
      fontWeight: 500,
    },
    '& .MuiButton-root':{
      color:theme.palette.secondary.light,
    
    } 
  },
 
}))
const Login = () => {
  const classes = useStyle()
  return (
    <div className={classes.root}>
      <Paper variant='outlined' className={classes.papar}>
        <Box className={classes.inputs}>
          <img src="/assets/images/logo.jpg" alt="logo" className={classes.image} />
          <TextField id="outlined-basic" label="User Name" variant="outlined" sx={{ width: '70%', marginBottom: 2 }} />
          <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ width: '70%', marginBottom: 2 }} />
          <Button variant="contained">Login</Button>
        </Box>
      </Paper>
    </div>
  )
}

export default Login