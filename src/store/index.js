import { reactive } from "vue";

const state = reactive({
  mindenekelott: 1,
  data: [],
  data2: [],
  sorozat_nev: "",
  sorozat_resz: "",
  sorozat_evad: "",
  sorozat_evadresz: "",
  sorozat_ut: "",
  sorozat_tvdb: "",
  sorozat_kep: "",
  sorozat_megjelenites: false,
  form_nemlathato: true,
  aktualis: "",
  beallitasok:{
    megnyit: true,
  },
});

export default {
  state,
};
