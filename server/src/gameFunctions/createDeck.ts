//P - piki T - trefi C- chervi B - bubny
const signs:string[]=['P','T','C','B'];
const values:(string|number)[]=[6,7,8,9,10,'V','D','K','T'];

const random = (max:number) => Math.floor(Math.random()*max)

const setDeck=()=>{
    const totalDeck:({sign:string,value:string|number})[]=[]
    for(let value of values){
        for(let sign of signs){
            totalDeck.push({sign,value})
        }
    }
    return totalDeck
}

export const generateDeck=async()=>{
    const deck = setDeck()
    const total = []
    const checkInclude:number[] = []
    while(total.length!=deck.length){
        const randomVal =random(deck.length)
        if(!checkInclude.includes(randomVal)){
            checkInclude.push(randomVal)
            total.push(deck[randomVal])
        }
    }
    const player1 = total.splice(0,6)
    const player2 = total.splice(0,6)
    const remaining=total
    const trump=total[total.length-1].sign
    return {player1,player2,remaining,trump}
}

export interface IDeck{
    player1: {
        sign: string;
        value: string | number;
    }[];
    player2: {
        sign: string;
        value: string | number;
    }[];
    remaining: {
        sign: string;
        value: string | number;
    }[];
    trump: string;
}