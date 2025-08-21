import { fileTypeFromBuffer } from 'file-type';
import type { BufferConfig, FileType, Validation } from '$lib/types';
import { validMimeTypes } from '$lib/constants';

interface Props {
  image: File;
  field: string;
}

export const validateImage = async ({ image, field }: Props): Promise<Validation> => {
  if (!(image instanceof File)) { return { success: false, message: `The "${field}" field must be a file instance` }; }
  if (!image.size) { return { success: false, message: `The ${field} field is missing` }; }
  if (!validMimeTypes.includes(image.type)) { return { success: false, message: `The "${field}" field must have a .jpeg, .jpg or .png file extension` }; }

  const arrayBuffer: ArrayBuffer = await image.arrayBuffer();
  const realType: FileType = await fileTypeFromBuffer(arrayBuffer);
  if (!(realType && validMimeTypes.includes(realType.mime))){ return { success: false, message: `The "${field}" field must be a valid JPEG or PNG image` }; }

  const buffer: BufferConfig = {
    buffer: Buffer.from(arrayBuffer),
    extension: realType.ext
  };
  return { success: true, buffer };
};
