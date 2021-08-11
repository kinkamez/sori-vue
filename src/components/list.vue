/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
<template>
  <section>
    <div class="album py-5 bg-light">
      <div class="container">
        <div
          class="row row-cols-2 row-cols-sm-4 row-cols-md-5 row-cols-lg-6 g-3"
        >
          <div
            class="col"
            v-for="(message, index) in arrayfilter"
            :key="message.key"
          >
            <div
              class="card bg-dark text-white shadow-lg border-secondary"
              v-bind:class="{
                'border-warning border-top-0 border-start-0 border-end-0 border-4':
                  url_checker(message.ut),
              }"
            >
              <img
                v-if="message.kep !== undefined"
                v-bind:src="message.kep"
                v-bind:alt="message.nev"
                data-toggle="tooltip"
                class="card-img maximg"
              />
              <img
                v-else
                src="../kepek/black.png"
                v-bind:alt="message.nev"
                style="object-fit: cover"
                data-toggle="tooltip"
                class="card-img maximg"
              />
              <div
                class="
                  card-img-overlay
                  justify-content-evenly
                  flex-column
                  d-inline-flex
                "
              >
                <h5 class="card-title">{{ message.nev }}</h5>

                <div
                  class="text-center align-items-center bg-dark rounded mb-1"
                  style="margin-top: auto"
                  v-bind:title="message.stat"
                >
                  <small
                    class="text-white bg-dark"
                    v-bind:title="'S' + message.nseas + '/E' + message.nepis"
                  >
                    S{{ message.evad }} &nbsp; E{{ message.resz }}/{{
                      message.evadperresz
                    }}
                    <p>{{ message.kovetkezo }}</p></small
                  >
                </div>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-warning"
                    @click="
                      sorozat_moviedb_aktualizalas(
                        parseInt(message.evad),
                        message.mas,
                        message.id,
                        parseInt(message.resz + 1)
                      )
                    "
                  >
                    <i class="far fa-question-circle"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-warning"
                    @click="fooldal(message.ut)"
                  >
                    <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-warning"
                    @click="modosito(index, message.id)"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-warning"
                    @click="
                      novelo(
                        message.id,
                        parseInt(message.resz),
                        message.ut,
                        parseInt(message.evad),
                        parseInt(message.mas),
                        parseInt(message.evadperresz)
                      )
                    "
                  >
                    <i class="far fa-play-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, inject, onUpdated } from "vue";
import db from "../db.js";
import axios from "axios";
import $ from "jquery";

export default {
  setup() {
    const store = inject("store");
    const firebase_beiras = function (obj, kulcs) {
      if (!store.state.user) {
        return;
      }
      db.database()
        .ref("data/" + kulcs)
        .update(obj, (error) => {
          if (error) {
            console.log("Hiba a növelés folyamatában");
          }
        });
    };
    const novelo = function (kulcs, aktualis, urli, evad, id, evadperresz) {
      let objBe, frissS, frissE;
      // sorozat_moviedb_aktualizalas(evad, id, kulcs, parseInt(aktualis + 2));
      if (evadperresz === aktualis + 1) {
        objBe = {
          Episode: 0,
          Season: evad + 1,
          Next_episode: "frissités kell",
        };
        frissS = evad + 1;
        frissE = 1;
      } else {
        objBe = { Episode: aktualis + 1 };
        frissS = evad;
        frissE = aktualis + 2;
      }
      sorozat_moviedb_aktualizalas(frissS, id, kulcs, frissE);
      firebase_beiras(objBe, kulcs);

      if (url_checker(urli) && store.state.beallitasok.megnyit) {
        webnezo(urli, evad, aktualis);
      }
    };
    /* eslint-disable no-unused-vars */
    const fooldal = function (urli) {
      if (url_checker(urli)) {
        window.open(urli, "_blank");
      }
    };
    const sorozat_moviedb_aktualizalas = function (evad, id, kulcs, resz) {
      let moviedb_alap =
        "https://api.themoviedb.org/3/tv/" +
        id +
        "?api_key=1bdbd5a458166aa9a6bdb992815c0771&language=hu-HU&page=1";
      let moviedb_resz =
        "https://api.themoviedb.org/3/tv/" +
        id +
        "/season/" +
        evad +
        "/episode/" +
        resz +
        "?api_key=1bdbd5a458166aa9a6bdb992815c0771&language=hu-HU";

      const requestOne = axios.get(moviedb_alap);
      const requestTwo = axios.get(moviedb_resz);

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];

            const gyartasban = responseOne.data.in_production;

            const status = responseOne.data.status;

            //responseOne.data.next_episode_to_air
            const alap_keres = responseOne.data.seasons.filter(function (
              season
            ) {
              return season.season_number === evad;
            })[0];

            const episode_count = alap_keres.episode_count;
            console.log(responseOne);
            // console.log(responseTwo);
            let vege =
              alap_keres.poster_path != null
                ? alap_keres.poster_path
                : responseOne.data.poster_path;
            const season_poster = "https://image.tmdb.org/t/p/w300" + vege;
            const next_episodeAir =
              responseTwo.data.air_date || "frissités kell";
            // eslint-disable-next-line no-prototype-builtins
            const lastepisode =
              Object.keys(responseOne.data).includes("last_episode_to_air") &&
              responseOne.data.last_episode_to_air != null
                ? responseOne.data.last_episode_to_air.episode_number
                : " majd";
            // eslint-disable-next-line no-prototype-builtins
            const lastseason =
              Object.keys(responseOne.data).includes("last_episode_to_air") &&
              responseOne.data.last_episode_to_air != null
                ? responseOne.data.last_episode_to_air.season_number
                : " majd";
            let obj = {
              Pic: season_poster,
              Episodeyear: episode_count,
              Next_episode: next_episodeAir,
              Status: status,
              Lastepisode: lastepisode,
              Lastseason: lastseason,
              Inproduction: gyartasban,
            };
            firebase_beiras(obj, kulcs);
          })
        )
        .catch((errors) => {
          console.log(errors);
        });
    };
    /* eslint-disable no-unused-vars */
    function extractHostname(url) {
      var hostname;
      if (url.indexOf("//") > -1) {
        hostname = url.split("/")[2];
      } else {
        hostname = url.split("/")[0];
      }
      hostname = hostname.split(":")[0];
      hostname = hostname.split("?")[0];
      return hostname;
    }

    function webnezo(url, evad, resz) {
      resz = resz + 1;
      var linke, mino;

      if (extractHostname(url) == "netmozi.com") {
        linke =
          url.split("/").slice(0, 6).join("/") + "/s" + evad + "/e" + resz;
      } //netmozi url kezelo
      else if (
        extractHostname(url) == "www.sorozatbarat.online" ||
        extractHostname(url) == "www.sorozatbarat.club"
      ) {
        if (evad > 9) {
          if (resz > 9) {
            mino = "#" + evad + "_evad_" + resz + "_resz";
          } else {
            mino = "#" + evad + "_evad_0" + resz + "_resz";
          }
          linke =
            url.split("/").slice(0, 7).join("/") + "/" + evad + "_evad" + mino;
        } else {
          if (resz > 9) {
            mino = "#0" + evad + "_evad_" + resz + "_resz";
          } else {
            mino = "#0" + evad + "_evad_0" + resz + "_resz";
          }
          linke =
            url.split("/").slice(0, 7).join("/") + "/0" + evad + "_evad" + mino;
        }
      } else {
        linke = url;
      } // url kezelo

      window.open(linke, "_blank");
    }

    const modosito = function (i, kulcs) {
      store.state.form_nemlathato = false;
      window.scrollTo(0, 0);

      store.state.sorozat_nev = store.state.data2[i].nev;
      store.state.sorozat_resz = store.state.data2[i].resz;
      store.state.sorozat_evad = store.state.data2[i].evad;
      store.state.sorozat_evadresz = store.state.data2[i].evadperresz;
      store.state.sorozat_ut = store.state.data2[i].ut;
      store.state.sorozat_tvdb = store.state.data2[i].mas;
      store.state.sorozat_megjelenites =
        store.state.data2[i].archiv == 2 ? false : true;
      store.state.sorozat_kep = store.state.data2[i].kep;
      store.state.aktualis = kulcs;
    };
    const url_checker = function (str) {
      let regex =
        /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
      if (!regex.test(str)) {
        return false;
      } else {
        return true;
      }
    };

    const betolto = function () {
      db.database()
        .ref("data")
        .on("value", (snapshot) => {
          const data = snapshot.val();
          store.state.data = [];
          Object.keys(data).forEach((key) => {
            if (data[key].Archive) {
              store.state.data.push({
                id: key,
                nev: data[key].Name,
                evad: data[key].Season,
                resz: data[key].Episode,
                ut: data[key]["kinka-pc"],
                archiv: data[key].Archive,
                mas: data[key].Tmdb,
                evadperresz: data[key].Episodeyear,
                kep: data[key].Pic,
                kovetkezo: data[key].Next_episode,
                stat: data[key].Status,
                nepis: data[key].Lastepisode,
                nseas: data[key].Lastseason,
              });
            }
            // localStorage.setItem('user', JSON.stringify(user));
            // var user = JSON.parse(localStorage.getItem('user'));
          });
        });
    };

    onMounted(() => {
      betolto();
    });
    onUpdated(() => {
      $(document).ready(function () {
        // $("img").height($("img").width()*1.5);

        console.log($("img").height());
      });
    });

    return {
      novelo,
      store,
      modosito,
      url_checker,
    };
  },
  computed: {
    arrayfilter() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.store.state.data2 = this.store.state.data
        .filter((e) => e.archiv === this.store.state.mindenekelott)
        .sort((a, b) => a.nev.localeCompare(b.nev));

      return this.store.state.data2;
    },
  },
};
</script>
<style>
.card-img-overlay {
  opacity: 0;
  background-color: black;
  transition: opacity 0.6s ease-in-out;
}

.card-img-overlay:hover {
  opacity: 0.9;
  transition: opacity 0.6s ease-in-out;
}

.maximg {
  max-height: 280px;
  background-color: black;
}

/* xs */
@media (min-width: 585px) {
  img {
    height: 177px;
  }
}
/* sm */
@media (min-width: 768px) {
  img {
    height: 180px;
  }
}
/* md */
@media (min-width: 992px) {
  img {
    height: 200px;
  }
}
/* lg */
@media (min-width: 1200px) {
  img {
    height: 270px;
  }
}
</style>
      