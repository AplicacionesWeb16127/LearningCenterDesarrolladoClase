<script setup>
import {useI18n} from "vue-i18n";
import {useRouter, useRoute} from "vue-router";
import {onMounted, toRefs, ref, computed} from "vue";
import usePublishingStore from "../../application/publishing.store.js";
import {Category} from "../../domain/model/category.entity.js"

const store = usePublishingStore();
const {categories, errors} = toRefs(store);
const {addCategory, getByCategoryById, updateCategory} = store;
const router=useRouter();
const route= useRoute();
const {t} = useI18n();
const form = ref({name: ''});
const isEdit = computed(() => !!route.params.id);

const saveCategory = () =>{
  const category = new Category({
    id: isEdit.value ? route.params.id : null,
    name: form.value.name,
  });
  if (isEdit.value) updateCategory(category);
  else addCategory(category);
  navigateToBack()
}
const navigateToBack = () => {
  router.push({name: 'publishing-categories'});
}

onMounted(()=>{
  if (isEdit.value) {
    const category = getByCategoryById(route.params.id);

    if (category) form.value.name = category.name;
    else
      router.push({name: 'publishing-categories'});
  }
})
</script>

<template>
  <h1> {{  t('category.new-title')}}</h1>
  <form @submit.prevent="saveCategory">
    <div class="field mb-3">
      <label for="name">{{ t('category.name') }}</label>
      <input id="name" type="text" v-model="form.name" class="p-inputtext p-component p-filled w-full" required />
    </div>
    <div class="flex gap-2">
      <pv-button :label="t('category.save')" icon="pi pi-check" type="submit"/>
      <pv-button :label="t('category.cancel')" icon="pi pi-times" class="p-button-secondary" @click="navigateToBack"/>
    </div>
  </form>

</template>

<style scoped>

</style>