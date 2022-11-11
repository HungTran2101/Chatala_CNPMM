import { useState } from 'react';
import ChangePassword from './ChangePassword';
import * as S from './SettingsModal.styled';

export const settingsModalData = [
  { name: 'changePassword', title: 'Change Password' },
  { name: 'general', title: 'General Settings' },
];

interface SettingsModalProps {
  setSettingVisible: () => void;
}
const SettingsModal = ({ setSettingVisible }: SettingsModalProps) => {
  const [tab, setTab] = useState('changePassword');
  return (
    <S.SettingsModal>
      <S.SettingsModalInner>
        <S.SettingTabWrap>
          {settingsModalData.map((it, id) => (
            <S.TabLink
              key={id}
              active={tab === it.name}
              onClick={() => setTab(it.name)}
            >
              {it.title}
            </S.TabLink>
          ))}
        </S.SettingTabWrap>
        <S.SettingContentWrap>
          {tab === 'changePassword' && <ChangePassword />}
        </S.SettingContentWrap>
      </S.SettingsModalInner>
      <S.Overlay onClick={setSettingVisible} />
    </S.SettingsModal>
  );
};

export default SettingsModal;
