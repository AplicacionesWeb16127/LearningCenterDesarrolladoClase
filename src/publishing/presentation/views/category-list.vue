<script setup>
import {useI18n} from "vue-i18n";
import usePublishingStore from "../../application/publishing.store.js";
import {toRefs, onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {useConfirm} from "primevue";

const confirm = useConfirm();
const {t} = useI18n();
const store = usePublishingStore();
const {categories, errors, categoriesLoaded } = toRefs(store);
const {fetchCategories, deleteCategory} = store;
const router = useRouter();

onMounted(() => {
  if (!store.categoriesLoaded) {
    fetchCategories();
    categoriesLoaded.value = store.categoriesLoaded;
  }
});

const navigateToNew = () => {
  router.push({name: 'publishing-category-new'});
  // Navigate to the new category creation page
};
const navigateToEdit = (id) => {
  router.push({name: 'publishing-category-edit', params: {id}});
  // Navigate to the category editing page
};
const confirmToDelete = (category) => {
  confirm.require(
      {
        message: t('categories.confirm-delete', {name: category.name}),
        header: t('categories.delete-header'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          deleteCategory(category);

        },
      }
  );

}
</script>

<template>
<div>
  <h1>{{t('categories.title')}}</h1>
  <pv-button :label="t('categories.new')" icon="pi pi-plus" @click="navigateToNew"></pv-button>
  <pv-data-table
    :value="categories"
    :loading="!categoriesLoaded"
    :rows="5"
    :rows-per-page-options="[5, 10, 20]"
    paginator
    striped-rows
    table-style="min-width: 50rem">
    <pv-column :header="t('categories.id')" field="id" sortable></pv-column>
    <pv-column :header="t('categories.name')" field="name" sortable></pv-column>
    <pv-column :header="t('categories.actions')">
      <template #body="slotProps">
        <pv-button icon="pi pi-pencil" class="mr-2" @click="navigateToEdit( slotProps.data.id)"/>
        <pv-button icon="pi pi-trash" class="p-button-danger" @click="confirmToDelete(slotProps.data)"/>
      </template>
    </pv-column>
  </pv-data-table>
  <pv-confirm-dialog/>
</div>
</template>

<style scoped>

</style>