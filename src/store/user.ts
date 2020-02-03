import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = {
  name: string
}

const initialState = {
  name: '',
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state: State, action: PayloadAction<string>): State => {
      return Object.assign({}, state, { name: action.payload })
    },
    clearName: (state: State): State => {
      return Object.assign({}, state, { name: '' })
    },
    // etc...
  },
})

export const { setName, clearName } = slice.actions

export default slice.reducer
