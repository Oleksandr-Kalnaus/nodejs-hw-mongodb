import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { userLoginSchema, userRegistrationSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginController, registerController } from '../controllers/auth.js';

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

export default authRouter;
