<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9">
        <div class="table-responsive">
          <table
            v-if="stocks.length > 0"
            class="table table-bordered  table-primary"
          >
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Miktar</th>
                <th>Fiyat</th>
                <th>Güncelle</th>
                <th>Sil</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stock in filteredStocks" :key="stock._id">
                <td>{{ stock.productType }}</td>
                <td :class="checkQuantityStatus(stock.quantity)">
                  {{ stock.quantity }}
                </td>
                <td>{{ stock.price }}</td>
                <td style="width: 100px" id="options">
                  <a
                    @click="
                      inputFilling(
                        stock.productType,
                        stock.quantity,
                        stock.price,
                        stock._id,
                        $event
                      )
                    "
                    class="btn btn-success"
                    href="#"
                    role="button"
                    >Güncelle</a
                  >
                </td>
                <td align="center" style="width: 100px" id="options2">
                  <a
                    @click="deleteStock(stock._id,$event)"
                    class="btn btn-danger"
                    href="#"
                    role="button"
                    >Sil</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <p style="text-align:center" v-else>Stock boş</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myMixin from "../mixins";
import EventBus from "../eventBus";
export default {
  data() {
    return {
      stocks: [],
      searchText: "",
    };
  },
  methods: {
    async deleteStock(id,e) {
      e.preventDefault();
      const confirmResult = await this.alertConfirm();
      if(!confirmResult.isConfirmed) return;
      const data = {
        postId: id,
      };
      const token = localStorage.getItem("token");
      const res = await fetch("https://us-central1-rest-api-d27d0.cloudfunctions.net/app/deleteStock/", {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(data),
      });
      const jsnd = await res.json();
      console.log(jsnd);
      this.getStock();
},
    inputFilling: function(type, quantity, price, id, e) {
      e.preventDefault();
      EventBus.$emit("productType", type);
      EventBus.$emit("quantity", quantity);
      EventBus.$emit("price", price);
      EventBus.$emit("id", id);
      this.changeInput();
    },
    checkQuantityStatus(quantity) {
      if(quantity>=10){
        return {"bg-success":true}
      }
      if(quantity<10){
        return {"bg-danger":true}
      }
     /*  return {
        "green": quantity >= 10,
        "red": quantity < 10
      }; */
    },
  },
  computed: {
    filteredStocks() {
      EventBus.$on("searchText", (value) => {
        this.searchText = value;
        console.log(this.searchText);
      });

      return this.stocks.filter((stock) => {
        return stock.productType
          .toLowerCase()
          .match(this.searchText.toLowerCase());
      });
    },
  },
  mixins: [myMixin],
  async created() {
    this.getStock();
  },
};
</script>

<style>
.col-md-4 {
  text-align: center;
}
#options #options2 {
  display: flex;
  margin: 0 !important;
  text-align: center;
}
.btn {
  justify-content: center !important;
  align-content: center;
}
.green {
  background-color: green  !important;
}
.red {
  background-color:  red !important;
}
</style>
