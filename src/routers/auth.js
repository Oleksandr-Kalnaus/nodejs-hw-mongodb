import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import {
  loginWithGoogleOAuthSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  userLoginSchema,
  userRegistrationSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  refreshTokenController,
  registerController,
  logoutController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(userRegistrationSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/auth/login',
  validateBody(userLoginSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/auth/refresh', ctrlWrapper(refreshTokenController));

authRouter.post('/auth/logout', ctrlWrapper(logoutController));

authRouter.post(
  '/auth/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get('/auth/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/auth/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default authRouter;
