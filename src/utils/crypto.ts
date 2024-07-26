// src/cryptoUtils.ts
import { sm2 } from 'sm-crypto';
import CryptoJS from 'crypto-js';

// 生成密钥对
export const generateKeyPair = () => {
  const { publicKey, privateKey } = sm2.generateKeyPairHex();
  return { publicKey, privateKey };
};

// 加密函数
export const encrypt = (publicKey: string, data: string) => {
  return sm2.doEncrypt(data, publicKey, 1);
};

// 解密函数
export const decrypt = (privateKey: string, encryptedData: string) => {
  // return sm2.doDecrypt(encryptedData, privateKey, 'base64', 'utf8');
  return sm2.doDecrypt(encryptedData, privateKey)
};


export const SM2Key = '04d0f5b3fdf7fe00bd90aa08f63c22b3f9136dfcad47393f909b7e3e13c72abdcea94b7246f088a022cfb0784ed86a9769e3686c46cf99b07dad01cf2bb64b6330'



export const desDecrypt = (encryptedText: string, key: string): string => {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(encryptedText)
    },
    keyUtf8,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};


export const decryptDes = (message: string, key: string) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Hex.parse(message)
    }, // 若 message 是 base64 格式，则无需转16进制hex，直接传入 message 即可
    keyHex,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  )
  return decrypted.toString(CryptoJS.enc.Utf8)
}
