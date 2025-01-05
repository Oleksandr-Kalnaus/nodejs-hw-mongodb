import fs from 'node:fs/promises';
import path from 'node:path';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/uploads.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async (file) => {
  const tempPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const uploadPath = path.join(UPLOAD_DIR, file.filename);

  try {
    await fs.access(tempPath);
  } catch (err) {
    throw new Error(`Temp file not found: ${file.filename}`);
  }

  await fs.rename(tempPath, uploadPath);

  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};
