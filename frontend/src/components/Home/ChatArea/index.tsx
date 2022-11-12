import Image from 'next/image';
import * as S from './ChatArea.styled';
import { UserAvatar, UserName } from '../../../utils/dataConfig';
import { FormEvent, useEffect, useRef, useState } from 'react';
import ChatMsg from './ChatMsg';
import EmojiPicker, { EmojiStyle, EmojiClickData } from 'emoji-picker-react';
import MoreOptions from './MoreOptions';
import { useOutsideClick } from '../../Global/ProcessFunctions';
import { useGlobalContext } from '../../../contexts/globalContext';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FilePreview from './FilePreview';
import DropZone from 'react-dropzone';
import { messageType } from '../../../utils/types';
import SockJS from 'sockjs-client';
const Stomp = require('stompjs');

type FormValues = {
  msg: string;
  files: Array<File>;
};

const ChatArea = () => {
  const status = 1;

  const context = useGlobalContext();

  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [toggleOption, setToggleOption] = useState(false);

  //chatInput
  const chatInput = useRef<HTMLSpanElement>(null);

  //Emoji
  const handleEmojiOutsideClick = () => {
    setToggleEmoji(false);
  };
  const emojiRef = useOutsideClick(handleEmojiOutsideClick);
  const emojiClicked = (emoData: EmojiClickData, setFieldValue: any) => {
    chatInput.current!.innerText = chatInput.current!.innerText + emoData.emoji;
    setFieldValue('msg', chatInput.current?.innerText);
  };

  //Message
  const setMessagePosition = (data: messageType, index: number) => {
    const roomMsg = context.roomMsg;

    if (
      data.senderId !== roomMsg[index + 1]?.senderId &&
      data.senderId === roomMsg[index - 1]?.senderId
    )
      return 'top';
    else if (
      data.senderId === roomMsg[index - 1]?.senderId &&
      data.senderId === roomMsg[index + 1]?.senderId
    )
      return 'middle';
    else if (
      data.senderId !== roomMsg[index - 1]?.senderId &&
      data.senderId !== roomMsg[index + 1]?.senderId
    )
      return 'alone';
    else return 'bottom';
  };

  //Form
  const initialValues = {
    msg: '',
    files: [],
  };

  const validationSchema = Yup.object().shape({
    msg: Yup.string(),
    files: Yup.mixed(),
  });

  const fileChoosen = (
    e: FormEvent<HTMLInputElement>,
    values: FormValues,
    setFieldValue: any
  ) => {
    if (e.currentTarget.files) {
      const newFiles = e.currentTarget.files;

      const files = values.files;
      for (let i = 0; i < newFiles.length; i++) {
        files.push(newFiles[i]);
      }

      setFieldValue('files', files);
      e.currentTarget.value = '';
    }
  };

  const fileDropped = (
    newFiles: File[],
    values: FormValues,
    setFieldValue: any
  ) => {
    const files = values.files;
    for (let i = 0; i < newFiles.length; i++) {
      files.push(newFiles[i]);
    }

    setFieldValue('files', files);
  };

  const onSubmit = (values: FormValues, { setFieldValue }: any) => {
    if (values.msg !== '' || values.files.length > 0) {
      console.log(values);
      setToggleEmoji(false);
      // if (values.msg !== '') {
      //   context.setRoomMsg([
      //     {
      //       ...context.roomMsg[0],
      //       senderId: '1',
      //       msg: values.msg,
      //       unSend: false,
      //     },
      //     ...context.roomMsg,
      //   ]);
      // }
      chatInput.current!.innerText = '';

      send(values.msg);

      setFieldValue('msg', '');
      setFieldValue('files', []);
    }
  };

  const [sendService, setSendService] = useState<any>();

  const connectServer = () => {
    let Sock = new SockJS('http://localhost:5000/' + 'ws');
    let stompClient = Stomp.over(Sock);
    stompClient.debug = null;
    stompClient.heartbeat = 0;
    stompClient.connect(
      {},
      () => {
        stompClient.subscribe('/user/' + 'userId', (message: any) =>
          onPrivateMessage(message)
        );
        setSendService(stompClient);
      },
      () => {
        alert('disconnected from server');
      }
    );
  };

  const onPrivateMessage = (message: any) => {
    console.log(message);
  };

  const send = (readyMessage: any) => {
    sendService.send('/server', {}, JSON.stringify(readyMessage));
  };

  useEffect(() => {
    connectServer();
  }, []);

  return (
    <S.ChatArea>
      <S.ChatAreaHead>
        <S.ChatAreaHeadInfo>
          <S.ChatAreaHeadAvatar>
            <Image
              src={UserAvatar}
              alt='avatar'
              layout='fill'
              objectFit='contain'
            />
          </S.ChatAreaHeadAvatar>
          <S.ChatAreaHeadNameWrapper>
            <S.ChatAreaHeadName>{UserName}</S.ChatAreaHeadName>
            <S.ChatAreaHeadStatus>
              {status ? 'Online' : 'Offline'}
              <S.ChatAreaHeadStatusIcon status={status} />
            </S.ChatAreaHeadStatus>
          </S.ChatAreaHeadNameWrapper>
        </S.ChatAreaHeadInfo>
        <S.ChatAreaHeadOption onClick={() => setToggleOption(true)} />
      </S.ChatAreaHead>
      {toggleOption && (
        <MoreOptions
          roomInfo={context.roomInfo}
          setToggleOption={setToggleOption}
        />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, submitForm }) => (
          <DropZone
            onDrop={(acceptedFiles: any) =>
              fileDropped(acceptedFiles, values, setFieldValue)
            }
            noClick
            noKeyboard
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <S.ChatAreaMain {...getRootProps()}>
                <S.ChatAreaMainMsg>
                  <S.ChatAreaMainMsgInner>
                    {context.roomMsg?.map((data, index) => (
                      <ChatMsg
                        data={data}
                        position={setMessagePosition(data, index)}
                        key={index}
                      />
                    ))}
                  </S.ChatAreaMainMsgInner>
                </S.ChatAreaMainMsg>
                {values.files.length > 0 && (
                  <S.ChatChatAreaFilePreview>
                    <S.ChatChatAreaFilePreviewInner>
                      {values.files.map((data, index) => (
                        <FilePreview
                          files={values.files}
                          setFieldValue={setFieldValue}
                          index={index}
                          key={index}
                        />
                      ))}
                    </S.ChatChatAreaFilePreviewInner>
                  </S.ChatChatAreaFilePreview>
                )}
                <Form>
                  <S.ChatAreaMainInput>
                    {toggleEmoji && (
                      <S.ChatAreaMainInputEmojiPicker ref={emojiRef}>
                        <EmojiPicker
                          skinTonesDisabled={true}
                          emojiStyle={EmojiStyle.TWITTER}
                          height={400}
                          width={400}
                          onEmojiClick={emoData =>
                            emojiClicked(emoData, setFieldValue)
                          }
                        />
                      </S.ChatAreaMainInputEmojiPicker>
                    )}
                    <S.ChatAreaMainInputFile htmlFor='fileInput'>
                      +
                    </S.ChatAreaMainInputFile>
                    <S.ChatAreaMainInputMsg>
                      <S.ChatAreaMainInputEmoji
                        onClick={() => setToggleEmoji(true)}
                      />
                      <S.ChatAreaMainInputText
                        username={UserName}
                        contentEditable
                        ref={chatInput}
                        onInput={e =>
                          setFieldValue('msg', e.currentTarget.innerText)
                        }
                        onKeyDown={e => {
                          if (e.code === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            submitForm();
                          }
                        }}
                      />
                      <S.ChatAreaMainInputButtonSend type='submit'>
                        <S.ChatAreaMainInputSendIcon />
                      </S.ChatAreaMainInputButtonSend>
                    </S.ChatAreaMainInputMsg>
                  </S.ChatAreaMainInput>
                  <input
                    {...getInputProps({
                      type: 'file',
                      id: 'fileInput',
                      hidden: true,
                      multiple: true,
                      onChange: (e: any) =>
                        fileChoosen(e, values, setFieldValue),
                    })}
                  />
                  {isDragActive && (
                    <S.ChatAreaMainDropZone>
                      Drop files here
                    </S.ChatAreaMainDropZone>
                  )}
                </Form>
              </S.ChatAreaMain>
            )}
          </DropZone>
        )}
      </Formik>
    </S.ChatArea>
  );
};

export default ChatArea;
