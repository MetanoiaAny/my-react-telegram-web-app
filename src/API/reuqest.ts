import request from "./axios";



interface returnCode<T> {
    code: number,
    data:T,
    msg: string
} 


export const getTwitter = async (params: {
    code: string,
    state: string
}
,Token:string
) => {
    return await request.request<returnCode<string>>('/twitter/code', 'POST', params,{
        headers:{
            Authorization:Token
        }
    })
}

export const userInfo = async (Token:string) => {
    return await request.request<returnCode<string>>('/user/myInfo', 'POST', {},{
        headers:{
            Authorization:Token
        }
    })
}





export const InitUser = async (content: {
    content: string
}) => {
    return await request.request<returnCode<string>>('/user/enter', 'POST', content)
}