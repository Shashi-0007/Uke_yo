import { makeStyles } from '@mui/styles';
import React, { useEffect,useState } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../redux/action/Action';
import {allCategories , deletecategory ,editcategory} from '../../redux/action/Action'
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
   
   }
}))

const CategoryTable = () => {

  const [data,setData] = useState([])
  const [tableData,setTableData] = useState({})
  const [deleteSuccess, setDeleteSuccess] = useState('')  
  const dispatch = useDispatch()
  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll)

  const getAllCategory   = useSelector((state)=>state.allCategoryReducer.categoryData)
  
  const Navigate = useNavigate();
  //console.log('delete',deleteCategory)
  //console.log('edit',editCategories)

  
  //console.log('first',getAllCategory)


  // if(getAllCategory.length==0){
  //   console.log("length",getAllCategory.length)
  //   dispatch(allCategories())
  // }

    const classes = useStyle()
 
    const handleEdit = (id) => {
      dispatch(editcategory(id))
      .then(()=>Navigate('/editcategory'))
      
    };

    const handleDelete = (id) => {
     // console.log('first',id)
      if (window.confirm('Are you sure to delete the product ?')) {
         dispatch(deletecategory(id))
         .then(() => dispatch(allCategories())).then(()=>setDeleteSuccess(' Product Deleted Successfully'))
          
      }
    }
    //console.log('message',deleteSuccess)

    const columns = [
    
        {
          name:'.S.No',
          selector:'.s.no',
          sortable: true,
          cell: (row,index) => index+1
        }
         , {
           name: "Category Name",
           selector: "cat_name",
           sortable: true
         },
         {
           name: "Parent Category",
           selector: "parent_name",
           sortable: true
         },
         {
           name: "Status",
           selector: 'status',
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
           selector: 'id',
           sortable: false,
           cell: (d) => [
            <EditIcon onClick={()=>handleEdit(d.id)} />,
            <DeleteIcon onClick={() => handleDelete(d.id)} />,
          ],
           
         }
       
       ];
   

      useEffect(()=>{
          setData(getAllCategory)
          dispatch(toggle())
      },[getAllCategory])
       
   

      useEffect(()=>{
        setTableData((state)=>{
          return{
            ...state,
            data,
            columns
          }
        })
        //dispatch(deletecategory())
        //dispatch(editcategory())
       },[data])

       useEffect(()=>{
        dispatch(allCategories())
        
       },[])
       //console.log('data',getAllCategory)

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

export default CategoryTable