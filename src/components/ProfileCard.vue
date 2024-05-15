<template>
  <q-card v-if="user" flat>
    <q-card-section>
      {{user.profile.name}}
    </q-card-section>
    <q-card-actions>
      <!--<q-btn flat :to="{name: 'profile-preferences'}">Settings</q-btn>-->
      <q-btn flat @click="logout">Logout</q-btn>
    </q-card-actions>
  </q-card>
  <q-card v-else>
    <q-btn @click="login" class="full-width">Login</q-btn>
  </q-card>
</template>

<script setup>
import {inject} from "vue";
import {VueOIDCClientSymbol} from "src/plugins/VueOIDCClientSymbol.js";
import {computedAsync} from "@vueuse/core";

const manager = inject(VueOIDCClientSymbol)
const user = computedAsync(
  async () => {
    return await manager.getUser()
  },
  null
)

function login() {
  manager.signinRedirect()
}

function logout() {
  manager.signoutRedirect()
}
</script>

<style scoped>

</style>
