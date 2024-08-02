
import { getBalanceUrl ,get_timeUrl} from '@/config/index'
import { fromNano } from '@ton/core';



export const onGetTonBalance = async (_address: string) => {
    let _balance = '-'

    await fetch(getBalanceUrl + _address)
        .then((res) => res.json())
        .then((res) => {

            const balanceToTon = BigInt(res.balance)


            _balance = fromNano(balanceToTon)
        })
        .catch((error) => {
            console.log(error);
            _balance = '-'
        });

    return _balance
}


export const getChainTime = async () => {
    let  Time =  '-'

    await fetch(get_timeUrl)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            
        })
        .catch((error) => {
            console.log(error);
            Time = '-'
        });

        return Time
}