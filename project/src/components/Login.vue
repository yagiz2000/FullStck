<template>
  <div id="app" class="text-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <main class="form-signin">
            <form>
              <h1 class="h3 mb-3 fw-normal">Giriş Yap</h1>
              <input
                v-model="userName"
                type="text"
                class="form-control"
                placeholder="Kullanıcı Adı"
              />
              <input
                v-model="password"
                type="password"
                id="inputPassword"
                class="form-control mt-4"
                placeholder="Password"
                required=""
              />
              <button
                @click="login"
                id="sbmtbtn"
                class="w-100 btn btn-lg btn-success"
                type="submit"
              >
                Giriş Yap
              </button>
              <button
                @click="$router.push('/register')"
                class="w-100 btn btn-lg btn-warning mt-2"
                type="submit"
              >
                Kayıt Ol
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../eventBus";
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
    async login(e) {
      try {
        e.preventDefault();
        const data = {
          userName: this.userName,
          password: this.password,
        };
        const res = await fetch("https://us-central1-rest-api-d27d0.cloudfunctions.net/app/login", {
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
          //console.log(token);
          const jsnd = await res.json();
          const token = jsnd.token;
          const userName = jsnd.userName;
          localStorage.setItem("token", token);
          localStorage.setItem("userName", userName);
          EventBus.$emit("userName", userName);
          this.$router.push("home");
        }
        if (res.status === 404) {
          this.alertBasic(
            "Başarısız",
            "Kullanıcı adı veya şifre yanlış",
            "warning"
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.form-signin {
  width: 100%;
  padding: 15px;
  margin: auto;
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

#sbmtbtn {
  margin-top: 10px;
}
</style>
