<template>
  <div class="main-container">
   
     <div class="bg-dark text-white main" style="min-width: 15%; height: 100vh;">
   
       <div class="close">
         <h4>Inventory</h4>
       </div>
   
       <nav class="container mt-4 fs-5">
         <div class="item my-3">
           <i class="fa-solid fa-gauge-simple-high dash"></i>
           <RouterLink to="/" class="p-2">Dashboard</RouterLink>
         </div>
         <div class="item my-3">
           <i class="fa-solid fa-circle-user"></i>
           <RouterLink to="/customer" class="p-2">Customer</RouterLink>
         </div>
         <div class="item my-3">
          <i class="fa-solid fa-list"></i>
           <RouterLink to="/category" class="p-2">Category</RouterLink>
         </div>
         <div class="item my-3">
          <i class="fa-solid fa-tag"></i>
           <RouterLink to="/product" class="p-2">Product</RouterLink>
         </div>
       </nav>
     </div> 

     <div class="content">
        <RouterView></RouterView>
     </div>

  </div>

</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';


</script>


<style scoped>

.main-container{
  display: flex;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
}

.content{
  width: 100%;
}

.close{
  width: 100%;
  padding: 10px;
  align-items: center;
}

.close h4{
  font-weight: bold;
  text-align: center;
}

nav{
  width: 90%;
  display: flex;
  flex-direction: column;
}

nav .item{
  display: flex;
  align-items: center;
  line-height: 15px;
  border-radius: 10px;

}
nav a{
  text-decoration: none;
  color: #8d8b8b;
}
.item i{
  color: #8d8b8b;
  margin-right: 5px;
}



nav .item:hover a,
nav .item:hover i{
  color: #fff;
  transition: all .35s ease;
}


nav .item a:focus{ 
  color: #fff;
  transition: all .35s ease;
}

</style>