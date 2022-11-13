import Image from "next/image";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Cropper from "react-easy-crop";
import { useState, ChangeEvent } from "react";
import { HiOutlineX } from "react-icons/hi";
import { AiFillCamera } from "react-icons/ai";

import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";

import * as S from "./SettingInfo.styled";
import { UserAvatar } from "../../../../utils/dataConfig";
import CropImage from "./CropImage";
import { UsersApi } from "../../../../services/api/users";
import { useRouter } from "next/router";

interface ISettingInfo {
  name: string;
  gender: string;
  dob: string;
  avatar: string;
  setEditInfo: (settingInfo: boolean) => void;
}

const SettingInfo = ({
  name,
  gender,
  dob,
  avatar,
  setEditInfo,
}: ISettingInfo) => {
  const router = useRouter();
  const [previewAvt, setPreviewAvt] = useState<string>(avatar);
  // const [cropImage, setCropImage] = useState<any>();
  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null);
  const [modalCrop, setModalCrop] = useState(false);

  const initialValues = {
    name: name || "",
    gender: gender || "male",
    dob: dob || new Date(),
    avatar: avatar || "",
  };

  const toggleEvent = () => {
    setEditInfo(false);
  };

  const handleCrop = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setModalCrop(true);
        setCropImage(reader.result);
      });
      reader.readAsDataURL(input.files[0]);
    }
  };

  const onSubmit = (values: {
    name: string;
    gender: string;
    dob: string | Date;
    avatar: string;
  }) => {
    const newData = values;
    newData.name = values.name.trim().replace(/ +/g, " ");
    console.log("submits: ", newData);
    const result = UsersApi.updateProfile(values)
    console.log('result update: ', result)
  };

  return (
    <S.Modal>
      <S.ModalOverlay onClick={() => toggleEvent()} />
      <S.ModalBody>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <>
              {modalCrop && (
                <CropImage
                  image={cropImage}
                  setModalCrop={setModalCrop}
                  setPreviewAvt={setPreviewAvt}
                  setFieldValue={setFieldValue}
                />
              )}
              <S.Header>
                <S.Title>
                  Update information
                  <HiOutlineX onClick={() => toggleEvent()} />
                </S.Title>
                <S.Banner>
                  <Image src={avatar} layout="fill" objectFit="cover" alt="" />
                </S.Banner>
                <S.AvatarLabel htmlFor="avatar">
                  <Image src={avatar} layout="fill" objectFit="contain" alt="" />
                </S.AvatarLabel>
              </S.Header>
              <S.Content>
                <S.NewForm>
                  <S.SetWidth>
                    <S.UpdateAvatar htmlFor="avatar">
                      <AiFillCamera />
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={(e) => handleCrop(e)}
                      />
                    </S.UpdateAvatar>
                    <S.Label htmlFor="name">Full name</S.Label>
                    <S.Input
                      id="name"
                      name="name"
                      error={errors.name && touched.name ? 1 : 0}
                    />
                    <ErrorMessage name="name" component={S.ErrorMsg} />
                    <S.GenderTitle>Gender</S.GenderTitle>
                    <S.GroupLabel>
                      <S.Label>
                        <S.Radio type="radio" value="male" name="gender" />
                        Male
                      </S.Label>
                      <S.Label>
                        <S.Radio type="radio" value="female" name="gender" />
                        Female
                      </S.Label>
                    </S.GroupLabel>
                    <S.DOBTitle>Date of Birth</S.DOBTitle>
                    <S.DatePickerElement>
                      <DatePicker
                        name="dob"
                        dateFormat="d MMMM, yyyy"
                        wrapperClassName="date_picker"
                        selected={new Date(values.dob)}
                        onChange={(value) => {
                          setFieldValue("dob", value);
                        }}
                      />
                      <S.DatePickerWrapperStyles />
                    </S.DatePickerElement>
                    <S.GroupButton>
                      <S.Button type="submit" onClick={() => router.reload()}>Update</S.Button>
                      <S.Button onClick={() => toggleEvent()}>Cancel</S.Button>
                    </S.GroupButton>
                  </S.SetWidth>
                </S.NewForm>
              </S.Content>
            </>
          )}
        </Formik>
      </S.ModalBody>
    </S.Modal>
  );
};

export default SettingInfo;
