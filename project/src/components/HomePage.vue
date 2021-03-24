<template>
  <div id="app">
    <nav class="navbar  fixed-top bg-secondary flex-md-nowrap p-0 shadow">
      <a id="stock" class="navbar-brand col-sm-3 col-md-2 mr-0" href="#/home"
        >STOK TAKİP</a
      >
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Stoklarda Ara"
        aria-label="Search"
        v-model="searchText"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a id="signout" role="button" class="nav-link" @click="signOut">Sign out</a>
        </li>
      </ul>
    </nav>

    <div id="container" class="container">
      <div class="row align-items-center">
        <div class="col-md-3">
          <ul class="list-group">
            <li class="list-group-item">Hoşgeldin, {{userName}}</li>
            <li class="list-group-item active">Stoklar</li>
          </ul>
        </div>
        <div class="col-md-9">
          <StockInput />
        </div>
      </div>
    </div>

    <hr />
    <Table />
  </div>
</template>
<script>
import Table from "./Table";
import StockInput from "./StockInput";
import EventBus from "../eventBus";
export default {
  components: {
    Table,
    StockInput,
  },
  data() {
    return {
      searchText: "",
      userName:""
    };
  },
  watch: {
    searchText: function(newValue) {
      let searchText = newValue;
      EventBus.$emit("searchText", searchText);
    },
  },
  methods: {
    async signOut(e) {
      e.preventDefault();
      this.$router.push("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    },
  },
  created:function(){
    this.userName = localStorage.getItem("userName");
    console.log(this.userName);
  }
};
</script>
<style >
#container {
  margin-top: 50px;
    margin-left: 20px;

}
#stock, #signout{
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#stock{
  font-size: 20px;
  font-weight: bold;
}
/* body{
  margin: 0  !important;
  height: 100% !important;
  background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%) !important;
  
} */

</style>
