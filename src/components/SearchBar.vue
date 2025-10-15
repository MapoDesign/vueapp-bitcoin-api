<template>
  <div class="search-container">
    <el-input
      v-model="searchQuery"
      placeholder="Cerca una criptovaluta..."
      prefix-icon="el-icon-search"
      clearable
      @input="handleSearchInput"
      class="search-input"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleSearchInput() {
      // Emetto l'evento al componente padre con il valore di ricerca
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>

<style lang="scss">
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.search-input {
  max-width: 300px;
  width: 100%;
}
</style>
