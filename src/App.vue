/* eslint-disable no-unused-vars */
<template>
  <navig/>
  <add/>
<auth />
  <list/>
  <logo/>
</template>

<script>
import store from "@/store";
import navig from "./components/menu.vue";
import add from "./components/add.vue";
import list from "./components/list.vue";
import logo from "./components/footer.vue";
import auth from "./components/auth.vue";
import { provide } from "vue";




export default {
  components: {
    navig,
    add,
    list,
    logo,
    auth,
  },
  setup() {
    provide("store", store);
  },
};
</script>
