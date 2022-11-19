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
import { messageApi } from '../../../services/api/messages';
import { BASEURL } from '../../../services/api/urls';
const Stomp = require('stompjs');

type FormValues = {
  msg: string;
  files: Array<string>;
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
      data.fromSender !== roomMsg[index + 1]?.fromSender &&
      data.fromSender === roomMsg[index - 1]?.fromSender
    )
      return 'top';
    else if (
      data.fromSender === roomMsg[index - 1]?.fromSender &&
      data.fromSender === roomMsg[index + 1]?.fromSender
    )
      return 'middle';
    else if (
      data.fromSender !== roomMsg[index - 1]?.fromSender &&
      data.fromSender !== roomMsg[index + 1]?.fromSender
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
      const reader = new FileReader();
      for (let i = 0; i < e.currentTarget.files.length; i++) {
        reader.readAsDataURL(e.currentTarget.files[i])
        reader.onloadend = () => {
        }
      }
      // reader.readAsDataURL(file);
      // const newFiles = e.currentTarget.files;

      // const files = values.files;
      // for (let i = 0; i < newFiles.length; i++) {
      //   files.push(newFiles[i]);
      // }
      // console.log(files)
      // setFieldValue('files', files);
      // e.currentTarget.value = '';
    }
  };

  const fileDropped = (
    newFiles: File[],
    values: FormValues,
    setFieldValue: any
  ) => {
    const files = values.files;
    for (let i = 0; i < newFiles.length; i++) {
      // files.push(newFiles[i]);
    }

    setFieldValue('files', files);
  };

  const onSubmit = (values: FormValues, { setFieldValue }: any) => {
    if (values.msg !== '' || values.files.length > 0) {
      console.log(values);
      setToggleEmoji(false);

      messageApi
        .sendMessage({
          roomId: context.roomInfo.roomInfo._id,
          msg: values.msg,
          // files: String;
        })
        .then(res => {
          res.result.fromSender = true;
          chatInput.current!.innerText = '';
          setListMessage((listMessage: any) => [res.result, ...listMessage]);
          setFieldValue('msg', '');
          setFieldValue('files', []);
        });
    }
  };

  const connectServer = () => {
    let Sock = new SockJS(BASEURL + '/ws');
    let stompClient = Stomp.over(Sock);
    stompClient.debug = null;
    stompClient.heartbeat = 0;
    stompClient.connect(
      {},
      () => {
        stompClient.subscribe(
          '/user/' + sessionStorage.getItem('userId'),
          (message: any) => onPrivateMessage(message)
        );
      },
      () => {
        alert('disconnected from server');
      }
    );
  };

  const [listMessage, setListMessage] = useState<any>(context.roomMsg);

  const onPrivateMessage = (message: any) => {
    message.body.replace('\\', '');

    setListMessage((listMessage: any) => [
      JSON.parse(message.body),
      ...listMessage,
    ]);
  };

  useEffect(() => {
    connectServer();
    console.log('useEffect');
  }, []);

  return (
    <S.ChatArea>
      <S.ChatAreaHead>
        <S.ChatAreaHeadInfo>
          {context.roomInfo.roomName !== '-1' && (
            <S.ChatAreaHeadAvatar>
              <Image
                src={context.roomInfo.roomAvatar}
                alt='avatar'
                layout='fill'
                objectFit='contain'
              />
            </S.ChatAreaHeadAvatar>
          )}
          <S.ChatAreaHeadNameWrapper>
            {context.roomInfo.roomName !== '-1' && (
              <S.ChatAreaHeadName>
                {context.roomInfo.roomName}
              </S.ChatAreaHeadName>
            )}
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
                    {listMessage?.map((data: any, index: any) => (
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
                        username={context.roomInfo.roomName}
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
