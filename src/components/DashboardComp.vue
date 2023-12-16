<template>
    <div class="main">
        <div class="header p-3 h4 fw-bold">
            <span class="text-primary">Dashboard</span>
        </div>

        <section class="container mt-5">
            <div class="box1 bg-success">
                <div class="top p-2">
                    <p class="mt-5 ms-1 fs-4 fw-bold">CUSTOMERS</p>
                    <i class="fa-solid fa-users users"></i>
                </div>
            </div>
            <div class="box1 bg-warning">
                <div class="top p-2">
                    <p class="mt-5 ms-1 fs-4 fw-bold">CATEGORY</p>
                    <i class="fa-solid fa-list users"></i>
                </div>
            </div>
            <div class="box1 bg-primary">
                <div class="top p-2">
                    <p class="mt-5 ms-1 fs-4 fw-bold">PRODUCT</p>
                    <i class="fa-solid fa-bag-shopping users"></i>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>

    .container{
        display: flex;
        gap: 3rem;
    }
    .main{
        width: 100%;
        height: 100vh;
    }

    .header{
       box-shadow: 5px 3px 24px rgba(128, 128, 128, 0.21);
    }

    .box1{
        width: 25%;
        height: 20vh;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.201);
    }
    
    .top{
        width: 100%;
        position: relative;
    }

    .users{
        font-size: 5em;
        color: rgba(40, 36, 36, 0.422);
        position: absolute;
        right: 10px;
        top: 30px;
    }

    
</style>