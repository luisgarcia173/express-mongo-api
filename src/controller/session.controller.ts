import { Request, Response } from 'express';
import config from 'config';
import { createSession, findSessions } from '../service/sessions.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt.utils';
import logger from './../utils/logger';

export async function createUserSessionHandler(req: Request, res: Response) {
  try {
    // Validate user's password
    const user = await validatePassword(req.body);
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // Create a session
    const session = await createSession(user._id, req.get('user-agent') || '');

    // Create a token
    const accessToken = signJwt(
      {...user, session: session._id},
      "accessTokenPrivateKey",
      {expiresIn: config.get('accessTokenTtl')} //15 minutes
    );

    // Create a refresh token
    const refreshToken = signJwt(
      {...user, session: session._id},
      "refreshTokenPrivateKey",
      {expiresIn: config.get('accessTokenTtl')} //15 minutes
    );

    // return access & refresh token
    res.send({
      accessToken,
      refreshToken
    }) 

  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserSessionHandler(req: Request, res: Response) {
 const userId = res.locals.user._id;
 console.log(res.locals.user);
 const sessions = await findSessions({user: userId, valid: true});

 return res.send(sessions);
}