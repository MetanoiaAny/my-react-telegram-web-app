import { Address, TonClient ,fromNano} from '@ton/ton';


import {Activity} from './contracts/activity'

const tonClient = new TonClient({
    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
})



export const onGetTonBalance = async (_address: string) => {
   const res = await tonClient.getBalance(Address.parse(_address))

   return fromNano(res)
}


export async function onContract  () {


    

    const _address =Address.parse('kQAhUYmTdP5_C6Ekyj3dccyYxed1YjSHbNYglV30tNPDcB_W')

    const Contract_address =await Activity.fromAddress(_address)

    const _contract = tonClient.open(Contract_address)

    const data = await _contract.getGetData()


    return data
    
}