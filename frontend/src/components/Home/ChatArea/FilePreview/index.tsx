import Image from 'next/image';
import * as S from './FilePreview.styled';
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
import { shorterChars } from '../../../Global/ProcessFunctions';

interface IFilePreview {
  files: Array<File>;
  index: number;
  setFieldValue: any;
}

const validImageTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/jfif',
  'image/jpg',
  'image/x-icon',
];

const fileTypes = [
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

const FilePreview = ({ files, index, setFieldValue }: IFilePreview) => {
  const getExtension = (filename: string) => {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  };

  const getFileIcon = () => {
    const extension = getExtension(files[index].name);
    for (let i = 0; i < fileTypes.length; i++) {
      if (fileTypes[i].extension.includes(extension)) {
        return fileTypes[i].type;
      }
    }
    return <BsFileMedicalFill size={23} />;
  };

  const removeFile = () => {
    files.splice(index, 1);
    setFieldValue('files', files);
  };

  return validImageTypes.includes(files[index].type) ? (
    <S.FilePreviewImage>
      <S.FilePreviewImageFigure>
        <Image
          src={URL.createObjectURL(files[index])}
          alt='imagePreview'
          objectFit='cover'
          layout='fill'
        />
      </S.FilePreviewImageFigure>
      <S.FilePreviewRemove onClick={removeFile} />
    </S.FilePreviewImage>
  ) : (
    <S.FilePreview>
      <S.FilePreviewIcon>{getFileIcon()}</S.FilePreviewIcon>
      <S.FilePreviewName>{shorterChars(files[index].name, 25)}</S.FilePreviewName>
      <S.FilePreviewRemove onClick={removeFile} />
    </S.FilePreview>
  );
};

export default FilePreview;
