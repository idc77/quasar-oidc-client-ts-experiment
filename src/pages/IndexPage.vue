<template>
  <q-page padding>
    It works<br>
    <q-btn label="Login" @click="login"></q-btn><br>
    <q-btn label="Log" @click="log"></q-btn>
    {{manager?.getUser().access_token}}
  </q-page>
</template>

<script setup>
import {VueOIDCClientSymbol} from "src/plugins/VueOIDCClientSymbol.js";
import {inject} from "vue";

defineOptions({
  name: 'IndexPage'
});

const OIDCSymbol = VueOIDCClientSymbol
const manager = inject(VueOIDCClientSymbol)
console.log(manager)
function login() {
  manager.signinRedirect().then(res => {
    console.log(res)
  }).catch(err => console.log(err)).finally(() => {
    console.log('finally')
  });
}
function log() {
  console.log(manager)
  console.log(manager.getUser())
  console.log(manager.getUser()?.access_token)
  manager.getUser().then(user => {
    console.log(user)
  })
}
</script>
