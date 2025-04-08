<template>
  <div>
    <button @click="signInWithGoogle">Sign in with Google</button>
    <div v-if="user">
      <p>Welcome, {{ user.displayName }}</p>
      <!-- <img :src="user.photoURL" alt="User Photo" /> -->
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, provider } from "../../Firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default {
  setup() {
    const user = ref(null);

    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        user.value = result.user;
      } catch (error) {
        console.error("Google Sign-In Error:", error);
      }
    };

    const logout = async () => {
      await signOut(auth);
      user.value = null;
    };

    return { user, signInWithGoogle, logout };
  },
};
</script>
