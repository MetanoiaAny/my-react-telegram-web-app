import { createSlice } from '@reduxjs/toolkit';



export interface CounterState {
    user:string,
    name:string,
    code:string
}


const initialState: CounterState = {
    user:'',
    name:'',
    code:''
};


export const UserInfo = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setName(state, action) {
            state.name = action.payload
        },
        setCode(state, action) {
            state.code = action.payload
        },
        
    }

})


export const { setUser, setName, setCode } = UserInfo.actions

export default UserInfo.reducer;

