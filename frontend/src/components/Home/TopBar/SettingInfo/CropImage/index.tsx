import * as S from './CropImage.styled';

import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { BiCrop } from 'react-icons/bi'
import { MdCancelPresentation } from 'react-icons/md';
import getCroppedImg from '../../../../Global/ProcessFunctions'

interface ICrop {
  image: string | ArrayBuffer | null
  setModalCrop: (modalCrop: boolean) => void
  setPreviewAvt: (avatar: string) => void
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const CropImage = ({
  image,
  setModalCrop,
  setPreviewAvt,
  setFieldValue
}: ICrop) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>()

    const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onCrop = async () => {
      const croppedImage: any = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setFieldValue('avatar', croppedImage.file)
      setPreviewAvt(croppedImage.url)
      setModalCrop(false)
    }

    return (
      <S.Modal>
        <S.ModalOverlay />
        <S.ModalBody>
          <S.Title>Crop Profile Photo</S.Title>
          <S.Content>
            <Cropper
                  image={image as string | undefined}
                  crop={crop}
                  zoom={zoom}
                  maxZoom={10}
                  rotation={rotation}
                  aspect={1}
                  cropShape="round"
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropChange={setCrop}
                  onCropComplete={cropComplete}
            />
          </S.Content>
          <S.Action>
            <S.ZoomAndRotate>
                <p>Zoom: {zoom * 10}%</p>
                <S.Slider type="range" min={1} max={10} step={0.5} value={zoom} onInput={(e) => setZoom(Number(e.currentTarget.value))}/>
            </S.ZoomAndRotate>
            <S.ZoomAndRotate>
                <p>Rotation: {rotation}°</p>
                <S.Slider type="range" min={1} max={360} step={1} value={rotation} onInput={(e) => setRotation(Number(e.currentTarget.value))}/>
            </S.ZoomAndRotate>
            <S.ButtonCropZone>
              <S.Button onClick={onCrop}>
                <BiCrop />
                <p>CROP</p>
              </S.Button>
              <S.Button onClick={() => setModalCrop(false)}>
                <MdCancelPresentation />
                <p>Cancel</p>
              </S.Button>
            </S.ButtonCropZone>
          </S.Action>
        </S.ModalBody>
      </S.Modal>

    );
}

export default CropImage;