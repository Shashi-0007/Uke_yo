import React, { useEffect, useState } from 'react';
import { Paper, Box, Button, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Select from 'react-select';
import { useDispatch ,useSelector} from 'react-redux';
import {addcategory , allCategories} from '../../redux/action/Action'




const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    color: 'red',
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

const EditAttribute = (props) => {

  const classes = useStyle(props);

  const getAllAttributes = useSelector(
    (state) => state.allFieldsReducer.allData
  );
  const editAttributes = useSelector(
    (state) => state.editfieldReducer.edit
  );

 
  console.log('category',getAllAttributes);
  
  

  const dispatch = useDispatch();
//   const options = [];
//   getAllAttributes.map((items) =>
//     options.push({ value: items.id, label: items.feild_type })
//   );

  const options = [
    { value: "String",    label: "String" },
    { value: "Integer",   label: "Integer" },
    { value: "Array",     label: "Array" },
    { value: "JSON",      label: "JSON" },
  ];


  //console.log('data',options);


  const [student, setStudent] = useState({
    feildname: "",
    feildtype: "",
    status: false,
    statusApi: "0",
  });

  useEffect(() => {
    setStudent({
        feildname : editAttributes.feild_name,
        feildtype : editAttributes.feild_type,
        status    : editAttributes.status === "0" ? false : true,
        statusApi : editAttributes.status,
    });
  }, [editAttributes]);

    
//     const  defaultValues= [{
//                 'label' : `${student.feildname}`,
//                 'value' : `${student.feildtype}`,
//  }]


 // console.log('datas',defaultValues[0]);


  const handlerStatus = (e) => {
    if (student.status) {
      setStudent((prev) => {
        return {
          ...prev,
          [e.target.name]: false,
          statusApi: 0,
        };
      });
    } else {
      setStudent((prev) => {
        return {
          ...prev,
          [e.target.name]: true,
          statusApi: 1,
        };
      });
    }
  };

  const handleStudent = (e) => {
    setStudent((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeOpt = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setStudent((prev) => {
      return {
        ...prev,
        feildtype: selectedOption.value,
      };
    });
  };
  const handleAddCategory = () => {
    dispatch(addcategory(student));
  };

  if (getAllAttributes.length == 0) {
    console.log("length", getAllAttributes.length);
    dispatch(allCategories());
  }

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
              Edit Attribute
            </Typography>
           {/* {student.parent_name} */}
            <TextField
              type="text"
              id="outlined-basic"
              label="Attribute Name"
              variant="outlined"
              sx={{ width: "90%", marginBottom: 2 }}
              name="feildname"
              value={student.feildname}
              onChange={handleStudent}
            />
            {/* <Select
              options={options}
            //   defaultValue={{
            //     label: `${student.parent_name}`,
            //     value: `${student.parent}`,
            //   }}
              defaultValue={defaultValues[0]}
            
              onChange={handleChangeOpt}
            /> */}
              <Select
              options={options}
            //   defaultValue={student.feildtype}
              onChange={handleChangeOpt}
            />
            <FormControl className={classes.radionBtns}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Status
              </FormLabel>
              <Box className={classes.statusDiv}>
                <Switch
                  checked={student.status}
                  name="status"
                  value={student.status}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={handlerStatus}
                />
                {student.status ? (
                  <Typography
                    variant="body1"
                    componenet="p"
                    className={classes.active}
                  >
                    active
                  </Typography>
                ) : (
                  <Typography variant="body1" className={classes.inactive}>
                    inactive
                  </Typography>
                )}
              </Box>
            </FormControl>
            <Button
              variant="contained"
              className={classes.stundentBtn}
              onClick={handleAddCategory}
            >
              Update
            </Button>
          </Box>
        </Paper>
      </div>
    </Layout>
  );
};

export default EditAttribute;