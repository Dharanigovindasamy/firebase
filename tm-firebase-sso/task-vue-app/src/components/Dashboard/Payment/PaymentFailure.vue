<template>
  <div class="payment-status-container">
    <img src="@/assets/payment-failure.png" alt="Failure" class="status-img" />
    <h1>Payment Failed</h1>
    <p>Sorry, your payment could not be processed. Please try again or contact support.</p>

    <button class = "try-again-button" @click="handlePaymentFailure">Try Again</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handlePaymentFailure = () => {
  router.push('/task');
};
</script>

<style scoped>
.payment-status-container {
  max-width: 500px;
  margin: 100px auto;
  padding: 40px;
  background: #fff0f0;
  border-radius: 12px;
  text-align: center;
  color: #dc3545;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}
.status-img {
  width: 120px;
  margin-bottom: 24px;
}
h1 { font-size: 2.2rem; margin-bottom: 20px; }

.try-again-button {
    background-color: #dc3545;
    margin: 20px;
    color: #fff;
    border: none;
    padding: 20px 20px;
    border-radius: 5px;
    cursor: pointer;
}
</style>

