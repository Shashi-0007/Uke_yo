import React, { useEffect, useState, useRef  } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { Paper,  Box,  Button, Typography,  TextField,  FormControlLabel,  Checkbox,  Grid} from "@mui/material";
import AttributeComponent from "./attributeComponent";



 const  Groups = (props) => {

  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
 
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  const helloclicl =() =>{
    console.log("okkkkk")
  }

  return (
    <>
    {
    list &&
    list.map((item, index) => (
      <div style={{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'center', fontSize:'40px'}}
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={index}
        draggable>
        
          { <span onClick={helloclicl}>click me{index}</span> }
          {
            <Box key={props.index} className="maingroup">
                 <Box className="groupbox">
                  <Box className="grouptitle">
                   {props.ValueAddGrps()}
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
                  onClick={() => props.handleLinkGroupsRemove(props.index)}
                  />
                </Box>
              </Box>
              {props.value.Attribute !== ''? 
                  props.value.Attribute.map((subItems, subIndex)=>{
                  console.log('subIndex is', subIndex)
                  console.log('subIndex is', subIndex)
                  const ValueAddAttribute = () => {
                    let arr = props.attributeOptions.filter(
                      (items) => subItems.Attribute === items.value
                    );
                    for (let i = 0; i < arr.length; i++) {
                      return  (
                        <Box>
                          { `${subIndex+1}. :  ${arr[i].label}` }    
                        </Box>
                        );
                    }
                  };
                    return (
                    <Box sx={{display:'flex', marginBottom:'10px'}}>
                      <AttributeComponent subItems={subItems} ValueAddAttribute={ValueAddAttribute} value={props.value}
                        handleLinkAttributeRemove={props.handleLinkAttributeRemove} />
          
          
                    </Box>
                    )
            
                })
             : null}
             
              
            </Box>
          }
      </div>
      ))}
    </>
  );


  console.log('linkGroups props', props.value);
  // return (
  //   <Box key={props.index} className="maingroup">
  //     <Box className="groupbox">
  //       <Box className="grouptitle">
  //       {props.ValueAddGrps()}
  //       </Box>                     
  //     <Box className="groupicon">
  //       <RemoveIcon
  //       sx={{
  //         marginLeft: "20px",
  //         marginTop: "40px",
  //         color: "white",
  //         backgroundColor: "#808080",
  //         borderRadius: "50%",
  //       }}
  //       className="groupremoveicon"
  //       variant="contained"
  //       onClick={() => props.handleLinkGroupsRemove(props.index)}
  //       />
  //     </Box>
  //   </Box>
  //   {props.value.Attribute !== ''? 
  //       props.value.Attribute.map((subItems, subIndex)=>{
  //       console.log('subIndex is', subIndex)
  //       console.log('subIndex is', subIndex)
  //       const ValueAddAttribute = () => {
  //         let arr = props.attributeOptions.filter(
  //           (items) => subItems.Attribute === items.value
  //         );
  //         for (let i = 0; i < arr.length; i++) {
  //           return  (
  //             <Box>
  //               { `${subIndex+1}. :  ${arr[i].label}` }    
  //             </Box>
  //             );
  //         }
  //       };
  //         return (
  //         <Box sx={{display:'flex', marginBottom:'10px'}}>
  //           <AttributeComponent subItems={subItems} ValueAddAttribute={ValueAddAttribute} value={props.value}
  //             handleLinkAttributeRemove={props.handleLinkAttributeRemove} />


  //         </Box>
  //         )
  
  //     })
  //                    : null}
  //   {/ <AttributeComponent value={props.value} /> /}
    
  // </Box>
  // )
}

export default Groups;