import { createStore } from "vuex";
import userStore from "./modules/user.store";

export default createStore({
    modules:{
        userStore
    }
})