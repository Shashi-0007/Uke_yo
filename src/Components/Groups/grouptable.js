import { makeStyles } from '@mui/styles';
import React, { useEffect,useState } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper, Box } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../redux/action/Action';
import {allGroup , deletecategory ,editcategory ,editGroup ,deleteGroup} from '../../redux/action/Action'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';



const useStyle = makeStyles((theme)=>({
   root:{
     paddingTop:theme.spacing(20),
     width:'100%',
   },
   table:{
    //  width:'90%',
     margin:'auto',
   },

}))

const GroupTable = () => {

  const [data,setData] = useState([])
  const [tableData,setTableData] = useState({})
  const [deleteSuccess, setDeleteSuccess] = useState('')  
  const dispatch = useDispatch()
  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll)

  const getAllgroup   = useSelector((state)=>state.allGroupReducer.allData)
  //console.log('groups',getAllgroup)

  const Navigate = useNavigate();
  //console.log('delete',deleteCategory)
  //console.log('edit',editCategories)

  
  //console.log('first',getAllgroup)
  //console.log("ss",getAllgroup.length)

  if(getAllgroup.length==0){
    dispatch(allGroup())
  }

    const classes = useStyle()
 
    const handleEdit = (id) => {
      let edit_data ={"id":id}
      dispatch(editGroup(edit_data))
      .then(()=>Navigate('/editgroup'))
      
    };

    const handleDelete = (id) => {
     // console.log('first',id)
      if (window.confirm('Are you sure to delete the group ?')) {
      let delete_data ={"id":id}
         dispatch(deleteGroup(delete_data))
         //.then(() => dispatch(allGroup())).then(()=>setDeleteSuccess(' Group Deleted Successfully'))
          
      }
    }
    //console.log('message',deleteSuccess)

    const columns = [
    
        {
          name:'.S.No',
          selector: row => row.s.no,
          sortable: true,
          cell: (row,index) => index+1
        }
         , {
           name: "Group Name",
           selector: row => row.group_name,
           sortable: true
         },
         {
           name: "Group Category",
           selector: row => row.group_display_name,
           sortable: true
         },
         {
           name: "Status",
           selector: row => row.status,
           sortable: true,
           cell: ((row)=>{
             if(row.status==="0"){
               return 'inactive'
             }else if(row.status==="1"){
               return 'active'
             }else{
             return  row.status
             }
           })
         
         },
         {
           name : "Action",
           selector:row => row.id,
           sortable: false,
           cell: (d,id) => [
             <Box key={id}>
              <EditIcon className='edit_icon' onClick={()=>handleEdit(d.id)} />
              <DeleteIcon onClick={() => handleDelete(d.id)} />
            </Box>
          ],
           
         }
       
       ];

      useEffect(()=>{
          setData(getAllgroup)
          dispatch(toggle())
      },[getAllgroup])
       
      useEffect(()=>{
        setTableData((state)=>{
          return{
            ...state,
            data,
            columns
          }
        })
        dispatch(deleteGroup())
        dispatch(editGroup())
       },[data])

       useEffect(()=>{
        dispatch(allGroup())
       },[dispatch])

       //console.log('data',getAllgroup)

  return (
     
    <>
    <Layout>
       <div className={classes.root} >

          <div className={classes.student}>
              <Paper variant='outlined' className={classes.table}
               style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width:toggleState ? '80%' : '90%' ,transition: '.3s all', }}>
                     <DataTableExtensions {...tableData} >
                        <Table
                          columns={columns}
                          data={data}
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={false}
                          pagination
                          highlightOnHover
                        />
                      </DataTableExtensions>
                    </Paper>
          </div>
           </div> 
    </Layout>
    </>
  )
}

export default GroupTable