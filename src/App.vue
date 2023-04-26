<template>
  <div id="app">
    <ul class="snip1143">
      <li class="current"><a href="/" data-hover="Home">Home</a></li>
      <li><a href="/document" data-hover="VB Hành chính">VB Hành chính</a></li>
      <li><a href="/scheduler" data-hover="Lịch trình">Lịch trình</a></li>
      <li><a href="/dashboard" data-hover="Báo cáo">Báo cáo</a></li>
      <li><a href="/news" data-hover="Tin tức">Tin tức</a></li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    if (localStorage.feeUserInfo) {
      this.$store.commit("user/setStoredUserInfo");
    } else {
      this.$router.push("/login");
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
<style lang="scss">
@import "~ag-grid-community/styles/ag-grid.css";
@import "~ag-grid-community/styles/ag-theme-alpine.css";
</style>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Raleway:400,500);
.snip1143 {
  font-family: "Raleway", Arial, sans-serif;
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
}
.snip1143 * {
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
.snip1143 li {
  display: inline-block;
  list-style: outside none none;
  margin: 0 1.5em;
  overflow: hidden;
}
.snip1143 a {
  padding: 0.3em 0;
  color: rgba(101, 102, 198, 0.5);
  position: relative;
  display: inline-block;
  letter-spacing: 1px;
  margin: 0;
  text-decoration: none;
}
.snip1143 a:before,
.snip1143 a:after {
  position: absolute;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
.snip1143 a:before {
  top: 100%;
  display: block;
  height: 3px;
  width: 100%;
  content: "";
  background-color: #c0392b;
}
.snip1143 a:after {
  padding: 0.3em 0;
  position: absolute;
  top: 100%;
  left: 0;
  content: attr(data-hover);
  color: rgb(0, 0, 0);
  white-space: nowrap;
}
.snip1143 li:hover a,
.snip1143 .current a {
  transform: translateY(-100%);
}
/* Demo purposes only */
body {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #212121;
}

/* Demo purposes only */
html {
  height: 100%;
}
body {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
  margin: 0;
  height: 100%;
}
</style>
