<script>
import DataView from "primevue/dataview";
import Card from "primevue/card";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ConfirmPopup from 'primevue/confirmpopup';
import { useDataStore } from '@/stores/dataStore';
import Dialog from 'primevue/dialog';
import { useAuthStore } from '@/stores/authStore.js';

export default {
  components: {DataView, Card, Button, Dialog, InputText, Toast, ConfirmPopup},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 3,
      offset: 0,
      selectedService: null,
      showDialog: false,
      authStore: useAuthStore(),
      search: ""
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
    },
    error_code() {
      return this.dataStore.errorCode
    },
    error_message() {
      return this.dataStore.errorMessage;
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
    },
    onPushSearchButton() {
      this.dataStore.get_services_total(this.search);
      this.dataStore.get_services(undefined, undefined, this.search);
    },
    async deleteService(id) {
      await this.dataStore.delete_service(id);
      if (this.error_code > 0) {
        this.$toast.add({severity: 'error', summary: 'Ошибка удаления услуги' + id,
          detail: this.error_message + " " +this.error_code, life: 4000});
      } else {
        this.$toast.add({severity: 'success', summary: 'Услуга ' + id + " успешна удалена",
          detail: this.error_message + " " +this.error_code, life: 4000});
      }
      this.dataStore.get_services(this.offset / this.perpage, this.perpage, this.search);
    },
    openConfirmPopup(event, data) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить услугу ' + data.id + '?',
        icon: 'pi pi-exclamation-circle',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        accept: () => {
          this.deleteService(data.id);
        }
      })
    },
  }
}
</script>

<template>
  <DataView
      :value="services"
      :lazy="true"
      :rows="perpage"
      :rowsPerPageOptions="[3, 6, 9]"
      :totalRecords="services_total"
      :paginator="true"
      @page="onPageChange">
    <template #header>
      <InputText v-model="search" type="text" id="search" required placeholder="Наименование"
                 class="m-2 sm:w-auto"/>
      <Button type="button" @click="onPushSearchButton" icon="pi pi-search" label="Найти"/>
    </template>
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
                <Button label="Изменить" severity="secondary" variant="outlined" class="w-full" icon="pi pi-pencil"
                        @click="$router.push('/createService/' + service.id)"/>
                <Button label="Удалить" class="w-full" icon="pi pi-trash"
                        @click="openConfirmPopup($event, service)"/>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </template>
  </DataView>
  <ConfirmPopup></ConfirmPopup>
  <Toast></Toast>
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
:deep(.p-card-title) {
  height: 60px;
  overflow: hidden;
}
</style>