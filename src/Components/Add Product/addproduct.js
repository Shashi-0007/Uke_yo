import React, { useState } from 'react'
import '../../index.css'
import { useDispatch, useSelector } from "react-redux";
import Layout from '../../Pages/Layout';
// import Select from "react-select";
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { Paper,  Box,  Button, Typography,  TextField,  FormControlLabel,  Checkbox,  Grid } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Autocomplete from '@mui/material/Autocomplete';


const useStyle = makeStyles((theme) => ({
    root: {
      width: "100%",
      // width: "auto",
      height: "auto",
      color: "red",
      display: "flex",
      alignItems: "center",
      background: theme.palette.secondary.light,
      justifyContent: "center",
      zIndex: -99,
      "& .MuiPaper-root": {
        width: "100%",
        // marginLeft:'23%',
        // paddingLeft:'1%',
        marginTop: "7%",
        height: "max-content",
        padding: `${theme.spacing(4)} 0`,
        [theme.breakpoints.down("lg")]: {
          width: "70%",
          padding: `${theme.spacing(2)} 0`,
        },
      },
    },
    item_grid :{
        //boxShadow : '-2px 2px 12px 1px rgba(10,9,10,0.49)',
         border : '1px solid rgb(223,223,223)',
         padding:'10px'
    },

    inputs: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99,
      "& .MuiInputLabel-root": {
        fontSize: 15,
        fontWeight: 500,
      },
      "& .MuiButton-root": {
        color: theme.palette.secondary.light,
      },
      "& .css-1nrlq1o-MuiFormControl-root": {
        width: "90%",
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: theme.spacing(2),
        fontSize: 15,
        fontWeight: 500,
      },
      "& .css-b62m3t-container": {
        width: "90%",
        marginBottom: 15,
        border: theme.palette.secondary.light,
        "& .css-1s2u09g-control": {
          padding: `${theme.spacing(1)} 5px`,
        },
        "& .css-14el2xx-placeholder": {
          fontSize: 16,
          fontWeight: 500,
        },
        "& .css-1pahdxg-control": {
          outline: "none",
          padding: `${theme.spacing(1)} 5px`,
          // borderColor: 'hsl(0, 0%, 80%)',
          border: `2px solid ${theme.palette.secondary.main}`,
          boxShadow: "none",
        },
      },
  
      "& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
        color: theme.palette.primary.green,
      },
      "& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
        {
          background: theme.palette.primary.green,
        },
      "& .makeStyles-inputs-20": {
        background: "red",
      },
      "& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase": {
        color: "red",
      },
      "& .css-1yjjitx-MuiSwitch-track": {
        background: "red",
      },
    },
    statusBox: {
      display: "flex",
      alignItems: "center",
    },
    active: {
      fontSize: "17px!important",
      fontWeight: "500!important",
      color: theme.palette.primary.green,
      marginBottom: 2,
    },
    inactive: {
      fontSize: "17px!important",
      fontWeight: "500!important",
      color: theme.palette.primary.red,
      marginBottom: 2,
    },
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


const AddProduct = (props) => {

    const [productAdd, setProductAdd] = useState({
        title : '',
        description : '',
        // editorState: EditorState.createEmpty(),
        product_status:'',
        price : '',
        compare_price:'',
        checkbox: false,
        sku :'',
        barcode:'',
        physical_product_checkbox : false,
        weight : '',
        unit:'',
        vendor:'',
        selectCheckbox:[],
        selectCheckbox2:[],

    })

  const [supplierList, setSupplierList]=useState([]);

  const fixedOptions = [];
  const [value, setValue] = useState(fixedOptions);

  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll)

  const theme = useTheme();

  const classes = useStyle(props);

 const StatusOptions = [
    { value: "1", label: "Active" },
    { value: "2", label: "Draft" },
  ];
  const CollectionsOptions = [
    { value: "1", label: "T-shirts" },
    { value: "2", label: "Pants" },
    { value: "3", label: "Shoes" },
  ];
  const UnitOptions = [
    { value: "1", label: "Kg" },
    { value: "2", label: "g" },
    { value: "3", label: "mg" },
  ];


  const handleChange = (event) => {
    let {name, value} = event.target
    // setProductAdd(
    //   // typeof value === 'string' ? value.split(',') : value
    //    value
    // );
    setProductAdd((pre)=>{
      return{
        ...pre,
        selectCheckbox : value
     // selectCheckbox : typeof value === 'string' ? value.split(',') : value
      }
    })
  };


  const handleChangeDescription = (event, editor) => {
    const data = editor.getData()
  // console.log( 'data is', {event, editor, data});

     setProductAdd((pre)=>{
      return{
        ...pre,
        description : data
      }
    })
        // setProductAdd((pre)=>{
    //   return{
    //     ...pre,
    //     description : data
    //   }
    // })
  }


  const handleChangeOpt = (e) => {
    let {value} = e.target
    setProductAdd((prev) => {
      return {
        ...prev,
        product_status: value,
      };
    });
  };

  const handleUnitChangeOpt = (e) => {
    let {value} = e.target
    // setAge(value)
    setProductAdd((prev) => {
      return {
        ...prev,
        unit: value,
      };
    });
  };



  const handleAddProduct  = (e) =>{
    let {name, value} = e.target
    setProductAdd((pre)=>{
      return{
        ...pre,
        [name] : value
      }
    })
  }
  const checkboxHandler = (value) =>{
    setProductAdd((prev) => {
      return {
        ...prev,
        checkbox: !productAdd.checkbox,
      };
    });
  }

  const PhysicalProductCheckbox =() =>{
    setProductAdd((prev) => {
      return {
        ...prev,
        physical_product_checkbox: !productAdd.physical_product_checkbox,
      };
    });
  }

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const top100Films = [
    { title: 'The Shawshank Redemption', id: 1 },
    { title: 'The Godfather', id: 2 },
    { title: 'The Godfather: Part II', id: 3 },
    { title: 'The Dark Knight', id: 4 },
    { title: '12 Angry Men', id: 5 },
    { title: "Schindler's List", id: 6 },
    { title: 'Pulp Fiction', id: 7 },
  ];
console.log('productAdd data is', productAdd)
  return (
    <Layout>
        <Box className={classes.root}>
          <Paper className={classes.paper} elevation={0}
           style={{ position: 'absolute', right: 0, top:0, left: toggleState ? 300 : 20,
            width:toggleState ? '77%' : '90%' ,transition: '.3s all' }}>
            <Grid container spacing={2}>
                <Grid item xs={7} > 
                <Typography variant="h6" sx={{ marginBottom: 2, padding: 1 }} >
                  Add Product
                </Typography>
                    <Typography  >
                        Title
                    </Typography>
                    <TextField
                      type="text"
                      id="outlined-basic"
                      placeholder="Short Sleeve T-Shirt"
                      variant="outlined"
                      sx={{ width: "95%", marginBottom: 2 }}
                      name="title"
                      value={productAdd.title}
                      onChange={handleAddProduct }
                    />
                     <Typography   >
                        Description
                      
                    </Typography>
                   <CKEditor
                    editor={ ClassicEditor }
                    //data={productAdd.description}
                     value={productAdd.description}
                  //    config={ {
                  //     plugins: [ Paragraph, Bold, Italic, Essentials ],
                  //     toolbar: [ 'bold', 'italic' ]
                  // } }
                    // onChange={ ( event, editor ) => {
                    //     const data = editor.getData();
                    //     console.log( { event, editor, data } );
                    // } }
                     onChange={(e, editor, data)=>handleChangeDescription(e, editor, data)}
                />
                    <Box sx={{border : '1px solid rgb(223,223,223)', padding:1, marginTop:1}}>
                        <Typography >
                            Pricing
                        </Typography>
                        <Grid container spacing={2} sx={{marginTop:1}}>
                          <Grid item xs={5}  sx={{  padding: 1, marginLeft:1 }}>
                            <Typography >
                              Price 
                            </Typography>
                            <TextField
                              type="text"
                              id="outlined-basic"
                              placeholder="$179"
                              variant="outlined"
                              sx={{ width: "95%", marginBottom: 2 }}
                              name="price"
                              value={productAdd.price}
                              onChange={handleAddProduct }
                            /> 
                          </Grid>
                          <Grid item xs={5}  sx={{  padding: 1, marginLeft:1 }}>
                          <Typography >
                            Compare Price 
                          </Typography>
                          <TextField
                                type="text"
                                id="outlined-basic"
                                placeholder="$179"
                                variant="outlined"
                                sx={{ width: "95%", marginBottom: 2 }}
                                name="compare_price"
                                value={productAdd.compare_price}
                                onChange={handleAddProduct }
                            /> 
                          </Grid>
                        </Grid>
                        <FormControlLabel sx={{ width:'100% !important'}}
                          control= { 
                            <Checkbox  
                              value="Charge tax on this product"
                              // onClick={(e)=>checkedItem(e)}
                              name="checkbox"
                              onChange={checkboxHandler}
                              />  
                            }
                            label='Charge tax on this product'  
                        />  
                    </Box>    
                    <Box sx={{border : '1px solid rgb(223,223,223)', padding:1, marginTop:1}}>
                        <Typography >
                            Inventory
                        </Typography>
                        <Grid container spacing={2} sx={{marginTop:1}}>
                          <Grid item xs={5}  sx={{  padding: 1, marginLeft:1 }}>
                            <Typography >
                              SKU(Stock Keeping Unit) 
                            </Typography>
                            <TextField
                              type="text"
                              id="outlined-basic"
                              // placeholder="$179"
                              variant="outlined"
                              sx={{ width: "95%", marginBottom: 2 }}
                              name="sku"
                              value={productAdd.sku}
                              onChange={handleAddProduct }
                            /> 
                          </Grid>
                          <Grid item xs={5}  sx={{  padding: 1, marginLeft:1 }}>
                          <Typography >
                            Barcode(ISBN, UPC, GTIN, etc) 
                          </Typography>
                          <TextField
                                type="text"
                                id="outlined-basic"
                                // placeholder="$179"
                                variant="outlined"
                                sx={{ width: "95%", marginBottom: 2 }}
                                name="barcode"
                                value={productAdd.barcode}
                                onChange={handleAddProduct }
                            /> 
                          </Grid>
                        </Grid> 
                    </Box> 
                    <Box sx={{border : '1px solid rgb(223,223,223)', padding:1, marginTop:1}}>
                        <Typography >
                            Shipping
                        </Typography>  
                        <FormControlLabel sx={{ width:'100% !important'}}
                          control= { 
                            <Checkbox  
                              value="This is a Physical Product"
                              // onClick={(e)=>checkedItem(e)}
                              name="physical_product_checkbox"
                              onChange={PhysicalProductCheckbox}
                              />  
                            }
                            label='This is a Physical Product'  
                        />  
                        <Typography  >
                            Weight
                        </Typography>
                      <Box  sx={{marginTop:1, display:'flex'}}>
                        <TextField
                          type="text"
                          id="outlined-basic"
                          variant="outlined"
                          sx={{ width: "40%", marginBottom: 2 }}
                          name="weight"
                          value={productAdd.weight}
                          onChange={handleAddProduct }
                        />
                        <Box sx={{marginLeft:1}}>
                          {/* <Select
                            placeholder="Select unit"
                            options={UnitOptions}
                            defaultValue={productAdd.unit}
                            style={{border:'1px solid red'}}
                            onChange={handleChangeUnitOpt}
                          /> */}
                       <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={productAdd.unit}
                          onChange={handleUnitChangeOpt}
                        > 
                        <MenuItem value={1}>kg</MenuItem>
                        <MenuItem value={2}>g</MenuItem>
                        <MenuItem value={3}>mg</MenuItem>
                        </Select>
                    </FormControl>
                        </Box>
                      </Box>
                    </Box> 
                </Grid>
                <Grid item xs={4}  sx={{  padding: 1, marginLeft:1 }}>
                {/* className={classes.item_grid}  */}
                <Button sx={{marginBottom:'10px '}}
                  variant="contained"
                  className={classes.stundentBtn}
                  // onClick={() => handleAddCategory()}
                >
                  Publish Product
                </Button>  
                    <Box sx={{ padding:1, marginTop:1}}>
                    <Typography >
                    Product Status    
                    </Typography>
                    <FormControl fullWidth>
                      {/* <InputLabel id="demo-simple-select-label">Product Status</InputLabel> */}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productAdd.product_status}
                        onChange={handleChangeOpt}
                       > 
                       <MenuItem value={1}>Active</MenuItem>
                       <MenuItem value={2}>Delete</MenuItem>
                      </Select>
                    </FormControl>
                    </Box>   
                    <Box sx={{padding:1, marginTop:1}}>
                    <Typography >
                       Product Organisation    
                    </Typography>
                    <Typography sx={{marginTop:1}}>
                       Vendor  
                    </Typography>
                    <TextField
                      type="text"
                      id="outlined-basic"
                      placeholder="ABC Styles Vendor"
                      variant="outlined"
                      sx={{ width: "100%", marginBottom: 2, marginTop:1 }}
                      name="vendor"
                      value={productAdd.vendor}
                      onChange={handleAddProduct }
                    />
                    </Box> 
                      <FormControl sx={{ m: 1, width: 335 }}>
                      <InputLabel id="demo-multiple-checkbox-label">Collection</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        // value={personName}
                        value={productAdd.selectCheckbox}
                        onChange={handleChange}
                        input={<OutlinedInput label="Collection" />}
                        renderValue={(selected, getTagProps) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value, index) => {
                              const nameIs = () =>{
                                const arr = top100Films.filter((a)=> a.id === value)
                                for (let i = 0; i < arr.length; i++) {
                                  return arr[i].title;
                                }
                              }
                            return(
                                <Box key={value}>
                                 <Chip key={value} label={nameIs()} />
                                </Box>
                            )
                          }
                            )}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                      {top100Films.map((name) => (
                        <MenuItem key={name.id} value={name.id} label={name.title}>
                          <Checkbox checked={productAdd.selectCheckbox.indexOf(name.id) > -1} />
                          <ListItemText primary={name.title} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
            </Grid>
          </Paper>
        </Box>
    </Layout>
  )
}

export default AddProduct;