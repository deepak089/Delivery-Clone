import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state,actions) => {
      state.items = [...state.items,actions.payload]
    },
    removeFromBasket: (state,actions) => {
        const index=state.items.findIndex(
            (item)=> item.id === actions.payload.id);

            let newBasket=[...state.items];

            if(index >= 0){
                newBasket.splice(index,1);
            }
            else{
                console.warn(`Cann't remove the product ( id: ${actions.payload.id} as its not in basket!!!)`);
            }

            state.items=newBasket;
    },
  },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items;

export const SelectBasketItemsWithId = (state,id) => state.basket.items.filter((item)=> item.id === id); 

export const selectBasketTotal=( state) => state.basket.items.reduce((total,item) =>
 total+=item.price,0)
export default basketSlice.reducer;