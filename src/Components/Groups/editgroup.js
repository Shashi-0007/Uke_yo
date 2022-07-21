import React, { useEffect, useState } from 'react';
import { Paper, Box, Button, Typography, TextField,Container ,Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Select from 'react-select';
import { useDispatch ,useSelector} from 'react-redux';
import {  UpdateGroup,editGroup} from '../../redux/action/Action';
import '../../App.css'
import { useNavigate } from 'react-router-dom';





const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    justifyContent: 'center',
    zIndex: -99,
    "& .MuiPaper-root": {
      width: "100%",
      height: "max-content",
      padding: `${theme.spacing(4)} 0`,
      [theme.breakpoints.down("lg")]: {
        width: "70%",
        padding: `${theme.spacing(2)} 0`,
      },
    },

  },

  inputs: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
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

const EditGroup = (props) => {
  const [message, setMessage] = useState('') 
  const navigate = useNavigate() 
  // const getAllCategory   = useSelector((state)=>state.allGroupReducer.categoryData)
  const editGroups = useSelector((state)=>state.editGroupReducer.edit)
  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll)

  const [txt, setTxt] = useState('');

  const classes = useStyle(props);


  const dispatch = useDispatch();



  const [group, setGroup] = useState({
    id :"",
    groupname  : "",
    groupdisplayname  : "",
    statusApi  : "",
    status     : "",
  });

  //status     : false,
  useEffect(()=>{
    setGroup({
      id :editGroups.id,
      groupname  : editGroups.group_name,
      groupdisplayname  : editGroups.group_display_name,
      statusApi  : editGroups.status,
      status     : editGroups.status==="0" ? false : true,
    })
    // let a={value:editGroups.parent_cat,label: 'Furniture'}
    // handleChangeOpt(a)
},[editGroups])


  const handlerStatus = (e) => {
    if (group.status) {
      setGroup((prev) => {
        return {
          ...prev,
          [e.target.name]: false,
          statusApi: "0",
        };
      });
    } else {
      setGroup((prev) => {
        return {
          ...prev,
          [e.target.name]: true,
          statusApi: "1",
        };
      });
    }
  };
  const handleStudent = (e) => {
    const { name, value } = e.target;
    setGroup((prev) => {
      return {
        ...prev,
        [name]: value,
        
      };
    });

  };


  const onInputChange = (e) => {
    const { value } = e.target;
    const re = /^[A-Za-z]+$/;
    if (value === "" || re.test(value)) {
      setGroup((items)=>{
        return{
          ...items,
          groupname :value
        }
      });
       
    
    }
  }
  const handleAddGroup = () => {
    let editdata ={id: editGroups.id}
    dispatch(UpdateGroup(group))
    .then(() => dispatch(editGroup(editdata))).then(()=>setMessage(' Group Updated Successfully'))
  };
  
  let colon = "`[]";
  let regEx = `!@#$%^&*()_+1234567890-={}|:",./<>~;* ?'${colon}`;


const handleCancel = () =>{
   navigate('/grouptable')
}
 
  return (
    <Layout>
      <div className={classes.root}>
      <Container fixed>
        <Paper className='paper' elevation={0}   style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width:toggleState ? '80%' : '90%' ,transition: '.3s all', }}>
        {message !== '' ? 
        <Box className='hello'>
          <Stack sx={{ width: '100% !important', alignItems:'center'}} >
                  <Alert severity="success">{message}</Alert>
              </Stack>
          </Box>
          : null}
          <Box className={classes.inputs}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }} className='heading'>
              Edit Group
            </Typography>
          
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <TextField
              type="text"
              id="outlined-basic"
              label="Group Name"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 2 }}
              name="groupname"
              value={group.groupname}
              onChange={handleStudent}
              
            />
                </Grid>
                <Grid item xs={6}>
                <TextField
              type="text"
              id="outlined-basic"
              label="Display Group Name"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 2 }}
              name="groupdisplayname"
              value={group.groupdisplayname}
              onChange={handleStudent}
              // onKeyDown={(evt)=>
              //   regEx.includes(evt.key) && evt.preventDefault()
              // }
              
            />
                </Grid>
              </Grid>
            <FormControl className={classes.radionBtns}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Status
              </FormLabel>
              <Box className={classes.statusDiv}>
                <Switch
                  checked={group.status}
                  name="status"
                  value={group.statusApi}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={handlerStatus}
                />
                {group.status ? (
                  <Typography
                    variant="body1"
                    componenet="p"
                    className={classes.active}
                  >
                    active
                  </Typography>
                ) : (
                  <Typography variant="body1" className={classes.inactive}>
                    Inactive
                  </Typography>
                )}
              </Box>
            </FormControl>
            <Box className='btn_group'>
            <Button
              variant="contained"
              className='btn'
              onClick={handleAddGroup}
            >
              Update
            </Button>
            <Button
              variant="contained"
              className='btn_cancel'
              onClick={handleCancel}
            >
              cancel
            </Button>
            </Box>
          </Box>
        </Paper>
        </Container>
      </div>
    </Layout>
  );
};

export default EditGroup;