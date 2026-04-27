<script>
import { useAuthStore } from '@/stores/authStore';
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";

export default {
  components: {Button, InputText, Menubar},
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: "Pet's Help",
          icon: 'pi pi-fw pi-home',
          route: '/',
        },
        {
          label: 'Услуги',
          icon: 'pi pi-fw pi pi-list',
          route: '/services',
        },
        {
          label: 'Врачи',
          icon: 'pi pi-fw pi pi-user-plus',
          route: '/medworkers',
        },
        {
          label: 'О Нас',
          icon: 'pi pi-fw pi-sort-down-fill',
          route: '/about',
        },
      ],
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
  <Menubar :model="items">
    <template #start>
        <img src="@/assets/logo_icon.png" width="50" alt="iconlogo" class="logo" />
    </template>
    <template #item="{ item }">
      <router-link v-if="item.route" :to="item.route" class="flex items-center ml-4 p-4">
        <span :class="item.icon"/>
        <span class="ml-1">{{item.label}}</span>
      </router-link>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-fw pi-user mr-4"/> {{user.first_name}}
          <Button @click="logout" class="ml-4">Выйти</Button>
        </div>
        <div v-else>
          <form @submit.prevent="login">
            <InputText v-model="email" type="email" id="email" required placeholder="Логин" class="m-2 sm:w-auto"
                       :class="{'p-invalid': authError}"/>
            <InputText v-model="password" type="password" id="password" required placeholder="Пароль" class="m-2 sm:w-auto"
                       :class="{'p-invalid': authError}"/>
            <Button type="submit">Войти</Button>
            <div class="ml-2"><small v-if="authError" class="error">{{authError}}</small></div>
          </form>
        </div>
      </div>
    </template>
  </Menubar>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
.error {
  color: red;
}
@media (max-width: 960px) {
  .logo {
    display: none;
  }
}
</style>