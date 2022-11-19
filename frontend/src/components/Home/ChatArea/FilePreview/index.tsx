import Image from 'next/image';
import * as S from './FilePreview.styled';
import {
  getFileIcon,
  shorterChars,
  validImageTypes,
} from '../../../Global/ProcessFunctions';

interface IFilePreview {
  files: Array<string>;
  index: number;
  setFieldValue: any;
}

const FilePreview = ({ files, index, setFieldValue }: IFilePreview) => {
  const removeFile = () => {
    files.splice(index, 1);
    setFieldValue('files', files);
  };

  return files[index].length > 0 ? (
    <S.FilePreviewImage>
      <S.FilePreviewImageFigure>
        <Image
          src={files[index]}
          alt='imagePreview'
          objectFit='cover'
          layout='fill'
        />
      </S.FilePreviewImageFigure>
      <S.FilePreviewRemove onClick={removeFile} />
    </S.FilePreviewImage>
  ) : (
    <></>
    // <S.FilePreview>
    //   <S.FilePreviewIcon>{getFileIcon(files[index])}</S.FilePreviewIcon>
    //   <S.FilePreviewName>
    //     {shorterChars(files[index].name, 25)}
    //   </S.FilePreviewName>
    //   <S.FilePreviewRemove onClick={removeFile} />
    // </S.FilePreview>
  );
};

export default FilePreview;
