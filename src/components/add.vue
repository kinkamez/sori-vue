// electorn vagy nem ?
<template>
  <nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#" @click="store.state.mindenekelott = 1">Sori-progi</a>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse.show"
        >
          <li class="nav-item">
            <a class="nav-link" @click="form_megjelenites" href="#"
              >Hozzáadás</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="store.state.mindenekelott = 2">Rejtettek</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" tabindex="-1">Beállítások</a>
          </li>
        </ul>
        <!-- <div class="d-flex">
        text
      </div> -->
      </div>
    </div>
  </nav>

  <div
    class="container shadow p-3"
    v-bind:class="{ 'd-none': store.state.form_nemlathato }"
    id="hozzaadomezo"
  >
    <!-- <form > -->
    <form v-on:submit.prevent="sorzat_add">
      <div class="row mb-2">
        <div class="form-group col">
          <input
            class="form-control"
            type="text"
            v-model="store.state.sorozat_nev"
            v-on:blur="adatkereso"
            autofocus
            required
            placeholder="Sorozat:"
            style="text-transform: capitalize"
          />
          <!-- <button @click.prevent="adatkereso">?</button> -->
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <input
            class="form-control"
            placeholder="Évad:"
            title="Évad:"
            v-model="store.state.sorozat_evad"
            type="number"
            required
          />
        </div>
        <div class="col">
          <input
            class="form-control"
            placeholder="Rész:"
            title="Rész:"
            v-model="store.state.sorozat_resz"
            type="number"
            required
          />
        </div>
        <div class="col">
          <input
            class="form-control"
            type="number"
            v-model="store.state.sorozat_evadresz"
            placeholder="Évadonként:"
            title="Rész évadonként:"
            required
          />
        </div>
        <div class="col-4">
          <input
            class="form-control"
            type="number"
            v-model="store.state.sorozat_tvdb"
            placeholder="TmDB:"
            title="TmDB:"
            required
          />
        </div>
      </div>
      <div class="row mb-2">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            title="Útvonal:"
            placeholder="Útvonal:"
            v-model="store.state.sorozat_ut"
            
          />
        </div>
      </div>
      <div class="row mb-2">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            title="Kép:"
            placeholder="Kép:"
            v-model="store.state.sorozat_kep"
            
          />
        </div>
      </div>

      <div class="row mb-2">
        <div class="form-goup">
          <input
            class="form-control"
            type="file"
            odirectory
            directory
            multiple
          />
        </div>
      </div>
      <div class="row">
        <div class="form-group d-flex justify-content-center">
          <div class="mb-3 form-check form-switch">
            <label class="form-check-label" for="flexSwitchCheckChecked"
              >Megjelenítés</label
            >
            <input
              v-model="store.state.sorozat_megjelenites"
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
            />
            
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">

        <button type="submit" @click.prevent="sorzat_add" class="btn btn-primary">
          <span> <i class="far fa-save"></i> Mentés </span>
        </button>
        <button class="btn btn-primary mx-2" @click.prevent="megsem">
          <span><i class="fas fa-ban"></i> Mégsem</span>
        </button>

        <button class="btn btn-primary ml-2" @click.prevent="torlo">
          <span><i class="far fa-trash-alt"></i> Tölés</span>
        </button>
      </div>
    </form>
  </div>

  <br />
</template>

<script>
import db from "../db";
import { inject } from "vue";
import axios from "axios";

// import { reactive, onMounted } from "vue";

export default {
  setup() {
    const store = inject("store");
 /* eslint-disable no-unused-vars */
    const adatkereso = function () {
      // https://api.themoviedb.org/3/search/tv?api_key=yes&language=en-US&page=1&query=kifejezes&include_adult=false
      axios
        .get(
          "https://api.themoviedb.org/3/search/tv?api_key=1bdbd5a458166aa9a6bdb992815c0771&language=hu-HU&page=1&query= " +
            store.state.sorozat_nev +
            "&include_adult=false"
        )
        .then((response) => {
          console.log(response);
          const alap_keres = response.data.results[0];
        store.state.sorozat_resz = -1;
        store.state.sorozat_evadresz = 25;
        store.state.sorozat_evad = 1;
         store.state.sorozat_tvdb = alap_keres.id;
         store.state.sorozat_kep =
            "https://image.tmdb.org/t/p/w300/" + alap_keres.poster_path;
        })
        .catch((error) => console.log(error));
    };
    const sorzat_add = function () {
      let beirandoobj = {
        Name: store.state.sorozat_nev,
        Archive: parseInt(store.state.sorozat_megjelenites ? "1" : "2", 10),
        Season: parseInt(store.state.sorozat_evad, 10),
        Episode: parseInt(store.state.sorozat_resz, 10),
        Episodeyear: parseInt(store.state.sorozat_evadresz, 10),
        "kinka-pc": store.state.sorozat_ut,
        Tmdb: parseInt(store.state.sorozat_tvdb, 10),
        Pic: store.state.sorozat_kep,
      };

      let newPostKey =
        store.state.aktualis != ""
          ? store.state.aktualis
          : db.database().ref().child("posts").push().key;
      db.database()
        .ref("data/" + newPostKey)
        .update(beirandoobj);

      store.state.sorozat_nev = "";
      store.state.sorozat_resz = "";
      store.state.sorozat_evad = "";
      store.state.sorozat_kep = "";
      store.state.sorozat_evadresz = "";
      store.state.sorozat_ut = "";
      store.state.sorozat_tvdb = "";
      store.state.sorozat_megjelenites = false;
      store.state.form_nemlathato = true;

      store.state.aktualis = "";
    };
    const form_megjelenites = function () {
      store.state.form_nemlathato = !store.state.form_nemlathato;
      window.scrollTo(0, 0);
      // /console.log(messages);
    };
 const megsem = function() {
      store.state.sorozat_nev = "";
      store.state.sorozat_resz = "";
      store.state.sorozat_evad = "";
      store.state.sorozat_evadresz = "";
      store.state.sorozat_ut = "";
      store.state.sorozat_kep = "";
      store.state.sorozat_tvdb = "";
      store.state.sorozat_megjelenites = false;
      store.state.form_nemlathato = true;

      store.state.aktualis = "";
 }
    const torlo = function () {
      db.database()
        .ref("data")
        .child(store.state.aktualis)
        .remove()
        .then(function () {
          console.log("Remove succeeded.");
          // store.state.data = [];
        })
        .catch(function (error) {
          console.log("Remove failed: " + error.message);
        });
      // db.database().ref("data/" + store.state.aktualis).remove();
      store.state.sorozat_nev = "";
      store.state.sorozat_kep = "";

      store.state.sorozat_resz = "";
      store.state.sorozat_evad = "";
      store.state.sorozat_evadresz = "";
      store.state.sorozat_ut = "";
      store.state.sorozat_tvdb = "";
      store.state.sorozat_megjelenites = false;
      store.state.form_nemlathato = true;

      store.state.aktualis = "";
    };
    return {
      sorzat_add,
      store,
      form_megjelenites,
      torlo,
      megsem,
      adatkereso,
    };
  },
};
</script>