import React, { useEffect, useState, useRef  } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { Paper,  Box,  Button, Typography,  TextField,  FormControlLabel,  Checkbox,  Grid} from "@mui/material";




const AttributeComponent = (props) => {

    const [linkAttribute, setLinkAttribute] = useState([]);
    
    const [list, setList] = useState(props.value.Attribute);
    
    const dragItem = useRef();
    const dragOverItem = useRef();
   
    const dragStart = (e, position) => {
      dragItem.current = position;
    };
   
    const dragEnter = (e, position) => {
      // console.log('hello ', e);
      dragOverItem.current = position;
    };
   
    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        console.log("props.value.Attribute",props.value.Attribute)
        console.log("copyListItems",copyListItems)

      setList(copyListItems);
    };
  
   
    const handleLinkAttributeRemove = (Attribute, Group) => {
      console.log('Index is ', Attribute, Group)

      props.linkGroups?.map((itemis) =>{
            console.log('itemis ',itemis)
                list.map((subItemis, index) => {
                    console.log('subItemis', subItemis)
                if (itemis.Group == Group) {
                    if (subItemis.Attribute === Attribute) {
                      list.splice(index, 1);
                      // setList(list);
                      
                    //     setList([
                    //     ...list,
                    //     { Group: Group, Attribute: itemis.Attribute.splice(index, 1) },
                    // ]);
                    }
                }
                })
   console.log('list after delete is', list);

            }
       );
       //console.log('linkGroups is tada', linkGroups);
    };

    const deleteAttrb=(att,grp)=>{
        console.log('att', att);
        console.log('grp', grp);
    }
  
    useEffect(() => {
      setList(props.value.Attribute);
   }, [props]);

   useEffect(() => {
   },[list]);
 
   console.log('list is', list);


  return (
    <>
    {list !== ''? 
               list.map((subItems, subIndex)=>{
                // console.log("props.value.Group",subItems)
                const ValueAttribute = () => {
                  let k = props.attributeOptions.find((items)=>subItems.Attribute === items.value).label
                  // console.log("kkkkk",k)
                  return <Box>{ `${subIndex+1}. :  ${k}`}</Box>;


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

                            />
                        </Box>
                    </Box>
                  )
          
              })
           : null}

    </>
  )
}

export default AttributeComponent