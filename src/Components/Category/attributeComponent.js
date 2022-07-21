import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { Paper,  Box,  Button, Typography,  TextField,  FormControlLabel,  Checkbox,  Grid} from "@mui/material";
import {  SortableContainer,  SortableElement,  sortableHandle, arrayMove } from "react-sortable-hoc";



const AttributeComponent = (props) => {
  return (
    <>

    {list !== ''? 
               list.map((subItems, subIndex)=>{
                // console.log("props.value.Group",subItems)
                const ValueAttribute = () => {
                  let k = props.attributeOptions.find((items)=>subItems.Attribute === items.value).label
                  // console.log("kkkkk",k)
                  return <Box>{ `${subIndex+1}. :  ${k}`}</Box>


                };
                  return (
                    <Box className="mainattribute"
                    onDragStart={(e) => dragStart(e, subIndex)}
                    onDragEnter={(e) => dragEnter(e, subIndex)}
                    onDragEnd={drop}
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
                                // onClick={() => deleteAttrb(subItems.Attribute, props.value.Group)}
                                onClick={() => handleLinkAttributeRemove(subItems.Attribute, props.value.Group)}



    <Box className="mainattribute">
        <Box className="attributetitle">
        {props.ValueAddAttribute()}
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
            onClick={() => props.handleLinkAttributeRemove(props.subItems.Attribute, props.value.Group)}
        />
        </Box>
    </Box>

    </>
  )
}

export default AttributeComponent