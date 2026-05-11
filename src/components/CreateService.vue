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
      currentImage: null,
      imagePreview: null,
      deleteOldImage: false,
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
    },
    isEdit() {
      return !!this.$route.params.id;
    },
    serviceId() {
      return this.$route.params.id;
    }
  },
  watch: {
    serviceId: {
      handler(newId) {
        if (newId) {
          const service = this.dataStore.services.find(i => i.id == newId);
          if (service) {
            this.serviceName = service.name;
            this.serviceDescription = service.description;
            this.serviceCategory = service.category_id;
            this.servicePrice = service.price;
            this.serviceImage = null;
            this.currentImage = service.image_url;
            this.imagePreview = null;
            this.deleteOldImage = false;
          }
        } else {
          this.serviceName = '';
          this.serviceDescription = '';
          this.serviceCategory = '';
          this.servicePrice = '';
          this.serviceImage = null;
          this.currentImage = null;
          this.imagePreview = null;
          this.deleteOldImage = false;
        }
      },
      immediate: true
    }
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        this.serviceImage = file;
        this.imagePreview = URL.createObjectURL(file);
        this.deleteOldImage = false;
        document.getElementById('file-label').innerHTML = '<span class="pi pi-image mx-3"></span>' + file.name;
      }
    },
    removeImage() {
      if (this.imagePreview) {
        this.imagePreview = null;
        this.serviceImage = null;
        document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
      } else {
        this.deleteOldImage = true;
      }
    },
    async saveService() {
      const formData = new FormData();
      formData.append('name', this.serviceName);
      formData.append('description', this.serviceDescription);
      formData.append('price', this.servicePrice);
      formData.append('category_id', this.serviceCategory);
      if (this.serviceImage) {
        formData.append('image', this.serviceImage);
      } else if (this.deleteOldImage) {
        formData.append('delete_image', 'true');
      }
      if (this.isEdit) {
        await this.dataStore.update_service(formData, this.serviceId);
      } else {
        await this.dataStore.create_service(formData);
      }
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
    <form @submit.prevent="saveService" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgray">
        {{ isEdit ? 'Редактирование' : 'Добавление' }} услуги</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите название" v-model="serviceName"/>
        <InputText type="text" placeholder="Введите описание" v-model="serviceDescription" class="mt-2"/>
        <InputText type="number" placeholder="Введите цену" v-model="servicePrice" class="mt-2"/>
        <Select v-model="serviceCategory" :options="categories" optionLabel="name" optionValue="id"
                placeholder="Выберите категорию" class="mt-2"/>
      </div>
      <div class="mb-4 mt-4">
        <div v-if="(isEdit && currentImage && !deleteOldImage) || imagePreview" class="flex flex-col mb-3">
          <p class="text-xs text-gray-500 mb-1">{{ imagePreview ? 'Новое фото:' : 'Текущее фото:' }}
          </p>
          <div class="flex items-center gap-3">
            <img :src="imagePreview || currentImage" style="width: 60px; height: 60px;"/>
            <Button icon="pi pi-trash" text severity="danger" @click="removeImage"/>
          </div>
        </div>
        <div v-if="deleteOldImage && !imagePreview"
             class="text-xs text-red-500 mb-3 bg-red-50 p-2 rounded flex justify-between">
          <span>Картинка будет удалена после сохранения</span>
          <span class="cursor-pointer text-blue-600" @click="deleteOldImage = false">Вернуть</span>
        </div>
        <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border
        border-gray-300 rounded-md p-2">
          <span class="pi pi-upload mx-3"></span>Выбрать изображение</label>
        <input type="file" hidden id="file" name="file" @change="changeCaption"
               :required="!isEdit && !serviceImage" accept="image/*">
      </div>
      <div class="flex mt-6 gap-5">
        <Button type="submit" :label="isEdit ? 'Сохранить' : 'Создать'" class="flex-1"/>
        <Button type="button" label="Назад" class="flex-1"
                @click="$router.push('/services')"/>
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>

<style scoped>

</style>