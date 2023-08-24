const gameStore={
    state:()=>({
        pickedCard:null
    }),
    mutations:{
        setCard(state,card){
            state.pickedCard=card
        }
    }
}

export default gameStore