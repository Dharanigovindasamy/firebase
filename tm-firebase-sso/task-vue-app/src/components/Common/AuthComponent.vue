<template>
  <div class="auth-container">
    <!-- <h2>Authentication</h2> -->

    <div class="auth-box">
  <h3>Email & Password Login</h3>

  <div class="form-group">
    <label class="label">Email</label>
    <input v-model="email" type="email" placeholder="Enter your email" class="input-field" />
  </div>

  <div class="form-group">
    <label class="label">Password</label>
    <input v-model="password" type="password" placeholder="Enter your password" class="input-field" />
  </div>

  <div class="button-group">
    <button @click="signUp" class="btn">Sign Up</button>
    <button @click="login" class="btn">Login</button>
  </div>
</div>


    <div class="auth-box">
      <h3>Google Sign-In</h3>
      <button @click="signInWithGoogle" class="google-btn">Sign in with Google</button>
    </div>

  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { auth, provider } from "../../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthStore } from "@/store/authStore"; 

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const user = ref(null);
    const authStore = useAuthStore();

    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
    });

    const signUp = async () => {
      try {
        const result = await createUserWithEmailAndPassword(auth, email.value, password.value);
        user.value = result.user;
        alert("User Registered!");
        console.log("sign up", result, auth, provider);
      } catch (error) {
        console.error("Sign Up Error:", error.message);
      }
    };

    const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    console.log('idToken', idToken);

    const response = await axios.post('http://localhost:5000/api/auth/firebase-login', {
      uid: user.uid,
      email: user.email,
      idToken: idToken
    })

    const jwt = response.data.jwt
    localStorage.setItem('jwt', jwt)
    alert('Logged in successfully')
    authStore.setAuthentication(true); 
    window.location.href = '/Home';
    
  } catch (err) {
    console.error(err)
    alert('Login failed')
  }
}

    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        user.value = result.user;
        const idToken = await result.user.getIdToken();
        console.log('sso idToken', idToken);
        console.log("sign in with google", result.user.uid, result.user.email);
      const response = await axios.post('http://localhost:5000/api/auth/sso-login', {
      uid: result.user.uid,
      email:  result.user.email,
      idToken: idToken
    })

    const jwt = response.data.jwt;
    console.log('jwt', jwt);
    //localStorage.setItem('jwt', jwt); 
    sessionStorage.setItem('jwt', jwt);
    authStore.setAuthentication(true); 
    alert("Google Sign-In Successful!", result);
    window.location.href = '/Home';
      } catch (error) {
        console.error("Google Sign-In Error:", error.message);
      }
    };

    const logout = async () => {
      await signOut(auth);
      user.value = null;
      authStore.setAuthentication(false); 
      sessionStorage.removeItem('jwt');
      alert("User Logged Out!");
    };

    return { email, password, user, signUp, login, signInWithGoogle, logout };
  },
};
</script> 

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  background: #f8f9fa;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.auth-box {
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.label {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}


.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.label {
  font-weight: bold;
  color: #333;
  margin: 10px 0px 10px 0px;
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

.google-btn {
  background-color: #db4437;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

.google-btn:hover {
  background-color: #c1351d;
}

/* User Info */
.user-info {
  margin-top: 20px;
  padding: 15px;
  background: #e9f7ef;
  border-radius: 8px;
  text-align: center;
}

.user-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 10px;
}

/* Logout Button */
.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  margin-top: 10px;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style> 
