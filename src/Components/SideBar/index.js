import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import LinkIcon from '@mui/icons-material/Link';
import { NavLink } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import { useSelector } from 'react-redux';




const SideBar = ({ sidebarData }) => {

    const toggleAppBar = useSelector((state)=>state.togglingReducer.togglingAll)

    const [open, setOpen] = useState(false)
    const handleClick = () => {
      
            setOpen(!open)
       
      
    }
    console.log('open',toggleAppBar)

    return (
        <>
            <Box >
                <List
                    sx={{ width: '100%', }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <>
                        <ListItemButton onClick={() => handleClick()} component={NavLink}  to={sidebarData.package[0].text==='' && `/attributestable`}>
                            <ListItemIcon >
                                {sidebarData.icon}
                            </ListItemIcon>
                          <ListItemText primary={sidebarData.name} />
                           {sidebarData.package[0].text==='' ? null : open ? <ExpandLess /> : <ExpandMore /> } 
                        </ListItemButton>
                        <Collapse in={open} timeout="auto"  >
                            {sidebarData.package.map((subItems ,id) => {
                                return (
                                    <List component="div" disablePadding key={id}>
                                        
                                        {subItems.text==='' ? null :  <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems?.pathName}`} >
                                     <ListItemIcon>
                                               <CircleIcon /> 
                                            </ListItemIcon>
                                           {subItems.text==='' ? null :  <ListItemText primary={subItems?.text} />}
                                        </ListItemButton> }
                                 
                                        {subItems.text==='' ? null :  <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems?.pathName2}`} >
                                      <ListItemIcon>
                                                <AddCircleOutlineIcon />
                                                </ListItemIcon> 
                                                <ListItemText primary={subItems?.text2} />
                                            </ListItemButton> }
                                      
                                        {
                                        subItems.id === 3 && subItems.text3  ? 
                                        <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems?.pathName3}`} >
                                            <ListItemIcon>
                                            <LinkIcon />
                                            </ListItemIcon>
                                             <ListItemText primary={subItems?.text3} /> 
                                        </ListItemButton> : null}
                                            { subItems.id === 3 && subItems.text4 ?
                                            <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems?.pathName4}`} >
                                            <ListItemIcon>
                                            <LinkIcon />
                                            </ListItemIcon>
                                             <ListItemText primary={subItems?.text4} /> 
                                        </ListItemButton>
                                         :null
                                     }
                                    </List>
                                )
                            })}
                        </Collapse>
                    </>
                </List>
            </Box>
        </>
    );

}
export default SideBar;