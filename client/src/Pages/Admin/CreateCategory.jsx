import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../Components/Form/CategoryForm';
import { Modal } from 'antd';




const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState("");
  const[visible,setVisible]=useState(false);
  const [selected,setSelected]=useState(null);
  const [updatedName,setUpdatedName]=useState("");
  //handel Submit
  const handelSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.post(`http://localhost:8080/api/createcategory`,{name});
      if(data?.success){
        toast.success(`${name} Category is created`);
        getAllCategory();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      console.log(error)
      toast.error('Something went wrong in input form')
    }
  }

  // get all Categories
  const getAllCategory = async () => {

    const ManageCat = {
      color: 'white',
      fontWeight: 'bold', 
      textAlign:'center',
      fontSize: '40px' // Increase font size (adjust as needed)
    };


    try {
      const { data } = await axios.get(`http://localhost:8080/api/getcategorys`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting category');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update Category
  const handelUpdate=async(e)=>{
    e.preventDefault()
    try{
     const {data}=await axios.put(`http://localhost:8080/api/updatecategory/${selected._id}`,{name:updatedName});
     if(data.success){
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategory();
     }
     else{
      toast.error(data.message);
     }
    }
    catch(error){
      toast.error('Something went Wrong');
    }
  };

  //Delete Category
  const handelDelete=async(pId)=>{
  
    try{
     const {data}=await axios.delete(`http://localhost:8080/api/deletecategory/${pId}`);
     if(data.success){
      toast.success(`Category is deleted`);
      
      
      getAllCategory();
     }
     else{
      toast.error(data.message);
     }
    }
    catch(error){
      toast.error('Something went Wrong');
    }
    
  }

  return (
    <Layout title={'Dashboard-All Category'}>
      <div className="container-fluid m-1 p-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9" style={{fontWeight:'bold',fontSize:'20px'}}>
            <h1 className='ManageCat'>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm handelSubmit={handelSubmit} value={name} setValue={setName}/>
            </div>
            <div className='w-75'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map(c => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td><button className='btn btn-primary' onClick={()=>{setVisible(true); setUpdatedName(c.name);
                      setSelected(c);}}>Edit</button>
                      <button className='btn btn-primary ms-2'
                      onClick={()=>{handelDelete(c._id)}}
                      >Delete</button>
                      
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}> <CategoryForm value={updatedName} setValue={setUpdatedName} handelSubmit={handelUpdate} /></Modal>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </Layout>
  );
};

export default CreateCategory;
