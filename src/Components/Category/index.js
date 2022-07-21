import React, { useEffect, useState } from "react";
import { Paper,  Box,  Button, Typography,  TextField,  FormControlLabel,  Checkbox,  Grid} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import Select from "react-select";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { addcategory } from "../../redux/action/Action";
import { allCategories, allGroup, allField } from "../../redux/action/Action";
import { useNavigate } from "react-router-dom";
import {  SortableContainer,  SortableElement,  sortableHandle, arrayMove } from "react-sortable-hoc";
import Groups from "./groupComponent";




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

const AddCategory = (props) => {
  const classes = useStyle(props);
  const Navigate = useNavigate();
  const [checklist, setChecklist] = useState([]);
  const [category, setCategory] = useState({
    categoryname: "",
    parent: 2,
    checkbox: "",
    status: false,
    group: "",
    attribute: "",
    statusApi: "0",
  });
  const [linkGroups, setLinkGroups] = useState([]);
  const [linkAttribute, setLinkAttribute] = useState([]);
console.log('linkGroups',linkGroups)
  // const [category, setCategory] = useState({
  //   categoryname: "",
  //   parent: 2,
  //   status: false,
  //   statusApi: "0",
  //   //group : '',
  //   link :[{
  //     group : '',
  //     Attribute :  [{
  //        Attribute : '',
  //       }]
  //   }]
  // });

  

console.log('category', category)
  const dispatch = useDispatch();
  const getAllCategory = useSelector(
    (state) => state.allCategoryReducer.categoryData
  );
  const getAllgroup = useSelector((state) => state.allGroupReducer.allData);

  console.log('getAllgroup', getAllgroup)
  

  const getAllAttributes = useSelector( (state) => state.allFieldsReducer.allData  );

  console.log('getAllAttributes', getAllAttributes)

  const options = [];
  getAllCategory.map((items) =>
    options.push({ value: items.id, label: items.cat_name })
  );

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
    // console.log('selectedGroupOptions', selectedGroupOptions);
    setCategory((prev) => {
      return {
        ...prev,
        //link : { group: selectedGroupOptions.value }
        group: selectedGroupOptions.value
      }
    });
  };

 
  const Attribute = [];
  const handleLinkGroupsAdd = (indexOf) => {
    if(category.group !==''){
    if(indexOf === -1){
      //console.log('hell is', indexOf)
    let groupis = category.link
    let a = { Group: category.group, Attribute };
    setLinkGroups([...linkGroups, a]);
    }
  }
}


  const handleAttributeChangeOpt = (selectedAttributeOption) => {
    setCategory((old) => {
      console.log('old data is', old)
    //   return{
    //     ...old,
    //   link :{
    //     ...old.link,
    //     Attribute :{
    //       ...old.link.Attribute,
    //       Attribute : selectedAttributeOption.value
    //     }
    //   }
    // }
      return {
        ...old,
        attribute: selectedAttributeOption.value,
      };
    }
    )
  };

  const handleLinkAttributeAdd =() => {
    if(category.attribute !==''){
    let c = { Attribute: category.attribute };
    let group=category.group
    const filter = linkGroups.indexOf(group);
    
    const index = linkGroups.findIndex(item => item.Group === group);
    //console.log('index',index );
    setLinkAttribute([
      ...linkAttribute,
      { Group: group, Attribute: linkGroups[index].Attribute.push(c) }
    ]);
  }
}

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
    //console.log('linkGroups is tada', linkGroups);

   
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

  const handleAddCategory = () => {
    let Data = {category : category, link : linkGroups}

    dispatch(addcategory(Data))
    .then(() => Navigate("/categorytable"));
    console.log('data is tada', Data);
    
    // .then(()=> Navigate('/linkgroup'))
  };

  const SortableGroupItem = SortableElement(({ value }) => {
    // console.log('object', value);
    const index = linkGroups.indexOf(value);
    const ValueAddGrps = () => {
    };
    return (
      <>
        <Box
          sx={{
            marginBottom: "10px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="string"
            sx={{
              width: "30%",
              border: "1px solid #dcdde0",
              padding: " 12px 7px",
              borderRadius: "5px",
            }}
            name="grp"
            key={index}
          >
            {ValueAddGrps()}
          </Typography>

          <Box
            className="react_box"
            sx={{
              marginBottom: "5px",
              marginLeft: "10px",
              display: "flex",
              marginTop: "25px",
              width: "100%",
              maxWidth: "40%",
            }}
          ></Box>
          <Button
            sx={{
              marginLeft: "53px",
              backgroundColor: "#808080",
            }}
            variant="contained"
            onClick={() => handleLinkGroupsRemove(index)}
          >
            -
          </Button>
        </Box>
      </>
    );
    //console.log('index is', index) #E8E8E8
  });

  const SortableAttributeItem = SortableElement(({ value }) => {
    let { Attribute } = value;
    // console.log("Attribute of attribute", Attribute);
    // console.log("value of attribute", value);
    const IndexofAttribute = () => {
      //const filterIndex = linkGroups.filter((items)=>  value.Attribute === items.Attribute)
      const filterIndex = linkGroups.filter((items) =>
        console.log("items.Attribute", items.Attribute)
      );

      console.log(" value.Attribute", value.Attribute);
    };
    let itemsare = [...linkGroups];

    console.log("itemsare", itemsare);
    const filterIndexData = itemsare.map((items) => {
      return items.Group;
    });
    console.log("filterIndexData", filterIndexData);

    const indexAttribute = linkGroups.indexOf(value);

    console.log("indexAttribute", IndexofAttribute());

    const ValueAddAttribute = () => {
      let arr = attributeOptions.filter(
        (items) => value.Attribute === items.value
      );
      for (let i = 0; i < arr.length; i++) {
        return arr[i].label;
      }
    };
    return (
      <>
        <Box
          sx={{
            marginBottom: "10px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="string"
            sx={{
              width: "35%",
              border: "1px solid #dcdde0",
              padding: " 12px 7px",
              borderRadius: "5px",
            }}
            name="Attribute"
          >
            {ValueAddAttribute()}
          </Typography>
          <Button
            sx={{
              marginLeft: "10px",
              backgroundColor: "#808080",
            }}
            variant="contained"
            onClick={() =>
              handleLinkAttributeRemove(Attribute, filterIndexData)
            }
          >
            -
          </Button>
        </Box>
      </>
    );
  });

  const SortableGroupList = SortableContainer(({ items }) => {
    return (
      <Box>
        {items.map((value, index) => (
          <SortableGroupItem
            key={items.attributefields}
            index={index}
            value={value}
          />
        ))}
      </Box>
    );
  });

  const SortableAttributeList = SortableContainer(({ items }) => {
    console.log("items are tada", items);
    return (
      <Box>
        {items.map((value, index) => (
          <SortableAttributeItem key={items.id} index={index} value={value} />
        ))}
      </Box>
    );
  });

  const onSortGroupEnd = async ({ oldIndex, newIndex }) => {
    let tasksCopy = [...linkGroups];
    tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
    setLinkGroups(tasksCopy);
  };

  const onSortAttributeEnd = async ({ oldIndex, newIndex }) => {
    console.log("New and Old index are", oldIndex, newIndex);
    const filterData = linkGroups.map((items) => {
      return items.Attribute;
    });
    const indexA = linkGroups.indexOf(filterData);
    let tasksCopy = [...linkGroups];
    // console.log('NlinkGroupsare',tasksCopy);
    console.log("filterData", filterData);
    console.log("indexA", indexA);
    tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
    console.log("is tasksCopy", tasksCopy.length);

    setLinkAttribute(tasksCopy);
    //const linkAttr = linkGroups.filter((items)=>)
  };

  useEffect(() => {
     dispatch(allGroup());
     dispatch(allField());
     dispatch(allCategories());

  }, []);

  let group = category.group
  const indexOf = linkGroups.findIndex(item => item.Group === group);              
  //  console.log("indexOf is", indexOf)
 
  

  return (
    <Layout>
      <Box className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Box className={classes.inputs}>
 
          <Grid container spacing={2}>
           <Grid item xs={6}>
           <Typography variant="h6"  sx={{ marginBottom: 2 }}>
              Add Category
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
                defaultValue={category.group}
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
                  onClick={() => handleLinkGroupsAdd(indexOf)}
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
              {category.group !=='' ?  
              <>
              <Select
                placeholder="Select Attribute"
                options={attributeOptions}
                defaultValue={category.attribute}
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
              onClick={() => handleAddCategory()}
            >
              Save Category
            </Button>
            <Box className="output" >
              
              {  linkGroups.map((value, index) => {
                //console.log('index data is', index)
                console.log("value", value)
                //  console.log("linkGroups", linkGroups)
                const ValueAddGrps = () => {
                  let arr = groupOptions.filter(
                    (items) => value.Group === items.value
                  );
                  for (let i = 0; i < arr.length; i++) {
                    return  (
                      <Box>
                        {
                           "Group : "+ arr[i].label
                        }    
                      </Box>
                      );
                  }
                };
 
                return (
                  <Box key={index} >
                   {/* {category.group === value.Group ? console.log('ge') : null} */}
                  
                    <Box key={index}  sx={{ marginBottom:'5px', }} >
                      <Groups linkGroups={linkGroups} ValueAddGrps={ValueAddGrps} 
                       index={index} value={value} handleLinkGroupsRemove={handleLinkGroupsRemove} 
                        attributeOptions={attributeOptions} handleLinkAttributeRemove={handleLinkAttributeRemove}
                        setLinkGroups={setLinkGroups}/>
                        {/* <Box className="groupbox">
                          <Box className="grouptitle">
                          {ValueAddGrps()}
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
                      </Box> */}

                     
                    </Box>
                      {/* <SortableAttributeList
                        items={linkGroups[indexx].Attribute}
                        onSortEnd={onSortAttributeEnd}
                      /> */}
                  </Box>
                  );
              })

            } 
              </Box>
            {/* <Button
              variant="contained"
              className={classes.stundentBtn}
              onClick={() => handleAddCategory()}
            >
              Save Category
            </Button> */}
            </Grid>
          </Grid>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default AddCategory;
