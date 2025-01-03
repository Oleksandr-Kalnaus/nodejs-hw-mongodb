import {
  login,
  logout,
  refreshUserToken,
  register,
  requestResetToken,
  resetPassword,
} from './../services/auth.js';
import cookie from 'cookie';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'Strict',
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    secure: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'Strict',
  });
};

export const registerController = async (req, res) => {
  const user = await register(req.body);
  const userData = user.toObject();
  delete userData.password;

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: userData,
  });
};

export const loginController = async (req, res) => {
  const session = await login(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshTokenController = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const { refreshToken, sessionId } = cookies;

  const session = await refreshUserToken({ refreshToken, sessionId });
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await logout(sessionId);

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');

    res.status(204).send();
  }
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    status: 200,
    message: 'Password was successfully reset!',
    data: {},
  });
};
