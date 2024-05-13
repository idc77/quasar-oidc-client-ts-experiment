<template>
  <p>Processing signin callback</p>
</template>

<script setup>
import {inject} from "vue";
import {VueOIDCClientSymbol} from "src/plugins/VueOIDCClientSymbol.js";
import {useRouter} from "vue-router";

const manager = inject(VueOIDCClientSymbol)
const router = useRouter()
manager.signinCallback().finally(() => {
  router.push({name: 'index'})
})
</script>

<style scoped>

</style>
