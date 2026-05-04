<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Toast from 'primevue/toast';
import {useDataStore} from "@/stores/dataStore.js";
export default {
  components: {InputText, Button, Toast, Select},
  data() {
    return {
      dataStore: useDataStore(),
      serviceName: '',
      serviceDescription: '',
      servicePrice: '',
      serviceCategory: '',
      serviceImage: null,
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage;
    },
    errorCode() {
      return this.dataStore.errorCode;
    },
    categories() {
      return this.dataStore.categories;
    }
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-image mx-3"></span>' + file.name;
        this.serviceImage = file;
      }
      else {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.serviceImage = null;
      }
    },
    async createService() {
      const formData = new FormData();
      formData.append('name', this.serviceName);
      formData.append('description', this.serviceDescription);
      formData.append('price', this.servicePrice);
      formData.append('category_id', this.serviceCategory);
      formData.append('image', this.serviceImage);
      await this.dataStore.create_service(formData);
      if (this.errorCode > 0) {
        this.$toast.add({severity:'error', summary:"Ошибка добавления данных", detail:this.errorMessage, life:4000});
      } else {
        this.$toast.add({severity:'success', summary:"Данные успешно добавлены", detail:this.errorMessage, life:4000});
        setTimeout(() => {
          this.$router.push('/services');
        }, 1500);
      }
    },
  },
  mounted() {
    this.dataStore.get_categories();
  },
}
</script>

<template>
  <div class="flex justify-center">
    <form @submit.prevent="createService" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgray">Добавление услуги</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите название" v-model="serviceName"/>
        <InputText type="text" placeholder="Введите описание" v-model="serviceDescription" class="mt-2"/>
        <InputText type="number" placeholder="Введите цену" v-model="servicePrice" class="mt-2"/>
        <Select v-model="serviceCategory" :options="categories" optionLabel="name" optionValue="id"
                placeholder="Выберите категорию" class="mt-2"/>
      </div>
      <div class="mb-4 mt-4">
        <label for="file" id="file-label" class="block text-mb font-medium text-gray-500 border border-gray-300 rounded-mb p-2">
          <span class="pi pi-upload mx-3"></span>Выбрать изображение
        </label>
        <input type="file" class="hidden" id="file" name="file" @change="changeCaption" accept="image/*">
      </div>
      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать"/>
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>

<style scoped>

</style>