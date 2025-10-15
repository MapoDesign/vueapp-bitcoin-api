import { getMarkets } from "@/components/api/coins";
import { onMounted, ref } from "vue";

export default function useCoinsMarkets() {
  const coins = ref([]);

  async function getAPIData() {
    coins.value = await getMarkets();
  }

  onMounted(getAPIData);

  return { coins, getAPIData };
}
