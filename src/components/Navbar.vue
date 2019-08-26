<template>
  <div class="navbar">
    <nav class="nav-extended nav-gradient darken-2">
      <div class="nav-content container">
        <a class="home-title">
          <router-link to="/" class="valign-wrapper">
            <h2 class="nav-title txt-animation">My smoothies...</h2>
            <i class="material-icons right logo-line txt-animation">local_bar</i>
          </router-link>
        </a>
        <a href="#" class="btn-floating btn-large halfway-fab pink">
          <router-link to="/add-smoothie">
            <i class="medium material-icons rotate">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
</style>
