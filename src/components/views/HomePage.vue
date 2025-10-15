<template>
  <CryptoList ref="cryptoList" />
</template>

<script>
import CryptoList from "../CryptoList.vue";

export default {
  components: {
    CryptoList,
  },
  props: {
    searchQuery: {
      type: String,
      default: "",
    },
  },
  watch: {
    searchQuery(newQuery) {
      if (this.$refs.cryptoList) {
        this.$refs.cryptoList.updateSearch(newQuery);
      }
    },
  },
};
</script>
