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
  return sm2.doEncrypt(data, publicKey,1);
};

// 解密函数
export const decrypt = (privateKey: string, encryptedData: string) => {
  // return sm2.doDecrypt(encryptedData, privateKey, 'base64', 'utf8');
  return  sm2.doDecrypt(encryptedData, privateKey)
};


export const SM2Key = '04d0f5b3fdf7fe00bd90aa08f63c22b3f9136dfcad47393f909b7e3e13c72abdcea94b7246f088a022cfb0784ed86a9769e3686c46cf99b07dad01cf2bb64b6330'



export const decryptDES = (encryptedText: string, key: string): string => {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  // const ivUtf8 = CryptoJS.enc.Utf8.parse(iv);

  try {
    const decrypted = CryptoJS.DES.decrypt(encryptedText, keyUtf8, {
      // iv: ivUtf8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return 'Decryption failed';
  }
};