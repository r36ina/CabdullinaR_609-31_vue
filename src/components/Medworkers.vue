<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore';

export default {
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    medworkers() {
      return this.dataStore.medworkers;
    },
    medworkers_total() {
      return this.dataStore.medworkers_total;
    }
  },
  mounted() {
    console.log('Medworkers component MOUNTED!');
    this.dataStore.get_medworkers();
    this.dataStore.get_medworkers_total();
    console.log('Medworkers=', this.medworkers);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_medworkers(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>

<template>
  <div class="medworkers">
    <h2>Наши Врачи</h2>
  </div>
  <DataTable
      :value="medworkers"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5]"
      :totalRecords="medworkers_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset">
    <Column field="first_name" header="Имя"/>
    <Column field="last_name" header="Фамилия"/>
    <Column field="job_title" header="Должность"/>
    <Column field="email" header="Email"/>
  </DataTable>
</template>

<style scoped>
h2 {
  margin: 20px 0;
  text-align: center;
}
</style>