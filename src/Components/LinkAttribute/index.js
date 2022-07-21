import React, { useEffect, useState } from 'react';
import { Paper, Box, Button, Typography, TextField, FormControlLabel, Checkbox   } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Select from 'react-select';
import { useDispatch ,useSelector} from 'react-redux';
import {addcategory} from '../../redux/action/Action'
import {allCategories ,allGroup} from '../../redux/action/Action'
import {  useNavigate } from 'react-router-dom';




// const getAllCategory = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ] 


const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '800px',
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

const LinkAttribute = (props) => {

  const classes = useStyle(props)

  const Navigate = useNavigate();

  const getAllCategory = useSelector((state)=>state.allCategoryReducer.categoryData)
  const getAllgroup   = useSelector((state)=>state.allGroupReducer.allData)
  const dispatch = useDispatch()
  const options = []
  getAllCategory.map((items)=>
   options.push({ value: items.id, label: items.cat_name })
  )
  
  const [checklist, setChecklist]=useState([]);

  const [student, setStudent] = useState({
    categoryname : '',
    parent       : 2,
    checkbox     : "",
    status       : false,
    statusApi    : "0"
  })

  const handlerStatus = (e) => {
    if(student.status){
      setStudent((prev) => {
        return {
          ...prev,
          [e.target.name]: false,
          statusApi:"0",
        }
      })
    }else{
      setStudent((prev) => {
        return {
          ...prev,
          [e.target.name]: true,
          statusApi:"1",
        }
      })
    }
   
  }

  const checkedItem = (e) =>{
    //let { value } = e.target;
    //setChecklist(old => [...old,value] );
    let { value ,checked } = e.target
    if(checked){
      setChecklist(old => [...old,value] )
    }else{
    const index = checklist.indexOf(value);
    checklist.splice(index, 1);
    console.log('checklist is ',checklist) 
    }
  }

  const handleStudent = (e) => {
    setStudent((prev) => {
      const {name,value} = e.target
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const  handleChangeOpt=(selectedOption)=> {
      setStudent((prev) => {
        return {
          ...prev,
          parent: selectedOption.value
        }
      })
    
  }


  const handleCheckChange = (event) => {
    setStudent((prev)=>{
      return{
        ...prev,
        checkbox : event.target.checked
      }
    });
  };

  const handleAddCategory = () => {
    let k = checklist
    setStudent((prev)=>{
      return{
        ...prev,
        checkbox :  k
      }
    });
      dispatch(addcategory(student))
      .then(()=> Navigate('/categorytable')) 
     // .then(()=> Navigate('/linkgroup'))
    }

    if(getAllCategory.length==0){
      console.log("length",getAllCategory.length)
      dispatch(allCategories())
    }
    useEffect(()=>{
      dispatch(allGroup())
     },[dispatch])


    //console.log('category',student)
    console.log('check data')

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
              Link Attribute
            </Typography>

            <Select
              options={options}
              defaultValue={student.parent}
              onChange={handleChangeOpt}
            />
            <FormControl className={classes.radionBtns}>
           { getAllgroup.map((items,id)=>{
                  return(
                    <Box key={id}>
                      <FormControlLabel 
                        control= { 
                        <Checkbox 
                        name="checkbox" value={items.group_name} 
                        onChange={handleStudent} 
                        onClick={(e)=>checkedItem(e)}
                         />  
                       }
                       label={items.group_name}
                      />
                    </Box>
                  )  
             })
           }
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
                    Inactive
                  </Typography>
                )}
              </Box>
            </FormControl>
            <Button
              variant="contained"
              className={classes.stundentBtn}
              onClick={() => handleAddCategory()}
            >
              Add
            </Button>
          </Box>
        </Paper>
      </div>
    </Layout>
  );
}

export default LinkAttribute;