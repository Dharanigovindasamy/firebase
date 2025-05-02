<template>
  <div class="password-reset-container">
    <h2 class = "forgot-password">Forgot Password</h2>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label class="label" for="email">Email:</label>
        <input
          class="input-field"
          type="email"
          v-model="email"
          id="email"
          placeholder="Enter your email address"
          required
        />
      </div>

      <div class="button-group">
        <button class="btn-next" @click="handleNext">Next</button>
        <button class="btn-back" @click="handleBack">Back</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const route = useRouter();
const email = ref("");

const handleNext = () => {
    if (!email.value) {
        alert("Please enter your email address");
        return;
    }
  route.push({ path: "/forgot-password", query: { email: email.value } });
  console.log("Next button clicked");
};

const handleBack = () => {
  route.push("/");
  console.log("Back button clicked");
};
</script>

<style scoped>
.password-reset-container {
  height : 450px;
  max-width: 500px;
  margin: 35px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.label {
  /* font-weight: 600; */
  color: #333;
  margin: 10px;
}

.forgot-password{
  margin: 35px;

}
.input-field {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  /* border-radius: 15px; */
  font-size: 16px;
  /* margin: 20px; */
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 90px;
  margin-top: 20px;
}

.btn-next {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-back {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>