<template>
  <div>
    <!-- Pannello Impostazioni -->
    <!-- <SettingsPanel
      :currencies="currencies"
      :locales="locales"
      :settings="settings"
      :loading="loading"
      @update-settings="updateSettings"
    /> -->

    <!-- Tabella -->
    <el-table
      :data="filteredCoins"
      style="width: 100%"
      :default-sort="{
        prop: 'price_change_percentage_24h',
        order: 'descending',
      }"
    >
      <!-- ...existing table columns... -->
      <el-table-column label="" width="120">
        <template #default="scope">
          <div class="flex-central-vert">
            <el-image
              :src="scope.row.image"
              alt="Crypto Image"
              fit="cover"
              style="width: 50px; height: 50px"
            />
            <div class="margin-left bold">
              {{ scope.row.symbol.toUpperCase() }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Nome"
        sortable
        :filters="getNameFilters()"
        :filter-method="handleNameFilter"
      >
      </el-table-column>

      <el-table-column prop="current_price" label="Prezzo attuale" sortable>
        <template #default="scope">
          {{ formatCurrency(scope.row.current_price) }}
        </template>
      </el-table-column>
      <el-table-column prop="total_supply" label="Total Supply" sortable>
        <template #default="scope">
          {{ formatNumber(scope.row.total_supply) }}
        </template>
      </el-table-column>
      <el-table-column prop="max_supply" label="Max Supply" sortable>
        <template #default="scope">
          {{ formatNumber(scope.row.max_supply) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="price_change_percentage_24h"
        label="Variazione 24h (%)"
        sortable
      >
        <template #default="scope">
          <el-tag
            v-if="scope.row.market_cap_change_percentage_24h > 0"
            type="success"
          >
            {{ formatNumber(scope.row.market_cap_change_percentage_24h) }} %
          </el-tag>
          <el-tag v-else type="danger">
            {{ formatNumber(scope.row.market_cap_change_percentage_24h) }} %
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template #default="scope">
          <el-button type="text" size="small" @click="goToDetails(scope.row.id)"
            >Dettagli</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { router } from "@/router/routers";
import useCoinsMarkets from "../use/coinsMarkets";
import useTableFilter from "../use/tableFilter";

export default {
  setup() {
    const coinsMarkets = useCoinsMarkets();
    const tableFilter = useTableFilter(coinsMarkets.coins);

    function goToDetails(coinId) {
      // Naviga alla pagina dei dettagli della criptovaluta
      router.push({ path: `/crypto/${coinId}` });
    }

    return {
      ...coinsMarkets,
      ...tableFilter,
      // Alias per mantenere compatibilità con il metodo chiamato da App.vue
      updateSearch: tableFilter.updateSearch,
      goToDetails,
    };
  },
};
</script>

<style lang="scss">
.flex-central-vert {
  display: flex;
  align-items: center;
}

.margin-left {
  margin-left: 10px;
}

.bold {
  font-weight: 600;
}
</style>
