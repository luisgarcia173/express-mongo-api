import config from 'config';
import jwt from 'jsonwebtoken';


const privatekey = config.get<string>('privatekey');
const publicKey = config.get<string>('publicKey');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privatekey, {
    ...(options && options),
    algorithm: 'HS256' 
  });
};

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null
    }
  }
};