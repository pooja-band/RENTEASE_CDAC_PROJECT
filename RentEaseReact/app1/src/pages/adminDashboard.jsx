import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryType, setCategoryType] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchCategoryTypes();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category/all');
      //console.log(response.data); // Add this line to debug
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const fetchCategoryTypes = async () => {
    try {
      const response = await axiosInstance.get('/category/types');
      setCategoryTypes(response.data);
    } catch (error) {
      console.error('Error fetching category types', error);
    }
  };

  const handleAddCategory = async () => {
     try {
    const response = await axiosInstance.post(`/category/admin/add/${sessionStorage.id}`, {
      description: newCategory,
      typeOfCategory: categoryType // "typeOfCategory" necessary to match with fields in DTO ekse null is passed
    });
    setCategories([...categories, response.data]);
    setNewCategory("");
    setCategoryType('');
  } catch (error) {
    console.error('Error adding category', error);
  }
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await axiosInstance.put(`/category/admin/update/${sessionStorage.id}`, {
        id: selectedCategory.id,
        description: newCategory,
        type: categoryType
      });
      setCategories(categories.map(cat => cat.id === selectedCategory.id ? response.data : cat));
      setSelectedCategory(null);
      setNewCategory("");
      setCategoryType('');
    } catch (error) {
      console.error('Error updating category', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axiosInstance.delete(`/category/admin/delete/${sessionStorage.id}/${categoryId}`);
      setCategories(categories.filter(cat => cat.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setNewCategory(category.description);
    setCategoryType(category.typeOfCategory);
  };

  return (
    <div className="container mt-5">
      <div className="row mt-4">
        <div className="col-md-8 mx-auto">
          <h4>{selectedCategory ? 'Update Category' : 'Add New Category'}</h4>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category Description"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
            >
              <option value="">Select Category Type</option>
              {categoryTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary btn-block mb-3"
            onClick={selectedCategory ? handleUpdateCategory : handleAddCategory}
          >
            {selectedCategory ? 'Update Category' : 'Add Category'}
          </button>
          {selectedCategory && (
            <button
              className="btn btn-secondary btn-block mb-3"
              onClick={() => { setSelectedCategory(null); setNewCategory(''); setCategoryType(''); }}
            >
              Cancel Update
            </button>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-8 mx-auto">
          <h4>Existing Categories</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Category Id</th>
                <th scope="col">Category Type</th>
                <th scope="col">Category Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{category.typeOfCategory}</td>
                  <td>{category.description}</td>    
                  <td>
                  <Link to={`/updatecategory/${category.id}`}>
                    <button className="btn btn-info btn-md mx-3">
                       Edit
                    </button>
                 </Link>

                    <button
                      className="btn btn-danger btn-md"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
