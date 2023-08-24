import { createStore } from "vuex";
import userStore from "./modules/user.store";
import gameStore from "./modules/game.store";

export default createStore({
    modules:{
        userStore,
        gameStore
    }
})