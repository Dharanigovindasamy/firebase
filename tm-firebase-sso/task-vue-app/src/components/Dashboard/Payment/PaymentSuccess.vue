<template>
  <div class="payment-status-container">
    <img src="@/assets/payment-success.png" alt="Success" class="status-img" />
    <h1>Payment Successful!</h1>
    <p>Your payment was processed successfully. Thank you!</p>
  </div>
</template>

<script setup>
// No script needed for this simple success page
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
.status-img {
  width: 120px;
  margin-bottom: 24px;
}
h1 { font-size: 2.2rem; margin-bottom: 20px; }
</style>
