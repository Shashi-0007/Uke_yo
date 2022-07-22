import React from 'react'
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import ArticleIcon from '@mui/icons-material/Article';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CategoryIcon from '@mui/icons-material/Category';
import SideBar from '../SideBar';
import { Box } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { useSelector,useDispatch } from 'react-redux';
import {toggle} from '../../redux/action/Action'


const useStyle = makeStyles((theme)=>({
   root:{
    height:'100%',
   position:'absolute',
    overflow:'hidden',
    width:300,
     background:'#fff',
     zIndex:999,
    transition:'.3s all',
    background:'#dbdada',
   },
   image:{
       textAlign:'center',
      marginTop:theme.spacing(2),
   }
}))


const schoolData = [
    { id: 1, name: 'Groups', icon: <SubjectIcon />, package: [{ id:1, text: 'All Group', text2: 'Add Group',pathName:'grouptable', pathName2: 'addgroup',state: true }] },
    { id: 2, name: 'Attributes', icon: <ArticleIcon />, package: [{ id:2, text: '',text2: '', pathName2: 'addattributes',pathName: 'attributestable' }] },
    { id: 3, name: 'Categories', icon: <CategoryIcon />, package: [{ id:3, text: 'All Category', text2: 'Add New Category',state: true, data: 'false', pathName:'categorytable', 
    pathName2: 'addcategory', }] },
    { id: 4, name: 'Product', icon: <SubjectIcon />, package: [{ id:4, text:'Upload CSV',pathName:'productupload',state: false }] },


    // { id: 4, name: 'Questions', icon: <QuestionAnswerIcon />, package: [{ text: 'All Question', text2: 'Add New Question', pathName2: 'addquestion'}] },
   
]
const MainSidebar = () => {
    const toggleAppBar = useSelector((state)=>state.togglingReducer.togglingAll)
    const dispatch = useDispatch()
    const classes = useStyle();
    const handleToggle = () => {
        if(toggleAppBar){
            dispatch(toggle)
        }else{
            dispatch(toggle())
        }
      
     }
    return (
            <Box className={classes.root} sx={{width: toggleAppBar ? 300 : 60}}  onClick={handleToggle}>
                {schoolData.map((elem, i) => <SideBar key={i}  sidebarData={elem} />)}
            </Box>
    )
}

export default MainSidebar