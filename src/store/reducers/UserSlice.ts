import { createSlice } from "@reduxjs/toolkit"
export interface UserState {
    user: {
        username: string
        email: string
        id: string
        isAdmin: boolean
    }
    isLoading: boolean
    error: string
    isAuth: boolean
}

const initialState: UserState = {
    user: {
        username: '',
        email: '',
        id: '',
        isAdmin: false
    },
    isLoading: false,
    error: '',
    isAuth: !!localStorage.getItem('token'),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
            state.isAuth = action.payload
        }
    }
})

export const { saveUser } = userSlice.actions

export default userSlice.reducer