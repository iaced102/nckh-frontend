<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <a href="/">Home<span>&dtrif;</span></a>
        </li>
        <li>
          <a href="/document">VB Hành chính<span>&dtrif;</span></a>
          <ul class="submenu">
            <li><a href="#">Tạo&nbsp;văn&nbsp;bản&nbsp;mới</a></li>
            <li><a href="#">Danh&nbsp;sách&nbsp;văn&nbsp;bản</a></li>
          </ul>
        </li>
        <li>
          <a href="/dashboard">Báo cáo<span>&dtrif;</span></a>
        </li>
        <li>
          <a href="/scheduler">Lịch trình<span>&dtrif;</span></a>
          <ul class="submenu">
            <li><a href="#">Tạo&nbsp;lịch&nbsp;trình&nbsp;mới</a></li>
            <li><a href="#">Lịch&nbsp;trình</a></li>
          </ul>
        </li>
        <li>
          <a href="/news">Tin tức<span>&dtrif;</span></a>
        </li>
      </ul>
    </nav>
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

/* nav a {
  font-weight: bold;
  color: #000000;
  text-decoration: none;
} */

nav a.router-link-exact-active {
  color: #42b983;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
<style lang="scss">
@import "~ag-grid-community/styles/ag-grid.css";
@import "~ag-grid-community/styles/ag-theme-alpine.css";
</style>

<style>
/* main */
nav {
  padding: 30px;
  font-weight: bold;
  color: #000000;
}

nav > ul, .submenu {
  list-style-type: none;
}

nav > ul > li {
  display: inline-block;
  padding: 10px 0px;
  position: relative;
}

nav > ul > li >a {
  padding: 10px 18px;
  color:#345e2e; text-transform: uppercase;
  text-decoration: none;
  border: 1px solid transparent; border-radius: 3px;
  transition: border 300ms linear;
}

nav > ul > li > a > span {
  font-weight: bold; font-size: 25px;
  position: relative; left: 8px;
}

nav > ul > li >a:hover {
  border: 1px solid #000000; border-radius: 3px;
}

nav > ul > li:hover .submenu {
  display: block;
}

/* submenu */
ul.submenu {
  position: absolute; top: 58px; left: 15px;
  background-color: rgb(62, 147, 110);
  padding:20px 0px 20px 0px;
  display: none;
}

ul.submenu li {
  padding: 10px 0px;
}

ul.submenu a {
  padding: 10px 18px;
  color: azure;
}

</style>
