<template>
  <div id="app">
    <h1>Progetto Orders Manager</h1>
    <nav>
      <ul>
        <li>
          <!-- Lista ordini -->
          <router-link to="/orders">Lista ordini</router-link>
        </li>
        <li>
          <!-- Nuovo ordine -->
          <router-link to="/orders/create">Crea nuovo ordine</router-link>
        </li>
        <li>
          <!-- Lista prodotti -->
          <router-link to="/products">Lista prodotti</router-link>
        </li>
      </ul>
    </nav>

    <!-- Punto dove viene renderizzata la pagina selezionata -->
    <router-view />
  </div>
</template>
