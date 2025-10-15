<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1"
      ><router-link to="/">Home</router-link></el-menu-item
    >
    <el-menu-item index="2"
      ><router-link :to="detailsRoute">Dettagli</router-link></el-menu-item
    >
    <SearchBar @search="handleSearch" />
  </el-menu>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  components: {
    SearchBar,
  },
  name: "NavBar",
  data() {
    return {
      activeIndex: "1",
    };
  },
  computed: {
    detailsRoute() {
      // Cerca l'ultimo ID crypto nella cronologia del router
      const lastCryptoId = this.getLastCryptoIdFromHistory();
      return lastCryptoId ? `/crypto/${lastCryptoId}` : "/404"; // fallback a pagina NotFound
    },
  },
  methods: {
    handleSearch(searchQuery) {
      // Emetto l'evento di ricerca al componente App
      this.$emit("search", searchQuery);
    },
    getLastCryptoIdFromHistory() {
      // Controlla se siamo già su una pagina crypto
      if (this.$route.name === "CryptoDetails" && this.$route.params.id) {
        return this.$route.params.id;
      }

      // Cerca nella cronologia del browser per l'ultimo ID crypto visitato
      const history = this.$router.options.history;
      if (history && history.state && history.state.back) {
        const match = history.state.back.match(/\/crypto\/(\d+)/);
        if (match) {
          return match[1];
        }
      }

      // Fallback: prova a recuperare dall'localStorage
      const savedId = localStorage.getItem("lastCryptoId");
      return savedId || null; // Ritorna null se non c'è nessun ID salvato
    },
  },
  watch: {
    $route(to) {
      // Salva l'ultimo ID crypto visitato
      if (to.name === "CryptoDetails" && to.params.id) {
        localStorage.setItem("lastCryptoId", to.params.id);
      }
    },
  },
};
</script>
