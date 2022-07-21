import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { Paper,  Box,  Button, Typography,  TextField,  FormControlLabel,  Checkbox,  Grid} from "@mui/material";
import {  SortableContainer,  SortableElement,  sortableHandle, arrayMove } from "react-sortable-hoc";



const AttributeComponent = (props) => {
  return (
    <>

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