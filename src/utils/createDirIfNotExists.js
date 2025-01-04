import fs from 'node:fs/promises';

export const createDirIfNotExists = async (url) => {
  try {
    await fs.mkdir(url, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new Error(`Failed to create directory: ${url}`);
    }
  }
};
