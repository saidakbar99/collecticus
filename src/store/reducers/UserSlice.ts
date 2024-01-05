import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
// import { IUser } from "@/models/IUser";

interface UserState {
    user: string
    isLoading: boolean
    error: string
}

const initialState: UserState = {
    user: '',
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<string>) {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer