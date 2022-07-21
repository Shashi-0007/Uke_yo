import { makeStyles } from '@mui/styles';
import React, { useEffect,useState } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../redux/action/Action';
import {allCategories , deletefield ,editField , allField} from '../../redux/action/Action'
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
const AttributeTable = () => {

  const [data,setData] = useState([])
  const [tableData,setTableData] = useState({})
  const [deleteSuccess, setDeleteSuccess] = useState('')  
  const dispatch = useDispatch()
  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll)

  const getAllAttributes   = useSelector((state)=>state.allFieldsReducer.allData)
  
  const Navigate = useNavigate();
  console.log('getAllAttributes',getAllAttributes)
  //console.log('edit',editCategories)

  //console.log('first',deleteCategory)
  // if(getAllAttributes.length==0){
  //   console.log("length",getAllAttributes.length)
  //   dispatch(allField())
  // }

    const classes = useStyle()
 
    const handleEdit = (id) => {
      dispatch(editField(id))
      .then(()=>Navigate('/editattributes'))
      
    };

    const handleDelete = (id) => {
     console.log('first',id)
      if (window.confirm('Are you sure to delete the Attribute ?')) {
         dispatch(deletefield(id))
         .then(() => dispatch(allField())).then(()=>setDeleteSuccess(' Attribute Deleted Successfully'))
          
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
           name: "Attribute Name",
           selector: "feild_name",
           sortable: true
         },
        //  {
        //    name: "Attribute Type",
        //    selector: "feild_type",
        //    sortable: true
        //  },
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
          setData(getAllAttributes)
          dispatch(toggle())
      },[getAllAttributes])
       
   


      useEffect(()=>{
        setTableData((state)=>{
          return{
            ...state,
            data,
            columns
          }
        })
        dispatch(deletefield())
        dispatch(editField())
       },[data])

       useEffect(()=>{
        dispatch(allField())
       },[])
       //console.log('data',getAllAttributes)

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

export default AttributeTable