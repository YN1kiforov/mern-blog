import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../../axios"

export const login = createAsyncThunk(
  'user/login',
  async (inputs) => {
    try {
      const { data } = await axios.post("/login", inputs);
      return data
    } catch (error) {
      console.log(`error ${error}`)
    }
  }
)

export const register = createAsyncThunk(
  'user/register',
  async (inputs) => {
    try {
      const { data } = await axios.post("/register", inputs);
      return data
    } catch (error) {
      console.log(`error ${error}`)
    }
  }
)
const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null
      localStorage.setItem("user", null)
    },
    editUser: (state, data) => {
      const newState = { ...state.currentUser, ...data.payload }
      console.log(data)
      console.log(newState)
      localStorage.setItem("user", JSON.stringify(newState))
      state.currentUser = newState
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload?.user || null))
      state.currentUser = action.payload?.user
    },
    [register.fulfilled]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload?.user || null))
      state.currentUser = action.payload?.user
    },
  },

})

export const { logout, editUser } = authSlice.actions

export default authSlice.reducer