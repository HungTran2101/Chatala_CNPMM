import Image from 'next/image';
import * as S from './ChatArea.styled';
import { UserAvatar, UserName } from '../../../utils/dataConfig';
import { FormEvent, useRef, useState } from 'react';
import ChatMsg from './ChatMsg';
import EmojiPicker, { EmojiStyle, EmojiClickData } from 'emoji-picker-react';
import MoreOptions from './MoreOptions';
import { useOutsideClick } from '../../Global/ProcessFunctions';
import { useGlobalContext } from '../../../contexts/globalContext';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FilePreview from './FilePreview';

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
    }
  };

  const onSubmit = (values: FormValues, { setFieldValue }: any) => {
    if (values.msg !== '' || values.files.length > 0) {
      setToggleEmoji(false);
      if (values.msg !== '') {
        context.setRoomMsg([
          { avatar: UserAvatar, msg: values.msg },
          ...context.roomMsg,
        ]);
        chatInput.current!.innerText = '';
      }

      console.log(values);
      setFieldValue('msg', '');
      setFieldValue('files', []);
    }
  };

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
      {toggleOption && <MoreOptions setToggleOption={setToggleOption} />}
      <S.ChatAreaMain>
        <S.ChatAreaMainMsg>
          <S.ChatAreaMainMsgInner>
            {context.roomMsg?.map((data, index) => (
              <ChatMsg msg={data.msg} index={index} key={index} />
            ))}
          </S.ChatAreaMainMsgInner>
        </S.ChatAreaMainMsg>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue }) => (
            <Form>
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
              <S.ChatAreaMainInput>
                {toggleEmoji && (
                  <S.ChatAreaMainInputEmojiPicker ref={emojiRef}>
                    <EmojiPicker
                      skinTonesDisabled={true}
                      emojiStyle={EmojiStyle.TWITTER}
                      height={400}
                      width={400}
                      onEmojiClick={(emoData) =>
                        emojiClicked(emoData, setFieldValue)
                      }
                    />
                  </S.ChatAreaMainInputEmojiPicker>
                )}
                <S.ChatAreaMainInputFile htmlFor='fileInput'>
                  +
                </S.ChatAreaMainInputFile>
                <input
                  type='file'
                  id='fileInput'
                  hidden
                  multiple
                  onChange={(e) => fileChoosen(e, values, setFieldValue)}
                  // onClick={(e) => e.target. = null}
                />
                <S.ChatAreaMainInputMsg>
                  <S.ChatAreaMainInputEmoji
                    onClick={() => setToggleEmoji(true)}
                  />
                  <S.ChatAreaMainInputText
                    username={UserName}
                    contentEditable
                    ref={chatInput}
                    onInput={(e) =>
                      setFieldValue('msg', e.currentTarget.innerText)
                    }
                  />
                  <S.ChatAreaMainInputButtonSend type='submit'>
                    <S.ChatAreaMainInputSendIcon />
                  </S.ChatAreaMainInputButtonSend>
                </S.ChatAreaMainInputMsg>
              </S.ChatAreaMainInput>
            </Form>
          )}
        </Formik>
      </S.ChatAreaMain>
    </S.ChatArea>
  );
};

export default ChatArea;
