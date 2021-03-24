<template>
  <div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Ürün Tipi</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="productType"
        />
     
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Miktar</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="quantity"

        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Fiyat</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="price"

        />
      </div>
 
      <button type="submit" class="btn btn-primary">Kaydet</button>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      productType:"",
      quantity:"",
      price:""
    }
  },
  methods:{

    async addStock(){

    }
  }
};
</script>

<style></style>
