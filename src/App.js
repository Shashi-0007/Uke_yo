
import Login from './Pages/Auth/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddGroup from './Components/Groups';
import AddQuestion from './Components/Question';
import AddExam from './Components/Exam';
import NavBar from './Components/Header/AppBar';
import Testing from './Components/Testing';
import CategoryTable from './Components/Category/CategoryTable';
import AddCategory from './Components/Category';
import EditCategory from './Components/Category/editcategory';
import AddAttributes from './Components/Attribute';
import AttributeTable from './Components/Attribute/attributetable';
import EditAttribute from './Components/Attribute/editattribute';
import GroupTable from './Components/Groups/grouptable';
import EditGroup from './Components/Groups/editgroup';
import LinkAttribute from './Components/LinkAttribute';
import LinkGroup from './Components/LinkGroup'
import Uploadcsv from './Components/Product/productupload';
import AddProduct from './Components/Add Product/addproduct';
// import ForTesting from './Components/Add Product/fortest';
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import 'react-quill/dist/quill.snow.css';


const App = () => {
 
  return (
    <>
      <Routes>
         <Route path='/' exact element={<Navigate to='/login' />} />
         <Route path='/login' exact element={<Login />} />
         <Route path='/header' exact element={<NavBar  />} />
         <Route path='/addcategory' exact element={<AddCategory />} />
         <Route path='/editcategory' exact element={<EditCategory />} />
         <Route path='/addgroup' exact element={<AddGroup/>} /> 
         <Route path='/addquestion' exact element={<AddQuestion/>} /> 
         <Route path='/addexam' exact element={<AddExam/>} /> 
         <Route path='/categorytable' exact element={<CategoryTable/>} /> 
         <Route path='/addattributes' exact element={<AddAttributes/>} /> 
         <Route path='/attributestable' exact element={<AttributeTable/>} /> 
         <Route path='/editattributes' exact element={<EditAttribute/>} /> 
         <Route path='/grouptable' exact element={<GroupTable/>} /> 
         <Route path='/editgroup' exact element={<EditGroup/>} /> 
         <Route path='/linkattribute' exact element={<LinkAttribute/>} /> 
         <Route path='/linkgroup' exact element={<LinkGroup/>} /> 
         <Route path='/productupload' exact element={<Uploadcsv/>} /> 
         <Route path='/addproduct' exact element={<AddProduct/>} /> 
         {/* <Route path='/fortesting' exact element={<ForTesting/>} />  */}
      </Routes>

    </>
  )
}

export default App