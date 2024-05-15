<template>
  <q-page padding>
    <div class="row justify-center">
      This doesn't work with authentik, but works with keycloak, likely also with zitadel and hydra.<br>
      Authentik doesn't sent CSP or X-FRAME-OPTIONS.<br>
      Open the side drawer to login or logout.<br>
      Change .env and .env.prod to adapt to your instance.<br>
      Sadly one requires to install @vueuse/core for the computedAsync feature, because oidc-client-ts only works with Promises.
    </div>

    <q-btn label="Login" @click="login"></q-btn><br>
    <q-btn label="Log" @click="log"></q-btn>
  </q-page>
</template>

<script setup>
import {VueOIDCClientSymbol} from "src/plugins/VueOIDCClientSymbol.js";
import {inject} from "vue";

defineOptions({
  name: 'IndexPage'
});

const manager = inject(VueOIDCClientSymbol)
function login() {
  manager.signinRedirect().then(res => {
    console.log(res)
  }).catch(err => console.log(err)).finally(() => {
    console.log('finally')
  });
}
function log() {
  console.log('access_token:', manager.getUser()?.access_token)
  manager.getUser().then(user => {
    console.log('user:',user)
  })
}
</script>
