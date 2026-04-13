<script>
import { useAuthStore } from '@/stores/authStore';

export default {
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
    };
  },
  computed: {
    isAuthenticated() {
        return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
    login() {
      this.authStore.login({email: this.email, password: this.password});
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Pet's Help</router-link></li>
        <li><router-link to="/services">Услуги</router-link></li>
        <li><router-link to="/about">О нас</router-link></li>
      </ul>
      <div v-if="isAuthenticated && user">
        Welcome, {{user.first_name}}
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <div>
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" required />
          </div>
          <button type="submit">Login</button>
          <p v-if="authError" class="error">{{authError}}</p>
        </form>
      </div>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>

nav {
  display: flex;
  gap: 32px;
  justify-content: space-between;
}
nav ul {
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0;
}
nav form {
  display: flex;
  gap: 8px;
}
.error {
  color: red;
}
</style>