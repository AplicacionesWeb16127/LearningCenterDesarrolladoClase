<script setup>
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import usePublishingStore from "../../application/publishing.store.js";
import {onMounted, toRefs} from "vue";
import {Button as PvButton, Column as PvColumn, DataTable as PvDataTable} from "primevue";

const {t} = useI18n();
const route = useRoute();

const store = usePublishingStore();

const {tutorials, tutorialsLoaded, errors} = toRefs(store);
const {fetchTutorials} = store;
onMounted(()=>{
      if (!store.tutorialsLoaded) {
        fetchTutorials();
        tutorialsLoaded.value  = store.tutorialsLoaded;
      }
    }
);
function navigateToEdit(){
  return 0;
}
function navigateToNew(){
  return 0;
}
</script>

<template>
<div>
   <h1> {{t('tutorials.title')}}</h1>
  <pv-button :label="t('tutorials.new')"
             icon="pi pi-plus" class="mb-3" @click="navigateToNew"/>

  <pv-data-table :value="tutorials"
  :loading="!tutorialsLoaded"
  table-style="min-width: 50rem"
  paginator
  :rows="5"
  :rowsPerPageOptions="[5,10,25]"
  striped-rows>
    <pv-column field="id" :header="t('tutorials.id')"  sortable/>
    <pv-column field="title" :header="t('tutorials.title')" sortable/>
    <pv-column field="summary" :header="t('tutorials.summary')" sortable/>
    <pv-column field="categoryId" :header="t('tutorials.category-id')" sortable/>
    <pv-column :header="t('tutorials.actions')">
      <template #body="slotProps">
        <pv-button icon="pi pi-pencil" text rounded @click="navigateToEdit(slotProps.data.id)" />
        <pv-button icon="pi pi-trash" text rounded severity="danger" @click="confirmDelete(slotProps.data)"/>
      </template>
    </pv-column>
  </pv-data-table>
  <div v-if="errors" class="p-error">
    {{t('errors.ocurred')}}:
    {{ errors.map(e=>message(e)).join(', ') }}
  </div>
</div>
</template>

<style scoped>

</style>