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




const SideBar = ({ sidebarData }) => {


    const [open, setOpen] = useState()
    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <Box >
                <List
                    sx={{ width: '100%', }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <>
                        <ListItemButton onClick={() => handleClick(sidebarData.id)}>
                            <ListItemIcon >
                                {sidebarData.icon}
                            </ListItemIcon>
                            <ListItemText primary={sidebarData.name} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto"  >
                            {sidebarData.package.map((subItems ,id) => {
                                return (
                                    <List component="div" disablePadding key={id}>
                                        
                                        <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems.pathName}`} >
                                            <ListItemIcon>
                                               <CircleIcon /> 
                                            </ListItemIcon>
                                            <ListItemText primary={subItems.text} />
                                        </ListItemButton> 
                                        {subItems.id !== 4 ?
                                        <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems.pathName2}`} >
                                                <ListItemIcon>
                                                <AddCircleOutlineIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={subItems.text2} />
                                            </ListItemButton> 
                                        : null}
                                        {
                                        subItems.id === 3 && subItems.text3  ? 
                                        <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems.pathName3}`} >
                                            <ListItemIcon>
                                            <LinkIcon />
                                            </ListItemIcon>
                                             <ListItemText primary={subItems.text3} /> 
                                        </ListItemButton> : null}
                                            { subItems.id === 3 && subItems.text4 ?
                                            <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems.pathName4}`} >
                                            <ListItemIcon>
                                            <LinkIcon />
                                            </ListItemIcon>
                                             <ListItemText primary={subItems.text4} /> 
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