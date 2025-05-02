<template>
  <div>
    <form @submit.prevent="handleSubmit" class="forgot-password-form">
      <h2>Reset Password</h2>
      <div class="form-group">
        <label class = "label">New password :</label>
        <input
          class = "input-field"
          type="password"
          v-model="password"
          placeholder="Enter your new password"
          required
        />
      </div>

      <div class="form-group">
        <label class = "label">Confirm new password :</label>
        <input
          class = "input-field"
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm your new password"
          required
        />
      </div>
      <button class="submit" type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const email = ref(route.query.email);  
const password = ref("");
const confirmPassword = ref("");

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    console.log("Sending password reset request to:", email.value);
    console.log("Password:", password.value);
    console.log("Confirm Password:", confirmPassword.value);
    const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {
      Email: email.value,
      NewPassword: password.value,
      ConfirmPassword: confirmPassword.value
    });

    console.log("Password reset response:", response.data);
    alert("Password reset successful");
    router.push("/login");
  } catch (error) {
    console.error("Password reset failed:", error);
    alert("Failed to reset password. Please try again.");
  }
};
</script>

<style scoped>

.forgot-password-form {
    max-width: 600px;
    margin: 30px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.form-group {
    display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  margin: 10px 0px 10px 0px;

}

.submit{
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 30%;
    margin: 30px auto;
}

.label {
    font-weight: bold;
    color: #333;
    margin: 10px 0px 10px 0px;
    padding: 10px;
}


.input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;

}
</style>