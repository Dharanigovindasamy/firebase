<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com)$/i;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (!email.value.trim() || !password.value.trim()) {
    alert("Email and password are required.");
    return;
  }

  if (!emailRegex.test(email.value)) {
    alert("Please enter a valid email ending with .com");
    return;
  }

  if (password.value.length > 15) {
    alert("Password should not exceed 15 characters.");
    return;
  }

  if (!specialCharRegex.test(password.value)) {
    alert("Password must contain at least one special character.");
    return;
  }

  try {
    const result = await axios.post("http://localhost:5000/api/auth/login", {
      email: email.value,
      password: password.value,
    });

    const jwt = result.data.jwt;
    sessionStorage.setItem("jwt", jwt);
    console.log("Logged in successfully", jwt);
    alert("Logged in successfully");
    authStore.setAuthentication(true);
    router.push("/Home");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.error || "Login failed");
  }
};


const signUp = () => {
  sessionStorage.removeItem("jwt");
  authStore.setAuthentication(false);
  router.push("/FirebaseSignIn");
};

const handleForgotPassword = () => {
  router.push("/PasswordReset");
};
</script>

<template>
  <div class="dashboard-header">
    <div class="dashboard-container">
      <div class="left-panel">
        <img
          src="@/assets/task-bg.jpg"
          alt="Dashboard Background"
          class="background-image"
        />
        <div class="overlay">
          <h1 class="welcome-text">Welcome to Task Management</h1>
        </div>
      </div>

      <div class="right-panel">
        <div class="form-container">
          <h2 class="form-title">Login</h2>

          <div class="form-group">
            <!-- <label class="label">Email</label> -->
            <input
              v-model="email"
              type="email"
              placeholder="email"
              class="input-field"
            />
          </div>

          <div class="form-group">
            <!-- <label class="label">Password</label> -->
            <input
              v-model="password"
              type="password"
              placeholder="password"
              class="input-field"
            />
          </div>

            <div class="forgot-password" @click="handleForgotPassword">
                <a href="#">Forgot Password?</a>
            </div>

          <b-button @click="login" class="btn">Login</b-button>

          <div class="divider">OR</div>

          <b-button @click="signUp" class="btn-outline"
            >Firebase Sign-In</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  padding: 10px 20px;
}
.navbar-content {
  display: flex;
  align-items: center;
}
.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.navbar-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
}

.dashboard-container {
  display: flex;
  /* height: calc(100vh - 70px); */
}

.left-panel {
  width: 60%;
  position: relative;
  overflow: hidden;
}
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.welcome-text {
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
}

.right-panel {
  width: 40%;
  background: #f9fafb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.form-container {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-title {
  font-size: 28px;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
}

.input-field {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}
.btn:hover {
  background-color: #0056b3;
}
.btn-outline {
  background: transparent;
  border: 2px solid #007bff;
  color: #007bff;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}
.btn-outline:hover {
  background: #007bff;
  color: #ffffff;
}

.divider {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  margin: 10px 0;
  position: relative;
}
</style>
