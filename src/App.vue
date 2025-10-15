<template>
  <div>
    <NavBar @search="handleSearch" />
    <div class="container">
      <router-view :searchQuery="searchQuery" />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleSearch(searchQuery) {
      this.searchQuery = searchQuery;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

#app {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}
</style>
