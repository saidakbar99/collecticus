import { createSlice } from "@reduxjs/toolkit";
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
    selectedUsers: string[]
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
    selectedUsers: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
            state.isAuth = action.payload
        },
        saveSelectedUsers: (state, action) => {
            console.log(action.payload)
            if(state.selectedUsers.includes(action.payload)) {
                // console.log('aaremoved: ', action.payload)
                state.selectedUsers = state.selectedUsers.filter((user: string) => user !== action.payload)
            } else {
                // console.log('aaadded: ', action.payload)
                state.selectedUsers.push(action.payload)
            }
            console.log(state.selectedUsers)

        }
    }
})

export const { saveUser, saveSelectedUsers } = userSlice.actions;

export default userSlice.reducer