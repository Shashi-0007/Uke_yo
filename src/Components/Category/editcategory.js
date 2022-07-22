import React, { useEffect, useState, useRef } from 'react';
import { Paper,  Box,  Button, Typography,  TextField,  FormControlLabel,  Checkbox,  Grid} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Select from 'react-select';
import { useDispatch ,useSelector} from 'react-redux';
import {addcategory , allCategories, editcategory, UpdateCategory} from '../../redux/action/Action'
import { allGroup, allField } from "../../redux/action/Action";
import { useNavigate } from "react-router-dom";
import Groups from "./groupComponent";
import AttributeComponent from "./attributeComponent";





// const getAllCategory = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ] 

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "auto",
    color: "red",
    display: "flex",
    alignItems: "center",
    background: theme.palette.secondary.light,
    justifyContent: "center",
    zIndex: -99,
    "& .MuiPaper-root": {
      width: "100%",
      marginLeft:'22%',
      marginTop: "10%",
      height: "max-content",
      padding: `${theme.spacing(4)} 0`,
      [theme.breakpoints.down("lg")]: {
        width: "70%",
        padding: `${theme.spacing(2)} 0`,
      },
    },
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
// const useStyle = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     height: '100vh',
//     color: 'red',
//     display: 'flex',
//     alignItems: 'center',
//     background: theme.palette.secondary.light,
//     justifyContent: 'center',
//     zIndex: -99,
//     '& .MuiPaper-root': {
//       width: '35%',
//       height: 'max-content',
//       padding: `${theme.spacing(4)} 0`,
//       [theme.breakpoints.down('lg')]: {
//         width: '70%',
//         padding: `${theme.spacing(2)} 0`,
//       },
//     },

//   },

//   inputs: {
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 99,
//     '& .MuiInputLabel-root': {
//       fontSize: 15,
//       fontWeight: 500,
//     },
//     '& .MuiButton-root': {
//       color: theme.palette.secondary.light,
//     },
//     '& .css-1nrlq1o-MuiFormControl-root': {
//       width: '90%',
//       display: 'flex',
//       justifyContent: 'flex-start',
//       marginBottom: theme.spacing(2),
//       fontSize: 15,
//       fontWeight: 500,
//     },
//     '& .css-b62m3t-container':{
//       width:'90%',
//       marginBottom:15,
//       border: theme.palette.secondary.light,
//       '& .css-1s2u09g-control':{
//         padding: `${theme.spacing(1)} 5px`,
    
//       },
//       '& .css-14el2xx-placeholder':{
//         fontSize: 16,
//         fontWeight: 500,
//         },
//         '& .css-1pahdxg-control':{
//             outline:'none',
//             padding: `${theme.spacing(1)} 5px`,
//             // borderColor: 'hsl(0, 0%, 80%)',
//             border: `2px solid ${theme.palette.secondary.main}`,
//             boxShadow:'none'
//         },
     

  
//     },
    
//     '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked':{
//       color:theme.palette.primary.green,
//       },
//       '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track':{
//         background:theme.palette.primary.green,
//       },
//       '& .makeStyles-inputs-20':{
//         background:'red'
//       },
//     '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase':{
//       color:'red'
//     },
//     '& .css-1yjjitx-MuiSwitch-track':{
//       background:'red'
//     }
 
 
//   },
//   statusDiv:{
//     display:'flex',
//     alignItems:'center',
//   },
//   active:{
//     fontSize: '17px!important',
//       fontWeight: '500!important',
//       color:theme.palette.primary.green,
//       marginBottom:2
//   },
//   inactive:{
//     fontSize: '17px!important',
//     fontWeight: '500!important',
//       color:theme.palette.primary.red,
//       marginBottom:2
//   }
 


// }))

const EditCategory = (props) => {

  const classes = useStyle(props)

  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragItemAttr = useRef();
  const dragOverItemAttr = useRef();
  const group_Index_Is = useRef();

  const [list, setList] = useState();
  const [list1, setList1] = useState();

  const Navigate = useNavigate();
  const [checklist, setChecklist] = useState([]);

  const [message, setMessage] = useState('') 

  const [category, setCategory] = useState({
    categoryname: "",
    parent: 0,
    status: false,
    statusApi: "0",
    // checkbox: "",
    // group: "",
    // attribute: "",
  });

  const [groupAttribute, setGroupAttribute] =useState({
    group: "",
    attribute: ""
  })

  const [groupIndex, setGroupIndex] =useState({
    group_index: ''
   })

   const [attributeIndex, setAttributeIndex] =useState({
    attribute_index: ''
   })

  const editCategories = useSelector((state)=>state.editcategoryReducer.editcategory)

   const [linkGroups, setLinkGroups] = useState([]);
   const [linkAttribute, setLinkAttribute] = useState([]);
   
   const [editGroupsValue, setEditGroupsValue] = useState([]);

  // const getAllCategory = useSelector((state)=>state.allCategoryReducer.categoryData)
  console.log('editCategories are ', editCategories);
  
  console.log('linkGroups, editCategories', linkGroups)

  const dispatch = useDispatch()
 
  const getAllCategory = useSelector(
    (state) => state.allCategoryReducer.categoryData
  );
  const getAllgroup = useSelector((state) => state.allGroupReducer.allData);
  const getAllAttributes = useSelector( (state) => state.allFieldsReducer.allData  );

  
  // const options = [];
  // getAllCategory.map((items) =>
  //   options.push({ value: items.id, label: items.cat_name })
  // );

  const options =[
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "C" },
  ] 
  const groupOptions = [
    { value: "1", label: "Chocolate" },
    { value: "2", label: "Strawberry" },
    { value: "3", label: "Vanilla" },
  ];

    // const groupOptions = [];
    // getAllgroup.map((items) =>
    // groupOptions.push({ value: items.id, label: items.group_display_name })
    // );


  const attributeOptions = [
    { value: "1", label: "Attribute Chocolate" },
    { value: "2", label: "Attribute Strawberry" },
    { value: "3", label: "Attribute Vanilla" },
  ];

    // const attributeOptions = [];
    // getAllAttributes.map((items) =>
    // attributeOptions.push({ value: items.id, label: items.feild_name })
    // );

    
    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then(response => response.json())
    // .then(json => console.log(json))

  useEffect(()=>{
    setCategory({
      categoryId :editCategories.id,
      categoryname: editCategories.cat_name,
      parent_name:editCategories.parent_name,
      parent:editCategories.parent_cat,
      status:editCategories.status==="0" ? false : true,
      statusApi:editCategories.status
    })
    // setGroupAttribute({
    //   group: editCategories.group,
    //   attribute: editCategories.attribute
    // })
},[editCategories])
  


  const handlerStatus = (e) => {
    if (category.status) {
      setCategory((prev) => {
        return {
          ...prev,
          [e.target.name]: false,
          statusApi: "0",
        };
      });
    } else {
      setCategory((prev) => {
        return {
          ...prev,
          [e.target.name]: true,
          statusApi: "1",
        };
      });
    }
  };



  const handleChangeOpt = (selectedOption) => {
    setCategory((prev) => {
      return {
        ...prev,
        parent: selectedOption.value,
      };
    });
  };

  const handleGroupChangeOpt = (selectedGroupOptions) => {
    setGroupAttribute((prev) => {
      return {
        ...prev,
        //link : { group: selectedGroupOptions.value }
        group: selectedGroupOptions.value
      }
    });
  };

  const Attribute = [];
  const handleLinkGroupsAdd = () => {
    if (groupAttribute.group !== "") {
      let group = groupAttribute.group;
      const indexOf = linkGroups?.findIndex((item) => item.Group === group);
      if (indexOf === -1) {
        let a = { Group: groupAttribute.group, Attribute };
        setLinkGroups([...linkGroups, a]);
      }
    }
  };

  const handleAttributeChangeOpt = (selectedAttributeOption) => {
    setGroupAttribute((old) => {
      return {
        ...old,
        attribute: selectedAttributeOption.value,
      };
    });
  };

  const handleLinkAttributeAdd = () => {
    if (groupAttribute.attribute !== "") {
      let c = { Attribute: groupAttribute.attribute };
      let group = groupAttribute.group;
      const index = linkGroups.findIndex((item) => item.Group === group);
      setLinkAttribute([
        ...linkAttribute,
        { Group: group, Attribute: linkGroups[index].Attribute.push(c) },
      ]);
    }
    console.log("atatatata",linkGroups)
  };


const handleLinkGroupsRemove = (index) => {
  const list = [...linkGroups];
  list.splice(index, 1);
  setLinkGroups(list);
};

const handleLinkAttributeRemove = (Attribute, Group) => {
  //console.log("it is Group", Group);
  //console.log("it is Attribute", Attribute);
 linkGroups.map((itemis) =>
   itemis.Attribute.map((subItemis, index) => {
     
     if (itemis.Group === Group) {
       if (subItemis.Attribute === Attribute) {
         setLinkAttribute([
           ...linkAttribute,
           { Group: Group, Attribute: itemis.Attribute.splice(index, 1) },
         ]);
       }
     }
   })
 );
};
const handlecategory = (e) => {
  setCategory((prev) => {
    const { name, value } = e.target;
    return {
      ...prev,
      [name]: value,
    };
  });
};

const handlegroupIndex = (data, index) =>{
  console.log('data of group_index is', data, index)
    setGroupIndex({group_index:data})
}

const dragStart = (e, position) => {
  dragItem.current = position;
};

const dragEnter = (e, position) => {
  dragOverItem.current = position;
};

const drop = (a) => {
  console.log('iytems', a+1)
  let b =a+1
  const copyListItems = [...list];
  const dragItemContent = copyListItems[dragItem.current];
  copyListItems.splice(dragItem.current, 1);
  copyListItems.splice(dragOverItem.current, 0, dragItemContent);
  dragItem.current = null;
  dragOverItem.current = null;
  setList(copyListItems, b);
  setLinkGroups(copyListItems, b);
  console.log('dhnakjnsjn',copyListItems, b);
};

const dragStart1 = (e, position) => {
  dragItemAttr.current = position;
};

const dragEnter1 = (e, position) => {
  dragOverItemAttr.current = position;
};

const drop1 = (a, b, index) => {
   console.log('items are are', a )
  // console.log('b are are',  b)
  const copyListItems = [...a];
  const dragItemContent = copyListItems[dragItemAttr.current];
  copyListItems.splice(dragItemAttr.current, 1);
  copyListItems.splice(dragOverItemAttr.current, 0, dragItemContent);
  dragItemAttr.current = null;
  dragOverItemAttr.current = null;
  //console.log('linkGroups',linkGroups )
  console.log('hello',copyListItems )
  //setList(copyListItems);
  //setLinkGroups(copyListItems);
  // setLinkAttribute([
  //   ...linkAttribute,
  //   { Group: category.group, Attribute: copyListItems },
  // ]);
  setLinkAttribute([
    ...linkAttribute,
    { Group: b,  Attribute: copyListItems},
  ]);
  
  console.log('hello abcd',linkGroups )
};


// const handleEditCategory = () => {
//   let Data = {category : category, link : linkGroups}
//   // dispatch(addcategory(Data))
//   .then(() => Navigate("/categorytable"));
//   // console.log('data is tada', Data);
//   // .then(()=> Navigate('/linkgroup'))
// };

const handleEditCategory = () => {
    // let Data = {  Groups: linkGroups };
    // let Alldata = {...category, ...Data}
    // let GroupIndexis = {...groupIndex}
    // console.log('data is',  Alldata)
    // console.log('groupIndex is',  GroupIndexis)
    // dispatch(editcategory(Alldata))
    // .then(() => Navigate("/categorytable"));

    if(!category.categoryname && !category.parent){
      setMessage('Please fill the all inputs')
    }else{
      let Data = {  Groups: linkGroups };
      let Alldata = {...category, ...Data}
      let GroupIndexis = {...groupIndex}
      let editdata ={id: category.id}
      console.log('data is',  Alldata)
      console.log('groupIndex is',  GroupIndexis)
      // dispatch(UpdateCategory( Alldata))
      // .then(() => dispatch(editcategory(editdata))).then(()=>setMessage(' Category Updated Successfully'))
    }
  
};

useEffect(() => {
  dispatch(allGroup());
  dispatch(allField());
  dispatch(allCategories());
  dispatch(editcategory())

}, []);

useEffect(() => {
  setList1(linkAttribute);
}, [linkAttribute]);

useEffect(() => {
  setList(linkGroups);
}, [linkGroups]);

// let k = groupOptions.find((items)=>items.value===value.Group).label
console.log('bfbzfhb', options.find((a)=>{ return a.value }))

// useEffect(()=>{
//   console.log(setLinkAttribute)
// },[setLinkAttribute])

  return (
    <Layout>
      <Box className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Box className={classes.inputs}>
 
          <Grid container spacing={2}>
           <Grid item xs={6}>
           <Typography variant="h6"  sx={{ marginBottom: 2 }}>
              Edit Categories
            </Typography>
            <TextField
              type="text"
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              sx={{ width: "90%", marginBottom: 2 }}
              name="categoryname"
              value={category.categoryname}
              onChange={handlecategory}
            />
            <Select
              placeholder="Select Parent Category"
              options={options}
              defaultValue={category.parent}
              // defaultValue={{label: 2002, value: 2002 }}
              onChange={handleChangeOpt}
            />
            
            
            <FormControl className={classes.radionBtns}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Status
              </FormLabel>
              <Box className={classes.statusBox}>
                <Switch
                  checked={category.status}
                  name="status"
                  value={category.status}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={handlerStatus}
                />
                {category.status ? (
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
            
            <Box
              className="react_box"
              sx={{
                marginBottom: "5px",
                display: "flex",
                width: "100%",
                maxWidth: "90%",
              }}
            >
              <Select
                placeholder="Select Group"
                options={groupOptions}
                defaultValue={groupAttribute.group}
                onChange={handleGroupChangeOpt}
                
              />
              <Box className={classes.addgrpbuttons} sx={{ width: "32%" }}>
                <Button
                  sx={{
                    marginLeft: "10px",
                    marginTop: "10px",
                    backgroundColor: "#808080",
                  }}
                  variant="contained"
                  name="add_group"
                  onClick={() => handleLinkGroupsAdd()}
                >
                  Add Group
                </Button>
              </Box>
            </Box>
            <Box   className="react_box"
              sx={{
                marginBottom: "5px",
                display: "flex",
                width: "100%",
                maxWidth: "90%",
              }}
            >
              {groupAttribute.group !=='' ?  
              <>
              <Select
                placeholder="Select Attribute"
                options={attributeOptions}
                defaultValue={groupAttribute.attribute}
                onChange={(e) => handleAttributeChangeOpt(e)}
               
              />
              <Box
                className={classes.addgrpbuttons}
                sx={{ width: "45%" }}
              >
                <Button
                  sx={{
                    marginLeft: "11px",
                    marginTop: "10px",
                    backgroundColor: "#808080",
                  }}
                  variant="contained"
                  onClick={() =>
                    handleLinkAttributeAdd()
                  }
                >
                  Add Attribute
                </Button>
              </Box>
              </> : null}
              
            </Box>
      
          </Grid>
          <Grid item xs={6}>
          <Button sx={{marginBottom:'10px '}}
              variant="contained"
              className={classes.stundentBtn}
              onClick={() => handleEditCategory()}
            >
              Update Category
            </Button>

            
            {/* <Box className="maingroup">
              <Box className="groupbox" sx={{display:'flex'}}>
                Group : {editCategories.Group}
                <Box sx={{marginLeft:2}}
                    contentEditable="true"
                    name='group_index'
                  >
                        
                </Box>
                  <RemoveIcon
                    sx={{
                      marginLeft: "20px",
                      marginTop: "40px",
                      color: "white",
                      backgroundColor: "#808080",
                      borderRadius: "50%",
                    }}
                    className="groupremoveicon"
                    variant="contained"
                    
                  />
              </Box>
              <Box className="mainattribute" >
                <Box className="attributetitle">
                  {editCategories.Attribute}
                </Box>
                <Box className="attributebutton">
                  <RemoveIcon
                    sx={{
                      marginLeft: "20px",
                      marginTop: "40px",
                      color: "white",
                      backgroundColor: "#808080",
                      borderRadius: "50%",
                    }}
                    className="groupremoveicon"
                    variant="contained"
                    //  onClick={() => deleteAttrb(subItems.Attribute, value.Group)}
                  />
                </Box>
              </Box>
            </Box> */}
            
            
            <Box className="output">
                  {
                  
                  linkGroups?.map((value, index) => {  
                    const ValueAddGrps = () => {
                       let k = groupOptions.find((items)=>items.value===value.Group).label
               
                      return <Box>{"Group : " + k}</Box>;
                     
                    };
                    
                    return (
                      <Box
                        key={index}
                        className="maingroup"
                        // onDragStart={(e) => dragStart(e, index)}
                        // onDragEnter={(e) => dragEnter(e, index)}
                        // onDragEnd={()=>drop(index)}
                        // draggable
                      >
                        <Box className="groupbox">
                          <Box className="grouptitle" sx={{display:'flex'}}>
                            {ValueAddGrps()}
                          <Box sx={{marginLeft:2}}
                            contentEditable="true"
                            name='group_index'
                            // onInput={(e) => //(e.currentTarget.textContent)}
                            onInput={(e) => handlegroupIndex(e.currentTarget.textContent,index)}
                            ref={group_Index_Is}
                          >
                            {index+1}
                          </Box>
                            </Box>
                          <Box className="groupicon">
                            <RemoveIcon
                              sx={{
                                marginLeft: "20px",
                                marginTop: "40px",
                                color: "white",
                                backgroundColor: "#808080",
                                borderRadius: "50%",
                              }}
                              className="groupremoveicon"
                              variant="contained"
                              onClick={() => handleLinkGroupsRemove(index)}
                            />
                          </Box>
                        </Box>
                        <AttributeComponent
                          value={value}
                          attributeOptions={attributeOptions}
                          linkGroups={linkGroups}
                          // setLinkGroups={setLinkGroups}
                          // linkGroups={value.Group}
                          // onDelete={(attribite,group)=deleteAttrb(attribite,group)}
                        />
                        {/* {value.Attribute !== ""
                          
                          ? value.Attribute?.map((subItems, subIndex) => {
                            // debugger;
                              const ValueAttribute = () => {
                                let arr = attributeOptions.filter(
                                  (items) => subItems.Attribute === items.value
                                );
                                for (let i = 0; i < arr.length; i++) {
                                  return (
                                    <Box>
                                      {`${subIndex + 1}. :  ${arr[i].label}`}
                                    </Box>
                                  );
                                }
                              };
                              return (
                                // <AttributeComponent
                                //       value={value}
                                //       attributeOptions={attributeOptions}
                                //       linkGroups={value.Group}
                                //       subItems={subItems}
                                //       ValueAttribute={ValueAttribute}
                                //       // onDelete={(attribite,group)=deleteAttrb(attribite,group)}
                                //     />
                                <Box
                                  className="mainattribute"
                                  onDragStart={(e) => dragStart1(e, subIndex)}
                                  onDragEnter={(e) => dragEnter1(e, subIndex)}
                                  onDragEnd={()=>drop1(value.Attribute, value.Group, index)}
                                  key={subIndex}
                                  draggable
                                >
                                  <Box className="attributetitle">
                                    {ValueAttribute()}
                                  </Box>
                                  <Box className="attributebutton">
                                    <RemoveIcon
                                      sx={{
                                        marginLeft: "20px",
                                        marginTop: "40px",
                                        color: "white",
                                        backgroundColor: "#808080",
                                        borderRadius: "50%",
                                      }}
                                      className="groupremoveicon"
                                      variant="contained"
                                      onClick={() =>
                                        handleLinkAttributeRemove(
                                          subItems.Attribute,
                                          value.Group
                                        )
                                      }
                                      //  onClick={() => deleteAttrb(subItems.Attribute, value.Group)}
                                    />
                                  </Box>
                                </Box>
                              );
                            })
                          : null} */}
                      </Box>
                    );
                  })}
                </Box>
              
            {/* <Groups linkGroups={linkGroups} groupOptions = {groupOptions} attributeOptions={attributeOptions} /> */}
            </Grid>
          </Grid>
          </Box>
        </Paper>
      </Box>
    </Layout>
  )
}

export default EditCategory;