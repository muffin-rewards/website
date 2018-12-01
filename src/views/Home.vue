<template>
  <div>
    <nav class="nav" role="navigation" aria-label="main navigation">
      <div class="nav-menu">
        <router-link class="nav-item" :to="{ name: 'home' }">
          <img src="@/assets/images/muffin-logo.png" alt="Muffin">
        </router-link>
      </div>
      <div class="nav-spacer"></div>
      <div class="nav-menu">
        <div class="nav-item has-text-primary">
          <span class="nav-burger"></span>
        </div>
      </div>
    </nav>
    <div class="line"></div>
    <router-link to="/cubana">
      <img src="@/assets/images/cubana.png" alt="Cubana">
    </router-link>
    <div class="line"></div>
    <img src="@/assets/images/dominos.png" alt="Dominos">
    <div class="line"></div>
    <img src="@/assets/images/chilangos.png" alt="Chilangos">
  </div>
</template>
