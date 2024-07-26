// src/cryptoUtils.ts
import { sm2 } from 'sm-crypto';

// 生成密钥对
export const generateKeyPair = () => {
  const { publicKey, privateKey } = sm2.generateKeyPair();
  return { publicKey, privateKey };
};

// 加密函数
export const encrypt = (publicKey: string, data: string) => {
  return sm2.doEncrypt(data, publicKey, 1);
};

// 解密函数
export const decrypt = (privateKey: string, encryptedData: string) => {
  return sm2.doDecrypt(encryptedData, privateKey, 'base64', 'utf8');
};


export const SM2Key = 'MFkwEwYHKoZIzj0CAQYIKoEcz1UBgi0DQgAEy57EZSW9bdNRwrekkC42yXqdaO3HGaUzZ9APycu16ZQpLQ2LdS+qAPuFc0n86wGaUqLGBq1Iz+NLh2Han1p5UQ=='