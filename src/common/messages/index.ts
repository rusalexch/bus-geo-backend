import { uploadMessages } from './upload.messages';
import { uploadErrorMessages } from './error/upload-error.messages';

export const messages = {
  error: {
    upload: uploadErrorMessages,
  },
  info: {
    upload: uploadMessages,
  },
};
