import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义CounterState接口
export interface CounterState {
    telegramName: string;
    id: number;
    invitationCode: string;
    point: number;
    recommenderUid: number;
    telegramId: number;
    token: string;
    updateTime: number;
    joinGroup: number;
    isfollow: number;
    twitterCode: string;
    Account: string;
}

// 定义初始状态
const initialState: CounterState = {
    telegramName: '',
    id: 0,
    invitationCode: '',
    point: 0,
    recommenderUid: 0,
    telegramId: 0,
    token: '',
    updateTime: 0,
    joinGroup: 0,
    Account: '',
    isfollow: 0,
    twitterCode: ''

};


interface SaveTwitterCode {
    twitterCode: string
    isfollow: number
}

// 定义Payload类型
interface SetUserPayload {
    telegramName: string;
    id: number;
    invitationCode: string;
    point: number;
    recommenderUid: number;
    telegramId: number;
    token: string;
    updateTime: number;
    joinGroup: number;
    twitterCode: string
    isfollow: number
}

// 创建Slice
export const UserInfo = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<SetUserPayload>) => {
            const {
                telegramName, id, invitationCode, point, recommenderUid, telegramId, token, updateTime,joinGroup,twitterCode,isfollow
            } = action.payload;
            state.telegramName = telegramName;
            state.id = id;
            state.invitationCode = invitationCode;
            state.point = point;
            state.recommenderUid = recommenderUid;
            state.telegramId = telegramId;
            state.token = token;
            state.updateTime = updateTime;
            state.joinGroup = joinGroup;
            state.twitterCode = twitterCode
            state.isfollow = isfollow
        },
        changeJoinGroup: (state, action: PayloadAction<number>) => {
            state.joinGroup = action.payload
        },
        setTwitter: (state, action: PayloadAction<SaveTwitterCode>) => {
            state.twitterCode = action.payload.twitterCode
            state.isfollow = action.payload.isfollow

        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.Account = action.payload
        }
    }
});

// 导出action
export const { setUser,setAddress } = UserInfo.actions;

// 导出reducer
export default UserInfo.reducer;
