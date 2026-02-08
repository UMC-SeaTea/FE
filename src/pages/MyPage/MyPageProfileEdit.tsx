import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import NavBar from '../../components/common/NavBar';
import ImageSelectionPopup from '../../components/common/ImageSelectionPopup';
import backIcon from '../../assets/backButton_white.svg';
import editCameraIcon from '../../assets/profileEdit_cameraIcon.svg';
import defaultProfile from '../../assets/profile_default.png';
import ProfileEditInput from '../../components/MyPage/MyPageProfileEditInput';
import ProfileReadOnly from '../../components/MyPage/MyPageProfileReadOnly';

const MyPageProfileEdit = () => {
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState({
    name: 'UMC',
    email: 'hongdandan@gmail.com',
    restType: 'floral',
    profileImage: defaultProfile,
  });

  const [name, setName] = useState(initialData.name);
  const [previewImage, setPreviewImage] = useState(initialData.profileImage);
  const [isChanged, setIsChanged] = useState(false);
  const [showImgOption, setShowImgOption] = useState(false);

  const isValidName = /^[a-zA-Z0-9가-힣]{4,}$/.test(name);

  const canSave = isChanged && isValidName;

  useEffect(() => {
    const isNameChanged = name !== initialData.name;
    const isImageChanged = previewImage !== initialData.profileImage;
    setIsChanged(isNameChanged || isImageChanged);
  }, [name, previewImage, initialData]);

  const handleBack = () => {
    navigate('/mypage');
  };

  const handleSave = () => {
    if (!canSave) return;

    setInitialData((prev) => ({
      ...prev,
      name: name,
      profileImage: previewImage,
    }));
    setShowImgOption(false);
  };

  const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
    setShowImgOption(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <div className="inline-flex justify-center items-center w-full relative">
          <NavBar
            variant="4"
            icon={backIcon}
            onClick={handleBack}
            className="!bg-[#0A0A0A] !w-full"
          />
          <div className="absolute right-[20px] flex justify-center items-center gap-[10px] py-[2px] px-[12px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              disabled={!canSave}
              className={clsx(
                'font-body text-body-4 transition-colors duration-200',
                canSave
                  ? 'text-white cursor-pointer'
                  : 'text-gray-100 cursor-default'
              )}
            >
              저장
            </button>
          </div>
        </div>

        <div className="relative w-[119px] h-[119px] mt-4 z-10">
          <img
            src={previewImage}
            alt="ProfileImage"
            className="w-full h-full rounded-[119px] object-cover"
          />
          <button
            className="absolute bottom-0 right-0 flex cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowImgOption(!showImgOption);
            }}
          >
            <img src={editCameraIcon} alt="Edit" />
          </button>

          {showImgOption && (
            <ImageSelectionPopup
              className="absolute top-[125px] left-1/2 -translate-x-1/2 w-[252px]"
              onImageSelected={handleImageSelected}
              onClose={() => setShowImgOption(false)}
            />
          )}
        </div>

        <div className="w-[335px] flex flex-col items-start gap-[32px] mt-[36px]">
          <div className="w-full relative">
            <ProfileEditInput
              label="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClear={() => setName('')}
            />
            {!isValidName && (
              <span className="text-[#FF0000] font-body text-body-5 mt-[4px] ml-[4px] absolute top-full left-0 whitespace-nowrap">
                한글, 영문, 숫자를 조합하여 4자 이상 입력해주세요.
              </span>
            )}
          </div>

          <ProfileReadOnly label="이메일 주소" value={initialData.email} />
          <ProfileReadOnly label="휴식 유형" value={initialData.restType} />
        </div>
      </div>

      <div className="mt-[199px] w-full flex justify-center">
        <div
          onClick={() => navigate('/diagnosis')}
          className="inline-flex p-[10px] justify-center items-center gap-[10px] cursor-pointer"
        >
          <div className="text-gray-200 text-center font-body text-detail-3 underline decoration-solid">
            휴식 유형을 다시 진단받고 싶으신가요?
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageProfileEdit;
