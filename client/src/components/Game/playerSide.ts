import { props, id } from "./Buttons.vue";

const playerSide = computed(() => (props.deck.player_1_id == id ? 2 : 1));
