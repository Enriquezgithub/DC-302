<template>
    <div class="main">
        <div class="header p-3 h4 fw-bold">
          <span class="text-primary">Customer - Details</span>
        </div>

        <button class="btn btn-outline-primary mx-2" @click="back">Back</button>

        <div class="container shadow mx-5 my-2">
            <div class="image shadow">
                <i class="fas fa-user"></i>
            </div>

            <div class="content">
                <p><span>Name:</span> {{ clients.name  }}</p>
                <p><span>Address:</span>  {{ clients.address  }}</p>
                <p><span>Email:</span> {{ clients.email  }}</p>
                <p><span>Contact:</span>  {{ clients.contact  }}</p>
            </div>
        </div>
    </div>




    
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter} from 'vue-router'

const clients = ref({})
const route = useRoute()
const router = useRouter()

const id = route.params.clientId

const back = ()=>{
    router.push('/customer')
}

onMounted(()=> {
    fetch('http://localhost:8000/api/clients/' + id)
    .then(response=>response.json().then((data)=>clients.value=data))
})

</script>

<style scoped>

span{
    font-weight: bold;
}

.content{
    font-size: 1.2em;
    margin: 10px;
}
  .main {
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.775);
  }

  .header {
    box-shadow: 5px 3px 24px rgba(128, 128, 128, 0.21);
  }

  .container{
    background-color: rgb(255, 255, 255);
    padding: 10px;
    width: 50vw;
    height: 70vh;
  }
  .image{
    background-color: rgb(255, 255, 255);
    width: 13vw;
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  i{
    font-size: 5em;
  }
</style>