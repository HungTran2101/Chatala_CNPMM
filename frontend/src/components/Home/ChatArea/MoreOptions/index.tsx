import * as S from "./MoreOptions.styled";
import { useOutsideClick } from "../../../Global/ProcessFunctions";

interface IMoreOptions {
  setToggleOption: (toggle: boolean) => void;
}

const MoreOptions = ({ setToggleOption }: IMoreOptions) => {
  const handleOutsideClick = () => {
    setToggleOption(false);
  };

  const moreOptionsRef = useOutsideClick(handleOutsideClick);

  return (
    <S.MoreOptions ref={moreOptionsRef}>
        <S.NormalItem>Friend's profile</S.NormalItem>
        <S.DeteleItem>Delete this chat</S.DeteleItem>
    </S.MoreOptions>
  );
};

export default MoreOptions;
