import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface BalanceState {
    TonBalance: string
}

const initialState: BalanceState = {
    TonBalance: '0'
}




export const Balance = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalance(state, action: PayloadAction<string>) {
            state.TonBalance = action.payload
        }
    }
})

export const { setBalance } = Balance.actions

export default Balance.reducer