<template>
  <div class="payment-status-container">
    <img src="@/assets/payment-success.png" alt="Success" class="status-img" />
    <h1>Payment Successful!</h1>
    <p>Your payment was processed successfully. Thank you!</p>
    <div>
    <div v-if="loading" class="loading-overlay">
      <img src="@/assets/Loading.gif" alt="Loading..." class="loading-gif" />
    </div>
    <div v-else>
      <button class = "sucess-back-button" @click="handlePaymentSuccess">Go to Home</button>
    </div>
  </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/routes/index.js";
// import loading from "@/assets/Loading.gif";
const loading = ref(false);

const handlePaymentSuccess = async () => {
  loading.value = true; 
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    alert("Payment successful!");
    router.push("/Task");
  } catch (error) {
    console.error("Payment error:", error);
  } finally {
    loading.value = false; 
  }
};

</script>

<style scoped>
.payment-status-container {
  max-width: 500px;
  margin: 100px auto;
  padding: 40px;
  background: #e6fff2;
  border-radius: 12px;
  text-align: center;
  color: #28a745;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}


.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-gif {
  width: 100px;
  height: 100px;
}

.sucess-back-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 20px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 20px;
  
}

.status-img {
  width: 120px;
  margin-bottom: 24px;
}
h1 { font-size: 2.2rem; margin-bottom: 20px; }
</style>
