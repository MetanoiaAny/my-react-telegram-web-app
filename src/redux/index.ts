import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import  UserInfo  from './modules/UserInfo/User'
import Balance from "./modules/Balance/Balance";



const store = configureStore({
    reducer:{
        User:UserInfo,
        Balance:Balance
    }
})




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;