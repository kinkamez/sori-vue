<template>
  <navig/>
  <add/>
  <list/>
  <logo/>
</template>

<script>
import store from "@/store";
import navig from "./components/menu.vue";
import add from "./components/add.vue";
import list from "./components/list.vue";
import logo from "./components/footer.vue";

import { provide } from "vue";

export default {
  components: {
    navig,
    add,
    list,
    logo,
  },
  setup() {
    provide("store", store);
  },
};
</script>
