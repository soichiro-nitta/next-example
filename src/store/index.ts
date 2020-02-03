import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from './user'
// import cartReducer from './cart'

const reducer = combineReducers({
  user: userReducer,
  // cart: cartReducer,
})

export type StateTypes = ReturnType<typeof reducer>

const store = configureStore({ reducer })

export default store
