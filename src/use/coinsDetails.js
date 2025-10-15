import { getCoinDetails } from "@/components/api/coins";
import { onMounted, ref } from "vue";

export default function useCoinsDetails() {
  const coins = ref([]);

  async function getCoinData() {
    coins.value = await getCoinDetails();
  }

  onMounted(getCoinData);

  return { coins, getCoinData };
}
