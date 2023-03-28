import config from 'config';
import jwt from 'jsonwebtoken';

export function signJwt(
  object: Object, 
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'HS256',
  });
}

export function verifyJwt(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
  try {
    const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
      "ascii"
    );
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
