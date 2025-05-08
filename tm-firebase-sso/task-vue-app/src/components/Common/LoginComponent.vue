<!-- src/components/Login.vue -->
 <template>
  <div class="auth-box">
    <h3>Email & Password Login</h3>
    <div class="form-group">
      <label class="label">Email</label>
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email address"
        class="input-field"
      />
    </div>

    <div class="form-group">
      <label class="label">Password</label>
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        class="input-field"
      />
    </div>
    <div class="button-group">
      <button @click="login" class="btn">login</button>
    </div>
  </div>
</template>

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

  sessionStorage.removeItem("jwt");
  authStore.setAuthentication(false);
  if (!email.value.trim() || !password.value) {
    alert("Email and password are required.");
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
    //window.location.href = '/Home';
    router.push("/Home");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.error || "Login failed");
  }
};
</script>

 <style scoped>
.auth-box {
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 435px;
}

.label {
  font-weight: 600;
  color: #333;
  margin: 10px;
  font-size: 20px;
}
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  margin: 30px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
