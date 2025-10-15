<template>
  <div class="settings-panel">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>⚙️ Impostazioni</span>
          <el-button
            type="primary"
            size="small"
            @click="applySettings"
            :loading="loading"
          >
            Applica
          </el-button>
        </div>
      </template>

      <div class="settings-grid">
        <!-- Valuta -->
        <div class="setting-item">
          <label class="setting-label">Valuta:</label>
          <el-select
            v-model="localSettings.vs_currency"
            placeholder="Seleziona valuta"
            size="small"
          >
            <el-option
              v-for="currency in currencies"
              :key="currency.code"
              :label="`${currency.name} (${currency.symbol})`"
              :value="currency.code"
            />
          </el-select>
        </div>

        <!-- Elementi per pagina -->
        <div class="setting-item">
          <label class="setting-label">Elementi per pagina:</label>
          <el-select
            v-model="localSettings.per_page"
            placeholder="Seleziona numero"
            size="small"
          >
            <el-option label="10" :value="10" />
            <el-option label="25" :value="25" />
            <el-option label="50" :value="50" />
            <el-option label="100" :value="100" />
            <el-option label="250" :value="250" />
          </el-select>
        </div>

        <!-- Pagina -->
        <div class="setting-item">
          <label class="setting-label">Pagina:</label>
          <el-input-number
            v-model="localSettings.page"
            :min="1"
            :max="100"
            size="small"
          />
        </div>

        <!-- Locale -->
        <div class="setting-item">
          <label class="setting-label">Lingua:</label>
          <el-select
            v-model="localSettings.locale"
            placeholder="Seleziona lingua"
            size="small"
          >
            <el-option
              v-for="locale in locales"
              :key="locale.code"
              :label="locale.name"
              :value="locale.code"
            />
          </el-select>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SettingsPanel",
  props: {
    currencies: {
      type: Array,
      required: true,
    },
    locales: {
      type: Array,
      required: true,
    },
    settings: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localSettings: { ...this.settings },
    };
  },
  watch: {
    settings: {
      handler(newSettings) {
        this.localSettings = { ...newSettings };
      },
      deep: true,
    },
  },
  methods: {
    applySettings() {
      this.$emit("update-settings", this.localSettings);
    },
  },
};
</script>

<style lang="scss" scoped>
.settings-panel {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-label {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}
</style>
