<template>
  <header class="site-header">
    <div class="header-wrapper">
      <NuxtLink to="/" class="nav-link">Company X</NuxtLink>

      <nav class="main-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <NuxtLink to="/about" class="nav-link">About Us</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/team" class="nav-link">Team</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/testimonials" class="nav-link"
              >Testimonials</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style>
.site-header {
  padding: 2em 0 1em;
}

.header-wrapper {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: right;
}

.nav-link {
  color: inherit;
  text-decoration: none !important;
  text-transform: uppercase;
}

.nav-link.nuxt-link-exact-active.nuxt-link-active {
  border-bottom: 2px solid;
  letter-spacing: 0.5px;
}

@media (min-width: 640px) {
  .nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .nav-item {
    margin-right: 1.5rem;
  }
}
</style>
