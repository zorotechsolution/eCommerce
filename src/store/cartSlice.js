import {createSlice} from '@reduxjs/toolkit' 


const cartSlice = createSlice({
    name:"cart",
    initialState: [],
    reducers: {
        addItem(state,action){

        },
        removeItem(state,action){

        }
    }
})


export default cartSlice.reducer;

export const {addItem,removeItem} = cartSlice.actions;