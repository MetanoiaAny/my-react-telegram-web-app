import request from "./axios";



interface returnCode<T> {
    code: number,
    data:T,
    msg: string
} 


export const getTwitter = async (params: {
    code: string,
    state: string
}) => {
    return await request.request<returnCode<string>>('/twitter/code', 'GET', params)
}







export const InitUser = async (content: {
    content: string
}) => {
    return await request.request<returnCode<string>>('/user/enter', 'POST', content)
}