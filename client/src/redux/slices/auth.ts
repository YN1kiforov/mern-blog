import { UserType } from './../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../../axios"

interface AuthState {
  currentUser: UserType | null
}
type loginValues = {
	email: string,
	password: string,
}
type registerValues = {
	email: string,
	password: string,
	name: string,
}
export const login = createAsyncThunk(
  'user/login',
  async (inputs: loginValues) => {
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
  async (inputs: registerValues) => {
    try {
      const { data } = await axios.post("/register", inputs);
      return data
    } catch (error) {
      console.log(`error ${error}`)
    }
  }
)
const initialState: AuthState = {
  currentUser: JSON.parse(localStorage.getItem("user") || "") || null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null
      localStorage.setItem("user", "null")
    },
    editUser: (state, data) => {
      const newState = { ...state.currentUser, ...data.payload }
      console.log(data)
      console.log(newState)
      localStorage.setItem("user", JSON.stringify(newState))
      state.currentUser = newState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload?.user || null))
        state.currentUser = action.payload?.user
      })
      .addCase(register.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload?.user || null))
        state.currentUser = action.payload?.user
      })
  },
})

export const { logout, editUser } = authSlice.actions

export default authSlice.reducer