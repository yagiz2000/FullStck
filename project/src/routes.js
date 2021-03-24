import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/HomePage.vue";
export const routes = [
    {path:'',component:  Login },
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/home',component:Home,beforeEnter:(to,from,next)=>{
        if(localStorage.getItem("token")===null){
            console.log("Token yok, giremezsin");
            next(false);
        }
        if(localStorage.getItem("token")!==null){
            console.log("Token var, gir");
            next();
        }
    }},
];