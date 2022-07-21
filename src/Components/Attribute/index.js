import React, { useEffect, useState } from 'react';
import { FormControlLabel, Paper, Box, Button, Typography, TextField ,Checkbox} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Select from 'react-select';
import { useDispatch ,useSelector} from 'react-redux';
import { addField ,allGroup } from '../../redux/action/Action';




// const getAllCategory = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ] 


const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    justifyContent: 'center',
    zIndex: -99,
    '& .MuiPaper-root': {
      width: '100%',
      marginLeft:'18%',
      marginTop: "10%",
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

const AddAttributes = (props) => {

  const classes = useStyle(props);

  const getAllgroup   = useSelector((state)=>state.allGroupReducer.allData)
  
  const dispatch = useDispatch();

  const [checklist, setChecklist]=useState([]);
  //   const options = []
  //   getAllCategory.map((items)=>
  //    options.push({ value: items.id, label: items.cat_name })
  //   )

  //console.log('groups',getAllgroup)

  const options = [
    { value: "String",     label: "String" },
    { value: "Integer",    label: "Integer" },
    { value: "Array",      label: "Array" },
    { value: "JSON",       label: "JSON" },
  ];

  const [attribute, setAttribute] = useState({
    feildname  : "",
    feildtype  : "",
    checkbox   : "",
    namespace  : "",
    status     : false,
    statusApi  : "0",
  });

  //console.log('attribute are', attribute)

  const handlerStatus = (e) => {
    if (attribute.status) {
      setAttribute((prev) => {
        return {
          ...prev,
          [e.target.name]: false,
          statusApi: "0",
        };
      });
    } else {
      setAttribute((prev) => {
        return {
          ...prev,
          [e.target.name]: true,
          statusApi: "1",
        };
      });
    }
  };

  const checkedItem = (e) =>{
    //let { value } = e.target;
    //setChecklist(old => [...old,value] );
    let { value ,checked } = e.target
    if(checked){
      setChecklist(old => [...old,value] )
    }else{
    const index = checklist.indexOf(value);
    checklist.splice(index, 1);
    console.log('checklist  is ',checklist) 
    }
  }


  const handleStudent = (e) => {
    setAttribute((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeOpt = (selectedOption) => {
    setAttribute((prev) => {
      return {
        ...prev,
        feildtype: selectedOption.value,
      };
    });
  };

  const handleCheckChange = (event) => {
    setAttribute((prev)=>{
      return{
        ...prev,
        checkbox : event.target.checked
      }
    });
  };

  const handleAddAttrbute = () => {
    let k = checklist
    setAttribute((prev)=>{
      return{
        ...prev,
        checkbox :  k
      }
      // console.log(purchase)
    });
    dispatch(addField(attribute));
  };

  useEffect(()=>{
    dispatch(allGroup())
   },[dispatch])

  //console.log('attribute',attribute)
  console.log('check data',checklist)

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Box className={classes.inputs}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
              Add Attribute
            </Typography>

            <TextField
              type="text"
              id="outlined-basic"
              label="Attribute Name"
              variant="outlined"
              sx={{ width: "90%", marginBottom: 2 }}
              name="feildname"
              value={attribute.feildname}
              onChange={handleStudent}
            />
                <TextField
              type="text"
              id="outlined-basic"
              label="Namespace and key"
              variant="outlined"
              sx={{ width: "90%", marginBottom: 2 }}
              name="namespace"
              value={attribute.namespace}
              onChange={handleStudent}
            />
            {/* <Select
              options={options}
              defaultValue={attribute.feildtype}
              onChange={handleChangeOpt}
            /> */}
            <FormControl className={classes.radionBtns}>
              {/* { getAllgroup.map((items,id)=>{
                  return(
                    <Box key={id}>
                 <FormControlLabel 
                control= { 
                <Checkbox 
                name="checkbox" value={items.group_name} 
                onChange={handleStudent} 
                onClick={(e)=>checkedItem(e)}/>  
                  }
                label={items.group_name}
                />
                    </Box>
                  )  
              })} */}
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Status
                </FormLabel>
                <Box className={classes.statusDiv}>
                  <Switch
                    checked={attribute.status}
                    name="status"
                    value={attribute.status}
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={handlerStatus}
                  />
                  {attribute.status ? (
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
            <Button
              variant="contained"
              className={classes.stundentBtn}
              onClick={handleAddAttrbute}
            >
              Add
            </Button>
          </Box>
        </Paper>
      </div>
    </Layout>
  );
};

export default AddAttributes;