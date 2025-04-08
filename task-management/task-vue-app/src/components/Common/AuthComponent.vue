<template>
  <div class="auth-container">
    <h2>Authentication</h2>

    <!-- Email & Password Login -->
    <div class="auth-box">
      <h3>Email & Password Login</h3>
      <input v-model="email" type="email" placeholder="Enter your email" class="input-field" />
      <input v-model="password" type="password" placeholder="Enter your password" class="input-field" />
      <div class="button-group">
        <button @click="signUp" class="btn">Sign Up</button>
        <button @click="signIn" class="btn">Sign In</button>
      </div>
    </div>

    <!-- Google Sign-In -->
    <div class="auth-box">
      <h3>Google Sign-In</h3>
      <button @click="signInWithGoogle" class="google-btn">Sign in with Google</button>
    </div>

    <!-- Logged-in User Info -->
    <div v-if="user" class="user-info">
      <p>Welcome, {{ user.displayName || user.email }}</p>
      <!-- <img v-if="user.photoURL" :src="user.photoURL" alt="User Photo" class="user-photo" /> -->
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, provider } from "../../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const user = ref(null);

    // Check if a user is logged in
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

    const signIn = async () => {
      try {
        const result = await signInWithEmailAndPassword(auth, email.value, password.value);
        user.value = result.user;
        alert("User Logged In!");
        console.log("sign in", result, auth, provider);

      } catch (error) {
        console.error("Sign In Error:", error.message);
      }
    };

    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        user.value = result.user;
        alert("Google Sign-In Successful!", result);
      } catch (error) {
        console.error("Google Sign-In Error:", error.message);
      }
    };

    const logout = async () => {
      await signOut(auth);
      user.value = null;
      alert("User Logged Out!");
    };

    return { email, password, user, signUp, signIn, signInWithGoogle, logout };
  },
};
</script>

<style scoped>
/* Container */
.auth-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  background: #f8f9fa;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Authentication Box */
.auth-box {
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

/* Input Fields */
.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Button Group */
.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* Buttons */
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

/* Google Button */
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
