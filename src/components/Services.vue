<script>
import DataView from "primevue/dataview";
import Card from "primevue/card";
import Button from 'primevue/button';
import { useDataStore } from '@/stores/dataStore';
import Dialog from 'primevue/dialog';
import { useAuthStore } from '@/stores/authStore.js';

export default {
  components: {DataView, Card, Button, Dialog},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 3,
      offset: 0,
      selectedService: null,
      showDialog: false,
      authStore: useAuthStore(),
    }
  },
  computed: {
    isAdmin() {
      return this.authStore.user?.is_admin === 1;
    },
    services() {
      return this.dataStore.services;
    },
    services_total() {
      return this.dataStore.services_total;
    }
  },
  async mounted() {
    console.log('Services component MOUNTED!');
    await this.dataStore.get_services();
    await this.dataStore.get_services_total();
    console.log('Services=', this.services);
  },
  methods: {
    openDialog(service) {
      this.selectedService = service;
      this.showDialog = true;
    },
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_services(
          this.offset / this.perpage, this.perpage
      );
    }
  }
}
</script>

<template>
  <div class="services">
    <h2>Наши услуги</h2>
  </div>
  <DataView
      :value="services"
      :lazy="true"
      :rows="perpage"
      :rowsPerPageOptions="[3, 6, 9]"
      :totalRecords="services_total"
      :paginator="true"
      @page="onPageChange">
    <template #list="slotProps">
      <div class="flex flex-wrap gap-4 justify-center p-4">
        <Card v-for="service in slotProps.items" :key="service.id" style="width: 320px;">
          <template #header>
            <div class="flex justify-center pt-4">
              <img :src="service.image_url" alt="image" style="width: 80px; height: 80px;"/>
            </div>
          </template>
          <template #title>{{service.name}}</template>
          <template #subtitle>{{service.category.name}}</template>
          <template #content>
            <p style="color: green; font-weight: bold;">{{service.price}} руб.</p>
          </template>
          <template #footer>
            <div class="flex flex-col gap-2">
              <Button label="Подробнее" severity="info" variant="outlined" class="w-full" icon="pi pi-info-circle"
                      @click="openDialog(service)"/>
              <div v-if="isAdmin" class="flex gap-2">
                <Button label="Изменить" severity="secondary" variant="outlined" class="w-full" icon="pi pi-pencil"/>
                <Button label="Удалить" class="w-full" icon="pi pi-trash"/>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </template>
  </DataView>
  <Dialog v-model:visible="showDialog" :header="selectedService?.name" modal
          :style="{ width: '50vw' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <p v-if="selectedService" class="m-0">{{selectedService.description}}</p>
  </Dialog>
  <div v-if="isAdmin" class="flex justify-end p-4">
    <Button icon="pi pi-plus" label="Добавить услугу" @click="$router.push('/createService')"/>
  </div>
</template>

<style scoped>
h2 {
  margin: 20px 0;
  text-align: center;
}
:deep(.p-card-title) {
  height: 60px;
  overflow: hidden;
}
</style>