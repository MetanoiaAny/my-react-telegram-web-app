import { JSEncrypt } from 'jsencrypt';

// // 生成 RSA 密钥对
// export const generateKeyPair = (): { publicKey: string; privateKey: string } => {
//   const encrypt = new JSEncrypt({ default_key_size: 2048 });
//   const publicKey = encrypt.getPublicKey();
//   const privateKey = encrypt.getPrivateKey();
//   return { publicKey, privateKey };
// };

export const PKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCexmjnFVxFCc/4AWqyHV435ZgNT5p1lH9lk5210QENZGozi6NjLFSjrP2PeFKpm8vpybQh7obW2jOPQfUd/+gohIL80f+4bVRQpEq7caJRHdtv1lVCOhuS8hAYELoUFfzfi/hQStbOLcIZ2H3oKOjG1vGwd66DwLQUxuY2HL40ewIDAQAB'


// 使用公钥加密消息
export const encrypt = (publicKey: string, message: string): string | false => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  console.log(encrypt,message);
  
  return encrypt.encrypt(message);
};

// 使用私钥解密消息
export const decryptMessage = (privateKey: string, encryptedMessage: string): string | false => {
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  return decrypt.decrypt(encryptedMessage);
};
