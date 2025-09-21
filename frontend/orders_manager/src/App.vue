<template>
  <div id="app">
    <h1>Progetto Orders Manager</h1>
    <nav class="nav">
      <ul>
        <li>
          <!-- Lista ordini -->
          <router-link class="nav-link" to="/orders">Lista ordini</router-link>
        </li>
        <li>
          <!-- Nuovo ordine -->
          <router-link class="nav-link" to="/orders/create">Crea nuovo ordine</router-link>
        </li>
        <li>
          <!-- Lista prodotti -->
          <router-link class="nav-link" to="/products">Lista prodotti</router-link>
        </li>
      </ul>
    </nav>

    <!-- Punto dove viene renderizzata la pagina selezionata -->
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: sans-serif;
}

.nav-link {
  text-decoration: none;
  color: green;
}

.nav-link:hover {
  text-decoration: underline;
}

.nav ul {
  list-style-type: none;
  padding: 0;
}

.nav li {
  display: inline;
  margin: 0 10px;
}
</style>
