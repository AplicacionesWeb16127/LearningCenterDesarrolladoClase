<script setup>
import langSwitcher from "./language-switcher.vue";
import FooterContent from "./footer-content.vue";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {Drawer as PvDrawer} from "primevue";
const {t} = useI18n();

const drawer = ref(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
}
const items =[
  {label : 'option.home', to:'/home'},
  {label : 'option.about', to:'/about'},
  {label : 'option.categories', to:'/publishing/categories'},
  {label : 'option.tutorials', to:'/publishing/tutorials'},
];
</script>
<template>
  <header class="absolute top-0 left-0 w-full">
    <pv-toolbar class="bg-primary">
      <template #start>
        <pv-button icon="pi pi-bars" class="mr-2" @click="toggleDrawer" />
        <h3> ACME Learning Center</h3>
      </template>
      <template #end>
        <div class="flex-column mr-3">
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">{{t(item.label)}}</router-link>
          </pv-button>
        </div>
        <lang-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
<main class="mt-7">
  <router-view/>
</main>
  <footer-content/>
</template>

<style scoped>

</style>