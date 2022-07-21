import React, { useEffect, useState } from "react";
import { Paper, Box, Button, Typography, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { allCategories, allGroup } from "../../redux/action/Action";
import { useNavigate } from "react-router-dom";
import { SortableContainer, SortableElement, sortableHandle, arrayMove } from "react-sortable-hoc";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "red",
    display: "flex",
    alignItems: "center",
    background: theme.palette.secondary.light,
    justifyContent: "center",
    zIndex: -99,
    // border:'2px solid red',

    "& .MuiPaper-root": {
      width: "35%",
      height: "auto",
      marginTop: "10%",
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
    //border:'2px solid green ',
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
  statusDiv: {
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
  addgrpbuttons: {
    width: "100%",
    maxWidth: "90%",
  },
}));

const LinkGroup = (props) => {
  const classes = useStyle(props);

  const Navigate = useNavigate();

  const getAllCategory = useSelector(
    (state) => state.allCategoryReducer.categoryData
  );
  const getAllgroup = useSelector((state) => state.allGroupReducer.allData);
  //const getAllgroup   = useSelector((state)=>state.allGroupReducer.allData)
  const dispatch = useDispatch();

  const options = [];
  getAllCategory.map((items) =>
    options.push({ value: items.id, label: items.cat_name })
  );

  const groupOptions = [];
  getAllgroup.map((items) =>
    groupOptions.push({ value: items.id, label: items.group_name })
  );
  const dataservice = [];

  const [addGroup, setAddGroup] = useState({
    parent: 2,
    checkbox: "",
    group: "",
    inputOption: groupOptions,
  });

  const [linkGroups, setLinkGroups] = useState([]);

  const handleLinkGroupsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...linkGroups];
    list[index][name] = value;
    setLinkGroups(list);
  };

  const handleLinkGroupsAdd = () => {
    setLinkGroups([...linkGroups, { service: addGroup.group }]);
  };

  const handleLinkGroupsRemove = (index) => {
    const list = [...linkGroups];
    list.splice(index, 1);
    setLinkGroups(list);
  };

  const handleChangeOpt = (selectedOption) => {
    setAddGroup((prev) => {
      return {
        ...prev,
        parent: selectedOption.value,
      };
    });
  };
  const handleGroupChangeOpt = (selectedOptions) => {
    setAddGroup((prev) => {
      return {
        ...prev,
        group: selectedOptions.value,
      };
    });
  };

  const SortableItem = SortableElement(({ value }) => {
    const index = linkGroups.indexOf(value);
    const ValueAddGrps = () => {
      let arr = groupOptions.filter((items) => value.service === items.value);
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
            name="service"
            key={index}
          >
            {ValueAddGrps()}
          </Typography>
          <Button
            sx={{
              
              marginLeft: "10px",
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

  const SortableList = SortableContainer(({ items }) => {
    return (
      <Box>
        {items.map((value, index) => (
          <SortableItem key={items.id} index={index} value={value} />
        ))}
      </Box>
    );
  });
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    let tasksCopy = [...linkGroups];
    tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
    setLinkGroups(tasksCopy);
  };
  const handleaddGroup = (e) => {
    setAddGroup((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleLinkGroups = () => {};

  if (getAllCategory.length == 0) {
    dispatch(allCategories());
  }
  if (getAllgroup.length == 0) {
    dispatch(allGroup());
  }

  //console.log('linkGroups is ',linkGroups)
  //console.log('group',addGroup.group)

  return (
    <Layout>
      <Box className={classes.root} elevation={0}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
              Link Group
            </Typography>
            <Select
              options={options}
              defaultValue={addGroup.parent}
              onChange={handleChangeOpt}
            />
            <Select
              options={groupOptions}
              defaultValue={addGroup.group}
              onChange={handleGroupChangeOpt}
            />
            <Box className={classes.addgrpbuttons}>
              <Button
                sx={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  backgroundColor: "#808080",
                }}
                variant="contained"
                onClick={() => handleLinkGroupsAdd()}
              >
                Add Group
              </Button>
            </Box>
            <FormControl className={classes.radionBtns}>
              <Box className="output">
                <SortableList items={linkGroups} onSortEnd={onSortEnd} />
              </Box>
            </FormControl>
            <Button
              variant="contained"
              className={classes.stundentBtn}
              onClick={() => handleLinkGroups()}
            >
              Add
            </Button>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default LinkGroup;
