<template>
  <div class="text-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <main class="form-signin">
            <form>
              <h1 class="h3 mb-3 fw-normal">Kayıt Ol</h1>
              <input
                class="form-control"
                placeholder="Kullanıcı Adı"
                autofocus=""
                v-model="userName"
              />
              <input
                type="password"
                id="inputPassword"
                class="form-control mt-4"
                placeholder="Password"
                v-model="password"
              />
              <button
                @click="register"
                id="sbmtbtn1"
                class="w-100 btn btn-lg btn-warning"
                type="submit"
              >
                Kayıt Ol
              </button>
              <button
                @click="redirectToLogin"
                id="sbmtbtn2"
                class="w-100 btn btn-lg btn-success"
                type="submit"
              >
                Giriş Yap
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myMixin from "../mixins";
export default {
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  mixins: [myMixin],
  methods: {
    async register(e) {
      try {
        if (this.userName === ""|| this.password ==="" ) return this.alertBasic("Sıkıntı Var","Hiçbir alan boş bırakılmamalıdır","warning");
        
        e.preventDefault();
        const data = {
          userName: this.userName,
          password: this.password,
        };
        const res = await fetch("https://us-central1-rest-api-d27d0.cloudfunctions.net/app/register", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.status === 200) {
          this.alertBasic("Başarılı", "Başarıyla kayıt oldunuz", "success");
          this.$router.push("/login");
        }
        if(res.status ===400){
          this.alertBasic("Başarısız", "Böyle bir kullanıcı var lütfen farklı bir kullanıcı adı girin", "warning");

        }
        //const jsnd = await res.json();
        console.log(res);
    
      } catch (error) {
        console.log(error);
      }
    },
    redirectToLogin: function() {
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.form-signin {
  width: 100%;
  margin: auto;
}
#sbmtbtn1,#sbmtbtn2 {
  margin-top: 10px;
}
form {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 50px;
}
</style>
