<template>
  <div id="app">
    <h1>Progetto Orders Manager</h1>
    <nav>
      <ul>
        <li>
          <!-- Homepage -->
          <router-link to="/">Torna alla home</router-link>
        </li>
        <li>
          <!-- Lista ordini -->
          <router-link to="/orders">Lista ordini</router-link>
        </li>
        <li>
          <!-- Dettaglio ordine esempio id=1 -->
          <router-link :to="{ name: 'order-detail', params: { id: 1 } }">
            Dettaglio ordine 1
          </router-link>
        </li>
        <li>
          <!-- Modifica ordine esempio id=1 -->
          <router-link :to="{ name: 'order-edit', params: { id: 1 } }">
            Modifica ordine 1
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Punto dove viene renderizzata la pagina selezionata -->
    <router-view />
  </div>
</template>
