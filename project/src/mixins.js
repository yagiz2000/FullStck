import EventBus from "./eventBus";
import Swal from "sweetalert2";

export default {
  methods: {
    async getStock() {
      const token = localStorage.getItem("token");
      const res = await fetch("https://us-central1-rest-api-d27d0.cloudfunctions.net/app/getStocks", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const jsnd = await res.json();
      this.stocks = jsnd;
    },
    changeInput() {
      EventBus.$on("productType", (value) => {
        this.productType = value;
      });
      EventBus.$on("quantity", (value) => {
        this.quantity = value;
      });
      EventBus.$on("price", (value) => {
        this.price = value;
      });
      EventBus.$on("id", (value) => {
        this.id = value;
        console.log(value);
      });
    },
    alertBasic(shortMsg,mainMsg,type){
      Swal.fire(
        shortMsg,
        mainMsg,
        type
      )
    },
    alertConfirm(){
      return Swal.fire({
        title: 'Dikkat',
        text: "Stok silinmek üzere emin misin ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, eminimim.'
      })
    }
  },
};
