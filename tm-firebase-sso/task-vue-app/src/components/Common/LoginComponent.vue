<!-- src/components/Login.vue -->
 <template>
    <div class="auth-box">
      <h3>Email & Password Login</h3>
      <input v-model="email" type="email" placeholder="Enter your email" class="input-field" />
      <input v-model="password" type="password" placeholder="Enter your password" class="input-field" />
      <div class="button-group">
        <!-- <button @click="signUp" class="btn">Sign Up</button> -->
        <button @click="login" class="btn">login</button>
      </div>
    </div>
 </template>

 <script setup>
 import { ref } from 'vue';
 import axios from 'axios';

 const email = ref('')
 const password = ref('')

 const login = async () => {
      if (!email.value || !password.value) {
    alert("Email and password are required.");
    return;
  }
   try {
     const result = await axios.post('http://localhost:5000/api/auth/login', {
       email: email.value,
       password: password.value,
    })

     const jwt = result.data.jwt
     //localStorage.setItem('jwt', jwt);
     sessionStorage.setItem('jwt', jwt);
     console.log('Logged in successfully');
     console.log('jwt', jwt);
     alert('Logged in successfully');
   } catch (err) {
     console.error(err)
     alert('Login failed')
   }
 }
 </script>

 <style scoped>

 .auth-box {
  margin: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

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
}

.btn:hover {
  background-color: #0056b3;
}

 </style>
