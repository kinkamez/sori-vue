// https://image.tmdb.org/t/p/w500/
// https://www.themoviedb.org/settings/api
// https://developers.themoviedb.org/4/getting-started/images
//TODO: AUTO KÖVETKEZŐ SZEZON


<template>
  <div></div>
</template>

<script>
import axios from "axios";

export default {
  setup() {
    const populal = function (nev, kulcs) {
      axios
        .get(
          "https://api.themoviedb.org/3/search/tv?api_key=1bdbd5a458166aa9a6bdb992815c0771&language=hu-HU&page=1&query=" +
            nev +
            "&include_adult=false"
        )
        .then((response) => {
          const tmdb_id = response.data.results[0].poster_path;
          console.log(tmdb_id);
          db.database()
            .ref("data/" + kulcs)
            .update(
              { Pic: "https://image.tmdb.org/t/p/w300/" + tmdb_id },
              (error) => {
                if (error) {
                  console.log("Hiba a id-zés folyamatában", kulcs);
                } else {
                  // Data saved successfully!
                  console.log("https://image.tmdb.org/t/p/w300/" + tmdb_id);
                }
              }
            );
        })
        .catch((error) => console.log(error));
    };
  },
};
</script>

<style>
</style>



<script>
export default {
  setup() {
     const aktualizacio = function (evad, id, kulcs, resz) {
      let novelt_resz = resz +1;
      let one =
        "https://api.themoviedb.org/3/tv/" +
        id +
        "?api_key=1bdbd5a458166aa9a6bdb992815c0771&language=hu-HU&page=1&append_to_response=season";
      let two =
        "https://api.themoviedb.org/3/tv/" +
        id +
        "/season/" +
        evad +
        "/episode/" +
         novelt_resz +
        "?api_key=1bdbd5a458166aa9a6bdb992815c0771&language=hu-HU";

      const requestOne = axios.get(one);
      const requestTwo = axios.get(two);
      

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
           
           const alap_keres = responseOne.data.seasons.filter(function (season) {
            return season.season_number === evad;
          })[0];

          const episode_count = alap_keres.episode_count;
          const season_poster = "https://image.tmdb.org/t/p/w300/" + alap_keres.poster_path;


          const next_episodeAir = responseTwo.air_date;  

          db.database()
            .ref("data/" + kulcs)
            .update(
              { Pic: season_poster, Episodeyear: episode_count , Next_episode : next_episodeAir},
              (error) => {
                if (error) {
                  console.log("Hiba as folyamatában", kulcs);
                }
              }
            );
          })
        )
        .catch((errors) => {
          // react on errors.
        });
  },
}
}
</script>




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
import fs from 'fs'
import pathModule from 'path'
import { app } from '@electron/remote'
import { computed, ref } from 'vue'

export default {
  components: {
    add,
    list,
    
  },
  setup() {
    provide("store", store);

    const path = ref(app.getAppPath())
    const files = computed(() => {
      const fileNames = fs.readdirSync(path.value)
      return fileNames
        .map(file => {
          const stats = fs.statSync(pathModule.join(path.value, file))
          return {
            name: file,
            directory: stats.isDirectory()
          }
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name)
          }
          return a.directory ? -1 : 1
        })
    })
    const back = () => {
      path.value = pathModule.dirname(path.value)
    }
    const open = folder => {
      path.value = pathModule.join(path.value, folder)
    }
    const searchString = ref('')
    const filteredFiles = computed(() => {
      return searchString.value
        ? files.value.filter(s => s.name.startsWith(searchString.value))
        : files.value
    })

    console.log(path);
    return {
      path,
      open,
      back,
      files,
      searchString,
      filteredFiles
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
