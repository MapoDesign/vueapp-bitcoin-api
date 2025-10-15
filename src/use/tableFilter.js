import { ref, computed } from "vue";

export default function useTableFilter(coins) {
  const search = ref("");

  // Computed per filtrare le monete basandosi sulla ricerca
  const filteredCoins = computed(() => {
    if (!coins.value || coins.value.length === 0) return [];
    if (!search.value) return coins.value;

    return coins.value.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.value.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.value.toLowerCase())
    );
  });

  function formatNumber(value) {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("it-IT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function formatCurrency(value) {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function getNameFilters() {
    if (!filteredCoins.value || filteredCoins.value.length === 0) return [];
    return filteredCoins.value.map((coin) => ({
      text: coin.name,
      value: coin.name,
    }));
  }
  function handleNameFilter(value, row) {
    return row.name.toLowerCase().includes(value.toLowerCase());
  }

  // Metodo per aggiornare la ricerca (da chiamare dal componente padre)
  function updateSearch(searchQuery) {
    search.value = searchQuery;
  }

  return {
    search,
    filteredCoins,
    formatNumber,
    formatCurrency,
    getNameFilters,
    handleNameFilter,
    updateSearch,
  };
}
