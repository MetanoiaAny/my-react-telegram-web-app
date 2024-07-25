import request from "./axios";



export const getTwitter = async (params: {
    code: string,
    state: string
}) => {
    return await request.request('/twitter/code', 'GET', params)
}





export const InitUser = async (content: {
    content: string
}) => {
    return await request.request('/user/enter', 'POST', content)
}