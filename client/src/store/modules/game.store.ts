const gameStore={
    state:()=>({
        card:null
    }),
    mutations:{
        setCard(state,card){
            state.card=card
        }
    }
}

export default gameStore