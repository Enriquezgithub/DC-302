  <template>
    <div class="main">
      <div class="header p-3 h4 fw-bold">
        <span class="text-primary">Customer</span>
      </div>
  
      <div class="container mt-5 border shadow table-responsive">
        <div class="add my-3">
          <button class="btn btn-success" @click="addCustomer">
            <i class="fa-solid fa-plus fw-bold"></i> Add Customer
          </button>

   
        </div>
        <hr>
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td> {{ customer.id }}</td>   
              <td>{{ customer.name }}</td>
              <td>{{ customer.address }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.contact }}</td>
              <td class="ms">
                <RouterLink :to="'/customer/' + customer.id" class="me-2">View</RouterLink>
                <button class="btn btn-primary me-1" @click="editCustomerModal(customer)">Edit</button>
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" 
      aria-hidden="true" v-for="customer in customers" :key="customer.id">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-danger text-white">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Customer</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this customer?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-danger"  @click="deleteCustomer(customer.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="modal fade" id="addCustomerModal" tabindex="-1" aria-labelledby="addCustomerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="addCustomerModalLabel">Add Customer</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="submitCustomerForm">
                <div class="mb-3">
                    <label for="name" class="form-label">Name:</label>
                    <input type="text" class="form-control" v-model="newCustomer.name" required>
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label">Address:</label>
                    <input type="text" class="form-control" v-model="newCustomer.address" required>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" v-model="newCustomer.email" required>
                </div>

                <div class="mb-3">
                    <label for="contact" class="form-label">Contact:</label>
                    <input type="tel" class="form-control" v-model="newCustomer.contact" required>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="submit" class="btn btn-secondary ms-2" data-bs-dismiss="modal">Close</button>
                </form>
            </div>
            </div>
        </div>
      </div>

      <div class="modal fade" id="editCustomerModal" tabindex="-1" aria-labelledby="editCustomerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-warning text-white">
                <h5 class="modal-title" id="editCustomerModalLabel">Edit Customer</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="submitEditForm">
                    <div class="mb-3">
                        <label for="editName" class="form-label">Name:</label>
                        <input type="text" class="form-control" v-model="editCustomer.name" required>
                    </div>

                    <div class="mb-3">
                        <label for="editAddress" class="form-label">Address:</label>
                        <input type="text" class="form-control" v-model="editCustomer.address" required>
                    </div>

                    <div class="mb-3">
                        <label for="editEmail" class="form-label">Email:</label>
                        <input type="email" class="form-control" v-model="editCustomer.email" required>
                    </div>

                    <div class="mb-3">
                        <label for="editContact" class="form-label">Contact:</label>
                        <input type="tel" class="form-control" v-model="editCustomer.contact" required>
                    </div>

                    <button type="submit" class="btn btn-warning">Update</button>
                    <button type="submit" class="btn btn-secondary ms-2" data-bs-dismiss="modal">Close</button>
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
  const newCustomer = ref({
    name: '',
    address: '',
    email: '',
    contact: '',
  });
  const editCustomer = ref({});
  
  //getting the data from the server
  const loadCustomers = async () => {
      const response = await axios.get('http://localhost:8000/api/clients');
      customers.value = response.data;
  };
  onMounted(loadCustomers);
  
  const addCustomer = () => {
    $('#addCustomerModal').modal('show');
  };
  
  const submitCustomerForm = async () => {
      const response = await axios.post('http://localhost:8000/api/clients', newCustomer.value);
      const createdCustomer = response.data;
      customers.value.push(createdCustomer);
      $('#addCustomerModal').modal('hide');
      newCustomer.value = {};

      loadCustomers();
  };
  
  const deleteCustomer = async (customerId) => {
      await axios.delete(`http://localhost:8000/api/clients/${customerId}`);
      customers.value = customers.value.filter((customer) => customer.id !== customerId);

      $('#deleteModal').modal('hide');
      loadCustomers();
  };
  
  const editCustomerModal = (customer) => {
    editCustomer.value = { ...customer };
    $('#editCustomerModal').modal('show');
  };
  
  const submitEditForm = async () => {
      const response = await axios.patch(`http://localhost:8000/api/clients/${editCustomer.value.id}`, editCustomer.value);
      const updatedCustomer = response.data;
  
      const index = customers.value.findIndex((customer) => customer.id === updatedCustomer.id);
      if (index !== -1) {
        customers.value[index] = updatedCustomer;
      }
  
      $('#editCustomerModal').modal('hide');
      editCustomer.value = {};
  
      loadCustomers();
  };
  </script>

  
  <style scoped>


  a{
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
  