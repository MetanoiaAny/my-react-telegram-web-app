import { Address, TonClient4 } from '@ton/ton';


import { Activity } from '@/Ton/contracts/Activity.ts'
import { ActivityMain } from '@/Ton/contracts/ActivityMain.ts'
import { AccountInfo } from '@/Ton/contracts/AccountInfo.ts'
import { contracts_address } from '@/config/index.ts'

import {onGetTonBalance} from '@/Ton/TonUtils.ts'



const tonClient = new TonClient4({
    endpoint: "https://testnet-v4.tonhubapi.com",
})


// const client = new TonClient({
//     endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
// })






// export async function onContract  () {




//     const _address =Address.parse(contracts_address)

//     const Contract_address =await Activity.fromAddress(_address)

//     const _contract = tonClient.open(Contract_address)

//     const data = await _contract.getGetData()


//     return data

// }


export const onActivity_info = async (account?: string) => {


    const { Activity_id, Activity_address } = await get_ActivityMain(contracts_address)

    const poolBalance = await onGetTonBalance(contracts_address)
    

    

    if (Activity_id > 1 && Activity_address) {
        const Activity= await get_Activity(Activity_address, account)
        console.log(account);
        
        console.log('Activity',Activity);
        
        
        if (account && Activity.Activity_AccountInfo) {
            const _userActivityInfo = await get_userActivityInfo(Activity.Activity_AccountInfo)

            console.log('_userActivityInfo',_userActivityInfo);
            
        }

    }




    // const _Activity_address = await Main_contract.getGetActivityAddress(NextId - 1n)


    // const Activity_address_string = _Activity_address.toString()
    // const Activity_address = Address.parse(Activity_address_string)


    // const Activity_contract_address = await Activity.fromAddress(Activity_address)

    // const Activity_contract = tonClient.open(Activity_contract_address)
    // const data = await Activity_contract.getGetData()

    // console.log(data);

}


const get_ActivityMain = async (contracts_address: string) => {
    const _address = Address.parse(contracts_address)
    const Main_Contract_address = await ActivityMain.fromAddress(_address)

    const Main_contract = tonClient.open(Main_Contract_address)
    const NextId = await Main_contract.getGetNextId()


    if (NextId === 1n) {
        return {
            Activity_id: Number(NextId)
        }
    }
    const _Activity_address = await Main_contract.getGetActivityAddress(NextId - 1n)

    return {
        Activity_id: Number(NextId),
        Activity_address: _Activity_address
    }
}


const get_Activity = async (contracts_address: Address, account?: string) => {
    // const _address = Address.parse('EQAhUYmTdP5_C6Ekyj3dccyYxed1YjSHbNYglV30tNPDcKRc')






    const Contract_address = await Activity.fromAddress(contracts_address)

    const _contract = tonClient.open(Contract_address)

    console.log(_contract);
    

    const Activity_data = await _contract.getGetData()

    if (account) {
        const account_address = Address.parse(account)

        const Activity_account_info = await _contract.getGetAccountInfoAddress(account_address)

        return {
            Activity_data,
            Activity_AccountInfo: Activity_account_info
        }
    } else {
        return {
            Activity_data
        }
    }




}

const get_userActivityInfo = async (contracts_address: Address) => {



    const Contract_address = await AccountInfo.fromAddress(contracts_address)

    console.log(contracts_address.toString()        ,'userActivityInfo');
    

    const _contract = tonClient.open(Contract_address)


    console.log(_contract);
  
    

    const Activity_data = await _contract.getGetData()

    console.log(Activity_data);
    
}