<template>
    <div class="main">
      <div class="header p-3 h4 fw-bold">
        <span class="text-primary">Product</span>
      </div>
  
      <div class="container mt-5 border shadow table-responsive">
        <div class="add my-3">
          <button class="btn btn-success" @click="addCustomer">
            <i class="fa-solid fa-plus fw-bold"></i> Add Product
          </button>
        </div>
        <hr>
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="customer in customers" :key="customer.id">
              <td>{{ customer.id }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.price }}</td>
              <td>{{ customer.qty }}</td>
              <td>{{ getCategoryName(customer.category_id) }}</td>
              <td class="ms">
                <button class="btn btn-primary me-1" @click="editCustomerModal(customer)">Edit</button>
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-for="customer in customers" :key="customer.id">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-danger text-white">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Product</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this product?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-danger" @click="deleteCustomer(customer.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="modal fade" id="addCustomerModal" tabindex="-1" aria-labelledby="addCustomerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title" id="addCustomerModalLabel">Add Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitCustomerForm">
                <div class="mb-3">
                  <label for="name" class="form-label">Name of Product:</label>
                  <input type="text" class="form-control" v-model="newCustomer.name" required>
                </div>
  
                <div class="mb-3">
                  <label for="price" class="form-label">Price:</label>
                  <input type="number" class="form-control" v-model="newCustomer.price" required>
                </div>
  
                <div class="mb-3">
                  <label for="qty" class="form-label">Quantity:</label>
                  <input type="number" class="form-control" v-model="newCustomer.qty" required>
                </div>
  
                <div class="mb-3">
                  <label for="category" class="form-label">Category:</label>
                  <select v-model="newCustomer.category_id" class="form-control">
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category }}</option>
                  </select>
                </div>
  
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-secondary ms-2" data-bs-dismiss="modal">Close</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <div class="modal fade" id="editCustomerModal" tabindex="-1" aria-labelledby="editCustomerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-warning text-white">
              <h5 class="modal-title" id="editCustomerModalLabel">Edit Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitEditForm">
                <div class="mb-3">
                  <label for="editName" class="form-label">Name:</label>
                  <input type="text" class="form-control" v-model="editCustomer.name" required>
                </div>
  
                <div class="mb-3">
                  <label for="editPrice" class="form-label">Price:</label>
                  <input type="number" class="form-control" v-model="editCustomer.price" required>
                </div>
  
                <div class="mb-3">
                  <label for="editQty" class="form-label">Quantity:</label>
                  <input type="number" class="form-control" v-model="editCustomer.qty" required>
                </div>
  
                <div class="mb-3">
                  <label for="editCategory" class="form-label">Category:</label>
                  <select v-model="editCustomer.category_id" class="form-control">
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category }}</option>
                  </select>
                </div>
  
                <button type="submit" class="btn btn-warning">Update</button>
                <button type="button" class="btn btn-secondary ms-2" data-bs-dismiss="modal">Close</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const customers = ref(null);
  const categories = ref([]);
  const newCustomer = ref({
    name: '',
    price: '',
    qty: '',
    category_id: '',
  });
  const editCustomer = ref({});
  
  const loadData = async () => {
    await loadCustomers();
    await loadCategories();
  };
  
  onMounted(loadData);

  const loadCustomers = async () => {
    const response = await axios.get('http://localhost:8000/api/products');
    customers.value = response.data;
  };
  
  const loadCategories = async () => {
    const response = await axios.get('http://localhost:8000/api/categories');
    categories.value = response.data;
  };
  

  const getCategoryName = (categoryId) => {
    const category = categories.value.find((c) => c.id === categoryId);
    return category ? category.category : 'Unknown Category';
  };
  
  const addCustomer = () => {
    loadCategories();
    $('#addCustomerModal').modal('show');
  };
  
  const submitCustomerForm = async () => {
    const response = await axios.post('http://localhost:8000/api/products', newCustomer.value);
    const createdCustomer = response.data;
    customers.value.push(createdCustomer);
    $('#addCustomerModal').modal('hide');
    newCustomer.value = {};
    loadData();
  };
  
  const deleteCustomer = async (customerId) => {
    await axios.delete(`http://localhost:8000/api/products/${customerId}`);
    customers.value = customers.value.filter((customer) => customer.id !== customerId);
    $('#deleteModal').modal('hide');
    loadData();
  };
  
  const editCustomerModal = (customer) => {
    loadCategories();
    editCustomer.value = { ...customer };
    $('#editCustomerModal').modal('show');
  };
  
  const submitEditForm = async () => {
    const response = await axios.patch(`http://localhost:8000/api/products/${editCustomer.value.id}`, editCustomer.value);
    const updatedCustomer = response.data;
  
    const index = customers.value.findIndex((customer) => customer.id === updatedCustomer.id);
    if (index !== -1) {
      customers.value[index] = updatedCustomer;
    }
  
    $('#editCustomerModal').modal('hide');
    editCustomer.value = {};
    loadData();
  };
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
  }
  
  .add {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .container {
    width: 96%;
    min-height: 50vh;
    border-radius: 10px;
  }
  
  .main {
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.775);
  }
  
  .header {
    box-shadow: 5px 3px 24px rgba(128, 128, 128, 0.21);
  }
  </style>
  