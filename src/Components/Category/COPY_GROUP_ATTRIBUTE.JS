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
    // console.log('hello ', e);
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
  // console.log("okkkkk", props.linkGroups)

  return (

    <>
    {
    list &&
    list.map((item, index) => (
      <div
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={index}
        draggable>
          {item}
      </div>
      ))}
    
    
      {
      props.linkGroups?.map((value, index)=>{
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
                // onClick={() => handleLinkGroupsRemove(index)}
                />
              </Box>
            </Box>
            {/* {value.Attribute !== ''? 
                value.Attribute.map((subItems, subIndex)=>{
                console.log('subIndex is', subIndex)
                console.log('subIndex is', subIndex)
                const ValueAddAttribute = () => {
                  let arr = attributeOptions.filter(
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
                    <AttributeComponent subItems={subItems} ValueAddAttribute={ValueAddAttribute} value={value}
                      handleLinkAttributeRemove={handleLinkAttributeRemove} />
        
        
                  </Box>
                  )
          
              })
           : null} */}
           
            
          </Box>
        )

      })
      
      
      
      
      }
    
   
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





// import React, { useEffect, useState, useRef  } from "react";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { Paper,  Box,  Button, Typography,  TextField,  FormControlLabel,  Checkbox,  Grid} from "@mui/material";




// const AttributeComponent = (props) => {

//     const [linkAttribute, setLinkAttribute] = useState([]);
    
//     const [list, setList] = useState(props.value.Attribute);
    
//     const dragItem = useRef();
//     const dragOverItem = useRef();
   
//     const dragStart = (e, position) => {
//       dragItem.current = position;
//     };
   
//     const dragEnter = (e, position) => {
//       // console.log('hello ', e);
//       dragOverItem.current = position;
//     };
   
//     const drop = (e) => {
//         const copyListItems = [...list];
//         const dragItemContent = copyListItems[dragItem.current];
//         copyListItems.splice(dragItem.current, 1);
//         copyListItems.splice(dragOverItem.current, 0, dragItemContent);
//         dragItem.current = null;
//         dragOverItem.current = null;
//         console.log("props.value.Attribute",props.value.Attribute)
//         console.log("copyListItems",copyListItems)

//       setList(copyListItems);
//     };
  
   
//     const handleLinkAttributeRemove = (Attribute, Group) => {
//       console.log('Index is ', Attribute, Group)

//       props.linkGroups?.map((itemis) =>{
//             console.log('itemis ',itemis)
//                 list.map((subItemis, index) => {
//                     console.log('subItemis', subItemis)
//                 if (itemis.Group == Group) {
//                     if (subItemis.Attribute === Attribute) {
//                         setList([
//                         ...list,
//                         { Group: Group, Attribute: itemis.Attribute.splice(index, 1) },
//                     ]);
//                     }
//                 }
//                 })
//             }
//        );
//        //console.log('linkGroups is tada', linkGroups);
//     };

//     const deleteAttrb=(att,grp)=>{
//         console.log('att', att);
//         console.log('grp', grp);
//     }
  
 



//   return (
//     <>
//     {list !== ''? 
//                list.map((subItems, subIndex)=>{
//                 console.log("props.value.Group",subItems)
//                 const ValueAttribute = () => {
//                   let arr = props.attributeOptions.filter(
//                     (items) => subItems.Attribute === items.value
//                   );
//                   for (let i = 0; i < arr.length; i++) {
//                     return  (
//                       <Box>
//                         { `${subIndex+1}. :  ${arr[i].label}` }   
//                       </Box>
//                       );
//                   }
//                 };
//                   return (
//                     <Box className="mainattribute"
//                     onDragStart={(e) => dragStart(e, subIndex)}
//                     onDragEnter={(e) => dragEnter(e, subIndex)}
//                     onDragEnd={drop}
//                     key={subIndex}
//                     draggable
//                     >
//                         <Box className="attributetitle">
//                         {ValueAttribute()}
//                         </Box>
//                         <Box className="attributebutton">
//                             <RemoveIcon
//                                 sx={{
//                                 marginLeft: "20px",
//                                 marginTop: "40px",
//                                 color: "white",
//                                 backgroundColor: "#808080",
//                                 borderRadius: "50%",
//                                 }}
//                                 className="groupremoveicon"
//                                 variant="contained"
//                                 onClick={() => deleteAttrb(subItems.Attribute, props.value.Group)}
//                             />
//                         </Box>
//                     </Box>
//                   )
          
//               })
//            : null}

//     </>
//   )
// }

// export default AttributeComponent
