<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <form>
          <h2>Stock Ekle</h2>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Ürün Adı</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="productType"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Ürün Adeti</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              v-model="quantity"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Adet Fiyatı</label
            >
            <input
              type="text"
              class="form-control"
              v-model="price"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" @click="addStock" class="btn btn-primary">
            Kaydet
          </button>
          <button @click="updateStock" class="btn btn-success mx-2">
            Güncellemeyi Onayla
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import myMixin from "../mixins";
import Swal from "sweetalert2";
//import EventBus from "../eventBus";
export default {
  data() {
    return {
      productType: "",
      quantity: "",
      price: "",
      id: "",
    };
  },
  mixins: [myMixin],
  methods: {
    clearInputs: function() {
      this.productType = "";
      this.quantity = "";
      this.price = "";
      this.id = "";
    },
    async addStock(e) {
      e.preventDefault();
      const comingPost = {
        productType: this.productType,
        quantity: this.quantity,
        price: this.price,
      };
      const token = localStorage.getItem("token");
      const res = await fetch("https://us-central1-rest-api-d27d0.cloudfunctions.net/app/addStock", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(comingPost),
      });
      const jsnd = await res.json();
      console.log(jsnd);
            this.alertBasic("Başarılı","Yeni stok ekleme işlemi başarılı","success");

       setTimeout(function() {
            location.reload();
          }, 2500);
      location.reload(); // Başka çarem yoktu :(
      this.clearInputs();
    },
    async updateStock(e) {
      try {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const data = {
          productType: this.productType,
          quantity: this.quantity,
          price: this.price,
          stockId: this.id,
        };
        const res = await fetch("https://us-central1-rest-api-d27d0.cloudfunctions.net/app/updateStock", {
          method: "PATCH",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(data),
        });
        //const jsnd = await res.json();
        if (res.status === 200) {
          this.alertBasic("Başarılı", "Güncelleme işlemi başarılı", "success");
          setTimeout(function() {
            location.reload();
          }, 2500);
          this.clearInputs();
        }
      } catch (error) {
        Swal.fire("Başarısız", "İşlem başarılı değil", "warning");
        this.clearInputs();
      }
    },
  },
  created() {
    this.changeInput(); //mixinden geldi
    console.log("ınput created");
  },
};
</script>
<style scoped>
  body {
    padding-top: 100px;
  }</style>
