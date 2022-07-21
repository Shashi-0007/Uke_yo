import React, { useEffect, useState, useRef  } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { Paper,  Box,  Button, Typography,  TextField,  FormControlLabel,  Checkbox,  Grid} from "@mui/material";
import AttributeComponent from "./attributeComponent";



 const  Groups = (props) => {

  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(props.linkGroups);
  //  console.log("ookkkkkkkkkkkkk",list)
 
  const dragStart = (e, position) => {
    dragItem.current = position;
    // console.log("0000kkkkk", dragItem.current);
  };
 
  const dragEnter = (e, position) => {
    // console.log('hello ', e);
    dragOverItem.current = position;
    // console.log("ppppppp",e.target.innerHTML);
    // console.log("0000kkkkk",dragOverItem.current);
  };
 
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
    props.linkGroups(copyListItems)
    console.log("copyListItems", copyListItems)

  };

  //  console.log("linkgroup is", props.linkGroups)
  const handleLinkGroupsRemove = (index) => {
    // console.log('Index', index)
    // const list = [...list];
    // const list1 = [...list];
    list.splice(index, 1);
    setList(list);
    console.log("okkkkk list is", list)
    // console.log(" list1 is", list1)

  };

  useEffect(() => {
    setList(props.linkGroups);
 }, [props]);
 
 useEffect(() => {
}, [list]);

    console.log('list is',list)
   console.log("linkgroup data is", props.linkGroups)

  return (

    <>
    
    
    <Box className="output" >
      {
     list?.map((value, index)=>{
        const ValueAddGrps = () => {
          let arr = props.groupOptions.filter(
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
        return(
          <Box key={index} className="maingroup"
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          draggable
          >
               <Box className="groupbox">
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
            </Box>
            <AttributeComponent  value={value} attributeOptions={props.attributeOptions} linkGroups={value.Group} 
            // onDelete={(attribite,group)=deleteAttrb(attribite,group)}
            />
          </Box>
        )

      })  
      }
    </Box>
   
    {/* {  linkGroups.map((value, index) => {




    })} */}
            
  
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
  //   {/* <AttributeComponent value={props.value} /> */}
    
  // </Box>
  // )
}

export default Groups;
