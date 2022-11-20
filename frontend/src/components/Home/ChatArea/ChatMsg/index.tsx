import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../contexts/globalContext';
import { UserAvatar } from '../../../../utils/dataConfig';
import { messageType } from '../../../../utils/types';
import { getFileIcon, shorterChars } from '../../../Global/ProcessFunctions';
import * as S from './ChatMsg.styled';
import ChatMsgOption from './ChatMsgOption';

interface IChatMsg {
  data: messageType;
  position: string;
}

const ChatMsg = ({ data, position }: IChatMsg) => {
  const [toggleOption, setToggleOption] = useState(false);
  const [images, setImages] = useState<
    Array<{ name: string; url: string; type: string }>
  >([]);

  const context = useGlobalContext();

  const getImageList = () => {
    const _images: Array<{ name: string; url: string; type: string }> = [];
    data.files.forEach(file => {
      if (file.type === 'image') _images.push(file);
    });
    setImages(_images);
  };

  // useEffect(() => {
  //   getImageList();
  // }, [data]);

  return data.fromSender ? (
    <S.ChatMsgRight position={position}>
      <S.ChatMsgWrapper>
        {!data.unSend ? (
          <>
            {data.msg !== 'Hình Ảnh' && data.msg.length > 0 && (
              <S.ChatMsgTextTail />
            )}
            {data.msg.length > 0 && <S.ChatMsgText>{data.msg}</S.ChatMsgText>}
            {data.files.length > 0 && (
              <S.ChatMsgFileImages imgNum={data.files.length}>
                {data.files.map((image, index) => (
                  <S.ChatMsgFileImage key={index} imgNum={data.files.length}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image
                      src={image.url}
                      alt='image'
                      layout='responsive'
                      width={100}
                      height={100}
                      objectFit={'contain'}
                      draggable={false}
                    />
                  </S.ChatMsgFileImage>
                ))}
              </S.ChatMsgFileImages>
            )}
            {/* {data.files.length > 0 && (
              <S.ChatMsgFiles>
                {data.files.map((file, index) => (
                  <S.ChatMsgFile key={index}>
                    <Image
                      src={file.url}
                      alt='avatar'
                      layout='fill'
                      objectFit='contain'
                    />
                  </S.ChatMsgFile>
                ))}
              </S.ChatMsgFiles>
            )} */}
          </>
        ) : (
          <S.ChatMsgUnSend>Message has been recovered</S.ChatMsgUnSend>
        )}
      </S.ChatMsgWrapper>
      {!data.unSend && (
        <S.ChatMsgMoreIconWrapper>
          <S.ChatMsgMoreIcon onClick={() => setToggleOption(true)} />
          {toggleOption && <ChatMsgOption setToggleOption={setToggleOption} />}
        </S.ChatMsgMoreIconWrapper>
      )}
    </S.ChatMsgRight>
  ) : (
    <S.ChatMsgLeft position={position}>
      {context.roomInfo && (
        <S.ChatMsgAvatar position={position}>
          <Image
            src={
              context.roomInfo.roomAvatar
                ? context.roomInfo.roomAvatar
                : 'https://res.cloudinary.com/dapbgcbjp/image/upload/v1668934480/remptqclwgivbojzvuat.jpg'
            }
            alt='avatar'
            layout='fill'
            objectFit='contain'
          />
        </S.ChatMsgAvatar>
      )}
      <S.ChatMsgWrapper>
        {!data.unSend && data.files.length === 0 && <S.ChatMsgTextTail />}
        {data.unSend ? (
          <S.ChatMsgUnSend>Message has been recovered</S.ChatMsgUnSend>
        ) : (
          <>
            {data.msg !== 'Hình Ảnh' && data.msg.length > 0 && (
              <S.ChatMsgText>{data.msg}</S.ChatMsgText>
            )}
            {data.files.length > 0 && (
              <S.ChatMsgFileImages imgNum={data.files.length}>
                {data.files.map((image, index) => (
                  <S.ChatMsgFileImage key={index} imgNum={data.files.length}>
                    <Image
                      src={image.url}
                      alt='image'
                      layout='responsive'
                      width={100}
                      height={100}
                      objectFit={'contain'}
                      draggable={false}
                    />
                  </S.ChatMsgFileImage>
                ))}
              </S.ChatMsgFileImages>
            )}
            {/* {data.files.length > 0 && (
              <S.ChatMsgFiles>
                {data.files.map(
                  (file, index) =>
                    file.type === 'file' && (
                      <S.ChatMsgFile key={index}>
                        <S.ChatMsgFileIcon>
                          {getFileIcon(file)}
                        </S.ChatMsgFileIcon>
                        <S.ChatMsgFileName>
                          {shorterChars(file.name, 25)}
                        </S.ChatMsgFileName>
                      </S.ChatMsgFile>
                    )
                )}
              </S.ChatMsgFiles>
            )} */}
          </>
        )}
      </S.ChatMsgWrapper>
    </S.ChatMsgLeft>

    // {data.files.map(
    //   (file, index) =>
    //     file.type === 'file' && <S.ChatMsgFile key={index}></S.ChatMsgFile>
    // )}
  );
};

export default ChatMsg;
