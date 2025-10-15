<template>
  <div class="not-found">
    <h1>404 - Pagina non trovata</h1>
    <p>La pagina che stai cercando non esiste.</p>
    <el-button type="primary" @click="$router.push('/')">
      Torna alla Home
    </el-button>
  </div>
</template>
<script>
export default {
  setup() {
    return {};
  },
};
</script>
