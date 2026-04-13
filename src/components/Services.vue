<template>
  <div class="services">
    <h2>Наши услуги</h2>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
    <ul v-else>
      <li v-for="service in services" :key="service.id">
        {{ service.name }} ({{ service.category.name }})<br/>
        {{ service.description }}<br/>
        Цена: {{ service.price }} руб.
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      services: [],
      loading: false,
      errorMessage: "",
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/services');
      this.services = response.data;
    } catch (error) {
      this.errorMessage = 'Не удалось загрузить услуги';
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
h2 {
  margin: 20px 0;
  text-align: center;
}
.error {
  color: red;
}
</style>