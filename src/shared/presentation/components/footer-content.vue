<script setup>
import {useI18n} from "vue-i18n";
const {t} = useI18n();
</script>

<template>
<footer class ="absolute bottom-0 w-full border-none bg-primary, mt-4 border-round shadow-1">
  <div class="flex justify-center items-center">
    <p class="m-0 text-sm font=medium">
      CopyRight 2026 ACME Studios
    </p>
    <p class="m-0 text-sm font=medium">
      {{t('authoring-phrase.intro')}}
      <i class="pi pi-heart text-pink-300"></i>
      {{t('authoring-phrase.use')}}
      <a href="https://primevue.org"
         class="text-primary font-bold hover:underline"
        target="_blank">PrimeVue</a>
      {{t('authoring-phrase.author', {brand: 'ACME Studios'})}}
    </p>

  </div>
</footer>
</template>

<style scoped>

</style>