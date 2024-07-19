import { JSEncrypt } from 'jsencrypt';

// // 生成 RSA 密钥对
// export const generateKeyPair = (): { publicKey: string; privateKey: string } => {
//   const encrypt = new JSEncrypt({ default_key_size: 2048 });
//   const publicKey = encrypt.getPublicKey();
//   const privateKey = encrypt.getPrivateKey();
//   return { publicKey, privateKey };
// };

// 使用公钥加密消息
export const encryptMessage = (publicKey: string, message: string): string | false => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(message);
};

// 使用私钥解密消息
export const decryptMessage = (privateKey: string, encryptedMessage: string): string | false => {
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  return decrypt.decrypt(encryptedMessage);
};
