import { isCloudinaryEnabled } from './saveFetureFlag.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const saveFile = async (file) => {
  if (isCloudinaryEnabled) {
    return await saveFileToCloudinary(file);
  } else {
    return await saveFileToUploadDir(file);
  }
};
