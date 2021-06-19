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