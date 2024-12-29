import { login, register } from './../services/auth.js';

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

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
