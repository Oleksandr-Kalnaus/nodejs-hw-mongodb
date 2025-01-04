import { getEnvVar } from './getEnvVar.js';

export const isCloudinaryEnabled =
  getEnvVar('ENABLE_CLOUDINARY', 'false') === 'true';
