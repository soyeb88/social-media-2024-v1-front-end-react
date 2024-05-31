import { encrypt, decrypt} from 'n-krypta';

export const encryption = (password) =>{
    const secretKey = 'key';
    const encryptData = encrypt(password,secretKey);
    return encryptData;
}

export const decryption = (encrptedData) =>{
    const secretKey = 'key';  
    const decryptData = decrypt(encrptedData,secretKey);
    return decryptData;
}
