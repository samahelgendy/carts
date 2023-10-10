import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './Slices/Cart-Slice'

export const store = configureStore({
  reducer: {
    cart:cartSlice,
  },
})