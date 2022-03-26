<template>
  <notifications />
  <h1 class="black">Mobile Subscribers</h1>
  <div id="nav">
    <router-link to="/">Dashboard</router-link> |
    <router-link to="/subscribers">View All Subscribers</router-link> |
    <router-link to="/subscribers/add">Add Subscriber</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
  <footer>
    <div class="container">
      <p>&copy; 2022 https://github.com/nativeB</p>
    </div>
  </footer>
</template>
