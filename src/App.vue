<template>
  <add />
  <list />
  <a href="https://www.themoviedb.org/"
    ><img
      class="mb-2"
      style="width: 25%"
      src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
  /></a>
</template>

<script>
import store from "@/store";

import list from "./components/list.vue";
import add from "./components/add.vue";

// eslint-disable-next-line no-unused-vars

import { provide } from "vue";
// import func from "vue-editor-bridge";
// import fs from 'fs'
// import { readSync, ABSOLUTE_PATHS, CASELESS_SORT } from 'readdir';


// const fs = require('fs');
// import * as fs from 'fs';F
// const path = require('path');

export default {
  components: {
    add,
    list,
  },
  setup() {
    provide("store", store);

    

    return {};
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
