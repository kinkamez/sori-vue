<template>

  <add />
  <list />
<a href="https://www.themoviedb.org/" ><img class="mb-2" style="width: 25%; " src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"></a>
</template>

<script>
import store  from "@/store";

import list from "./components/list.vue";
import add from "./components/add.vue";

// eslint-disable-next-line no-unused-vars



import {  provide} from "vue";
// import fs from 'fs'
// import pathModule from 'path'
// import { app } from '@electron/remote'
// import { computed, ref } from 'vue'

export default {
  components: {
    add,
    list,
    
  },
  setup() {
    provide("store", store);
    // const path = ref(app.getAppPath())
    // const files = computed(() => {
    //   const fileNames = fs.readdirSync(path.value)
    //   return fileNames
    //     .map(file => {
    //       const stats = fs.statSync(pathModule.join(path.value, file))
    //       return {
    //         name: file,
    //         directory: stats.isDirectory()
    //       }
    //     })
    //     .sort((a, b) => {
    //       if (a.directory === b.directory) {
    //         return a.name.localeCompare(b.name)
    //       }
    //       return a.directory ? -1 : 1
    //     })
    // })
    // const back = () => {
    //   path.value = pathModule.dirname(path.value)
    // }
    // const open = folder => {
    //   path.value = pathModule.join(path.value, folder)
    // }
    // const searchString = ref('')
    // const filteredFiles = computed(() => {
    //   return searchString.value
    //     ? files.value.filter(s => s.name.startsWith(searchString.value))
    //     : files.value
    // })
    return {
      // path,
      // open,
      // // back,
      // files,
      // searchString,
      // filteredFiles
    }
  }
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
