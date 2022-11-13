import React from 'react';
import { useRef, useEffect } from 'react';
import {
  BsFillFileExcelFill,
  BsFillFilePdfFill,
  BsFillFilePlayFill,
  BsFillFilePptFill,
  BsFileText,
  BsFillFileWordFill,
  BsFileCodeFill,
  BsFillFileZipFill,
  BsFileMedicalFill,
} from 'react-icons/bs';

export const validImageTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/jfif',
  'image/jpg',
  'image/x-icon',
];

export const fileTypes = [
  {
    type: <BsFillFileExcelFill size={23} color='#217346' />,
    extension: ['xlsx', 'xls', 'xlsm', 'xml', 'xlam', 'xla', 'csv'],
  },
  {
    type: <BsFillFilePdfFill size={23} color='#B90F12' />,
    extension: ['pdf', 'ps', 'eps', 'html', 'html'],
  },
  {
    type: <BsFillFilePlayFill size={23} color='#326dba' />,
    extension: ['webm', 'mkv', 'flv', 'gif', 'mp4', 'wmv', 'avi', 'swf'],
  },
  {
    type: <BsFillFilePptFill size={23} color='#BD3311' />,
    extension: ['pptx', 'pptm', 'ppt', 'xps', 'potx', 'potm', 'pot', 'ppsx'],
  },
  {
    type: <BsFileText size={23} color='#4d4d4d' />,
    extension: ['txt', 'tex', 'rtf', 'odt', 'wpd'],
  },
  {
    type: <BsFillFileWordFill size={23} color='#2B579A' />,
    extension: ['doc', 'docm', 'docx', 'dot', 'dotx'],
  },
  {
    type: <BsFileCodeFill size={23} color='#4E4E4E' />,
    extension: ['exe', 'ini', 'bat', 'msi', 'mui'],
  },
  {
    type: <BsFillFileZipFill size={23} color='#C56B36' />,
    extension: ['zip', 'zipx', 'jar', 'iso', 'rar', '7z'],
  },
];

export const getExtension = (filename: string) => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
};

export const getFileIcon = (
  file:
    | File
    | {
        name: string;
        url: string;
        type: string;
      }
) => {
  const extension = getExtension(file.name);
  for (let i = 0; i < fileTypes.length; i++) {
    if (fileTypes[i].extension.includes(extension)) {
      return fileTypes[i].type;
    }
  }
  return <BsFileMedicalFill size={23} />;
};

export const shorterText = (text: string, limit: number = 35) => {
  if (!text) return text;

  let _string = text.trim();
  if (_string.length <= limit) return _string;
  _string = _string.substring(0, limit);
  return _string.substring(0, _string.lastIndexOf(' ')) + '...';
};

export const shorterChars = (text: string, limit: number = 35) => {
  if (!text) return text;

  let _string = text.trim();
  if (_string.length <= limit) return _string;
  _string = _string.substring(0, limit);
  return _string + '...';
};

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);
  return ref;
};

//Crop Image
export const createImage = (url: any) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
};

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export default async function getCroppedImg(
  imageSrc: any,
  pixelCrop: any,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((file: any) => {
      file.name = 'cropped.jpeg';
      resolve({ file: file, url: URL.createObjectURL(file) });
    }, 'image/jpeg');
  });
}
