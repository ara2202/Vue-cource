<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Users</router-link> |
      <router-link to="/create">Create a User</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 18px;
  position: sticky;
  top: 0;
  background: #13505b;

  a {
    //color: #ffffff;
    color: #71ee58;
    &.router-link-exact-active {
      color: #ffffff;
      font-weight: bold;
      //color: #42b983;
    }
  }
}
</style>
