<template>
  <div>
    <div v-if="loading" class="loading">
      <el-loading-directive />
      <p>Caricamento dettagli...</p>
    </div>

    <div v-else-if="error" class="error">
      <el-alert title="Errore" :description="error" type="error" show-icon />
    </div>

    <div v-else-if="coinDetail" class="coin-details">
      <div class="coin-header">
        <el-image
          :src="coinDetail.image?.large"
          :alt="coinDetail.name"
          class="coin-image"
        />
        <div class="coin-info">
          <h1>
            {{ coinDetail.name }} ({{ coinDetail.symbol?.toUpperCase() }})
          </h1>
          <p class="coin-description" v-html="coinDetail.description?.en"></p>
        </div>
      </div>

      <div class="coin-stats">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <h3>Prezzo Attuale</h3>
              <p class="price">
                {{ formatCurrency(coinDetail.market_data?.current_price?.eur) }}
              </p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <h3>Market Cap</h3>
              <p>
                {{ formatCurrency(coinDetail.market_data?.market_cap?.eur) }}
              </p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
              <h3>Volume 24h</h3>
              <p>
                {{ formatCurrency(coinDetail.market_data?.total_volume?.eur) }}
              </p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <div v-else class="not-found">
      <el-alert
        title="Criptovaluta non trovata"
        description="La criptovaluta richiesta non esiste o non è disponibile."
        type="warning"
        show-icon
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCoinDetails } from "../api/coins.js";

export default {
  setup() {
    const route = useRoute();
    const coinId = route.params.id;

    // Stato reattivo
    const coinDetail = ref(null);
    const loading = ref(false);
    const error = ref(null);

    // Funzioni di utilità per il formatting
    const formatCurrency = (value) => {
      if (value === null || value === undefined) return "N/A";
      return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      }).format(value);
    };

    // Funzione per caricare i dettagli della coin
    const loadCoinDetails = async () => {
      loading.value = true;
      error.value = null;

      try {
        const data = await getCoinDetails(coinId);
        if (data) {
          coinDetail.value = data;
        } else {
          error.value = "Impossibile caricare i dettagli della criptovaluta";
        }
      } catch (err) {
        error.value = "Errore durante il caricamento: " + err.message;
      } finally {
        loading.value = false;
      }
    };

    // Carica i dettagli quando il componente viene montato
    onMounted(() => {
      loadCoinDetails();
    });

    return {
      coinId,
      coinDetail,
      loading,
      error,
      formatCurrency,
    };
  },
};
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 50px;
}

.error,
.not-found {
  margin: 20px 0;
}

.coin-details {
  padding: 20px;
}

.coin-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  gap: 20px;
}

.coin-image {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.coin-info {
  flex: 1;
}

.coin-info h1 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.coin-description {
  color: #7f8c8d;
  line-height: 1.6;
  max-height: 100px;
  overflow: hidden;
}

.coin-stats {
  margin-top: 30px;
}

.coin-stats h3 {
  margin: 0 0 10px 0;
  color: #34495e;
  font-size: 16px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #27ae60;
  margin: 0;
}

.el-card {
  text-align: center;
}
</style>
