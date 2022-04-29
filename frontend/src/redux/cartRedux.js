import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        currentCart: null
    },
    reducers: {
        previousCart:(state, action) => {
            state.currentCart = action.payload
        },
        addCart: (state, action) => {
            state.currentCart += action.payload
        }
    }
})

export const {addCart, previousCart} = cartSlice.actions
export default cartSlice.reducer